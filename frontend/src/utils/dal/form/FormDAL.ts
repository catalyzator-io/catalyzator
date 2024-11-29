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
   * Create new form submission
   */
  async createSubmission(input: CreateFormSubmissionInput): Promise<FormSubmission> {
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
      status: 'draft',
      created_at: timestamp,
      updated_at: timestamp
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
      'draft',
      input.submitted_by
    );

    return submission;
  }

  /**
   * Get form submission
   */
  async getSubmission(entityId: string, submissionId: string): Promise<FormSubmission | null> {
    return this.dal.get<FormSubmission>(
      FirestorePaths.formDoc(entityId, submissionId)
    );
  }

  /**
   * Update form submission
   */
  async updateSubmission(
    entityId: string,
    submissionId: string,
    data: Partial<Record<string, any>>,
    updatedBy: string
  ): Promise<void> {
    const submission = await this.getSubmission(entityId, submissionId);
    if (!submission) {
      throw new Error('Form submission not found');
    }

    // Verify user has permission
    const entity = await entityDAL.getEntity(entityId);
    if (!entity?.members.includes(updatedBy)) {
      throw new Error('User does not have permission to update this submission');
    }

    // Process file uploads in updated data
    const processedData = await this.processFileUploads(
      submission.form_id,
      entityId,
      submissionId,
      data
    );

    const updatedData = {
      ...submission.data,
      ...processedData
    };

    await this.dal.update(FirestorePaths.formDoc(entityId, submissionId), {
      data: updatedData,
      updated_at: new Date(),
      updated_by: updatedBy
    });
  }

  /**
   * Submit form and update product access
   */
  async submitForm(
    entityId: string,
    submissionId: string,
    submittedBy: string
  ): Promise<void> {
    const submission = await this.getSubmission(entityId, submissionId);
    if (!submission) {
      throw new Error('Form submission not found');
    }

    // Verify user has permission
    const entity = await entityDAL.getEntity(entityId);
    if (!entity?.members.includes(submittedBy)) {
      throw new Error('User does not have permission to submit this form');
    }

    const timestamp = new Date();

    // Update submission status
    await this.dal.update(FirestorePaths.formDoc(entityId, submissionId), {
      status: 'submitted',
      submitted_at: timestamp,
      updated_at: timestamp,
      updated_by: submittedBy
    });

    // Update entity form status
    await entityDAL.updateFormStatus(
      entityId,
      submission.form_id,
      'submitted',
      submittedBy
    );

    // Grant product access if form grants access
    const accessGrant = FORM_PRODUCT_ACCESS_MAP[submission.form_id];
    if (accessGrant && accessGrant.productId) {
      await entityDAL.grantFeatureAccess(
        entityId,
        accessGrant.productId,
        accessGrant.featureId,
        submittedBy
      );
    }
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