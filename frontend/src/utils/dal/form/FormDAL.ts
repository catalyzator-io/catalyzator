import { FirebaseDAL } from '../base';
import { FirestorePaths, StoragePaths } from '../paths';
import { FormId, FormSubmission, FormConfig } from '../../../types/form';
import { FORM_CONFIGS } from '../../../constants/forms';
import { entityDAL } from '../entity/EntityDAL';
import { storageUtils } from '../../firebase/storage';
import { FORM_PRODUCT_ACCESS_MAP } from '../../../types/form';

export interface CreateFormSubmissionInput {
  form_id: FormId;
  entity_id: string;
  submitted_by: string;
  data: Record<string, any>;
}

export class FormDAL {
  private dal: FirebaseDAL;

  constructor() {
    this.dal = new FirebaseDAL();
  }

  /**
   * Get form configuration
   */
  getFormConfig(formId: FormId): FormConfig {
    const config = FORM_CONFIGS[formId]?.conf;
    if (!config) {
      throw new Error(`Form configuration not found for ID: ${formId}`);
    }
    return config;
  }

  /**
   * Submit form with all data at once
   */
  async submitForm(input: CreateFormSubmissionInput): Promise<FormSubmission> {
    // Verify user has permission
    const entity = await entityDAL.getEntity(input.entity_id);
    if (!entity?.members.includes(input.submitted_by)) {
      throw new Error('User does not have permission to submit this form');
    }

    const timestamp = new Date();
    const submissionId = crypto.randomUUID();

    // Process file uploads in form data
    const processedData = await this.processFileUploads(
      input.form_id,
      input.entity_id,
      submissionId,
      input.data
    );

    const submission: FormSubmission = {
      id: submissionId,
      form_id: input.form_id,
      entity_id: input.entity_id,
      submitted_by: input.submitted_by,
      data: processedData,
      status: 'submitted',
      created_at: timestamp,
      updated_at: timestamp,
      submitted_at: timestamp
    };

    // Save submission
    await this.dal.set(
      FirestorePaths.formDoc(input.entity_id, submissionId),
      submission
    );

    // Update entity form status
    await entityDAL.updateFormStatus(
      input.entity_id,
      input.form_id,
      'submitted',
      input.submitted_by
    );

    // Grant product access if form grants access
    const accessGrant = FORM_PRODUCT_ACCESS_MAP[input.form_id];
    if (accessGrant && accessGrant.productId) {
      await entityDAL.grantFeatureAccess(
        input.entity_id,
        accessGrant.productId,
        accessGrant.featureId,
        input.submitted_by
      );
    }

    return submission;
  }

  /**
   * Get all submissions for an entity
   */
  async getEntitySubmissions(entityId: string): Promise<FormSubmission[]> {
    return this.dal.query<FormSubmission>(
      FirestorePaths.formsRoot(entityId)
    );
  }

  /**
   * Process file uploads in form data
   */
  private async processFileUploads(
    formId: FormId,
    entityId: string,
    submissionId: string,
    data: Record<string, any>
  ): Promise<Record<string, any>> {
    const processedData = { ...data };

    // Get form config to identify file fields
    const config = this.getFormConfig(formId);
    
    // Recursively process all questions looking for file uploads
    const processQuestion = async (question: any, parentPath = '') => {
      if (question.type === 'file' || question.type === 'audio' || question.type === 'video') {
        const fieldPath = parentPath ? `${parentPath}.${question.id}` : question.id;
        const file = data[fieldPath];
        
        if (file instanceof File) {
          const storagePath = StoragePaths.formDoc(
            entityId,
            submissionId,
            question.id,
            file.name
          );
          
          const fileUrl = await storageUtils.uploadFile(file, storagePath);
          processedData[fieldPath] = {
            url: fileUrl,
            name: file.name,
            type: file.type,
            size: file.size,
            uploaded_at: new Date()
          };
        }
      }
      
      // Process nested questions in groups
      if (question.groupConfig?.questions) {
        for (const nestedQuestion of question.groupConfig.questions) {
          await processQuestion(
            nestedQuestion,
            parentPath ? `${parentPath}.${question.id}` : question.id
          );
        }
      }
    };

    // Process all questions in all steps
    for (const step of config.steps) {
      for (const question of step.questions) {
        await processQuestion(question);
      }
    }

    return processedData;
  }
}

// Export singleton instance
export const formDAL = new FormDAL(); 