import { FirebaseDAL } from '../base';
import { FirestorePaths } from '../paths';
import { FormId, FormSubmission } from '../../../types/form';

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
   * Create new form submission
   */
  async createSubmission(input: CreateFormSubmissionInput): Promise<FormSubmission> {
    const timestamp = new Date();
    const submissionId = crypto.randomUUID();
    if (input.form_id === "angel_investor_interest") {
      input.data["expertise"] = [];
      
    }
    if (input.form_id === "innovator_introduction") {
      console.log("innovator_introduction");
      input.data["otherFiles"] = [];
    input.data["otherText"] = "";
  
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