import { FirebaseDAL } from '../base';
import { FirestorePaths, StoragePaths } from '../paths';
import { FormId, FormSubmission } from '../../../types/form';
import { storageUtils } from '../../firebase/storage';

export interface CreateFormSubmissionInput {
  form_id: FormId;
  entity_id: string;
  submitted_by: string;
  data: Record<string, any>;
  files?: Record<string, File[]>;
}

interface FileUploadResult {
  path: string;
  url: string;
  filename: string;
  questionId: string;
}

export class FormDAL {
  private dal: FirebaseDAL;

  constructor() {
    this.dal = new FirebaseDAL();
  }

  /**
   * Upload a single file and return its storage path and download URL
   */
  private async uploadFile(
    entityId: string,
    formId: string,
    questionId: string,
    file: File
  ): Promise<FileUploadResult> {
    const path = StoragePaths.formDoc(entityId, formId, file.name, questionId);
    const url = await storageUtils.uploadFile(file, path);
    return { 
      path, 
      url, 
      filename: file.name,
      questionId 
    };
  }

  /**
   * Create new form submission with file handling
   */
  async createSubmission(input: CreateFormSubmissionInput): Promise<FormSubmission> {
    const timestamp = new Date();
    const submissionId = crypto.randomUUID();

    // Handle file uploads if present
    if (input.files) {
      const fileUploads: FileUploadResult[] = [];

      // Upload all files and collect results
      for (const [questionId, files] of Object.entries(input.files)) {
        const uploads = await Promise.all(
          files.map(file => this.uploadFile(input.entity_id, input.form_id, questionId, file))
        );
        fileUploads.push(...uploads);
      }

      // Group files by questionId in the data object
      const filesByQuestion = fileUploads.reduce((acc, file) => {
        if (!acc[file.questionId]) {
          acc[file.questionId] = [];
        }
        acc[file.questionId].push({
          path: file.path,
          url: file.url,
          filename: file.filename
        });
        return acc;
      }, {} as Record<string, Array<{ path: string; url: string; filename: string }>>);

      // Merge file data into input.data
      input.data = {
        ...input.data,
        ...filesByQuestion
      };
    }

    // Handle specific form types
    if (input.form_id === "angel_investor_interest") {
      input.data["expertise"] = input.data["expertise"] || [];
    }
    if (input.form_id === "innovator_introduction") {
      input.data["otherFiles"] = input.data["otherFiles"] || [];
      input.data["otherText"] = input.data["otherText"] || "";
    }

    const submission: FormSubmission = {
      id: submissionId,
      form_id: input.form_id,
      entity_id: input.entity_id,
      submitted_by: input.submitted_by,
      data: input.data,
      status: 'draft',
      created_at: timestamp,
      updated_at: timestamp
    };

    await this.dal.set(
      FirestorePaths.formSubmissionDoc(input.entity_id, input.form_id, submissionId),
      submission
    );

    return submission;
  }
}

// Export singleton instance
export const formDAL = new FormDAL(); 