import { FormConfig, FormSubmission } from '../../types/form';
import { BaseDAL } from './base';
import { FORM_CONFIGS } from '../../constants/forms';

interface FormAnalytics {
  timeSpentPerStep: { [stepId: string]: number };
  stepAttempts: { [stepId: string]: number };
  validationErrors: { [stepId: string]: number };
  lastAccessed: Date;
}

interface FormData {
  config: FormConfig;
  submissions: Map<string, FormSubmission>;
  analytics: Map<string, FormAnalytics>;
}

export class FormDAL extends BaseDAL<FormData> {
  private static instance: FormDAL;

  private constructor() {
    super();
    // Initialize with form configs
    Object.entries(FORM_CONFIGS).forEach(([id, config]) => {
      this.store.set(id, {
        config,
        submissions: new Map(),
        analytics: new Map()
      });
    });
  }

  static getInstance(): FormDAL {
    if (!FormDAL.instance) {
      FormDAL.instance = new FormDAL();
    }
    return FormDAL.instance;
  }

  async getFormConfig(formId: string): Promise<FormConfig> {
    const formData = await this.get(formId);
    if (!formData) {
      throw new Error(`Form config not found for ID: ${formId}`);
    }
    return formData.config;
  }

  async saveFormSubmission(submission: FormSubmission): Promise<void> {
    const formData = await this.get(submission.form_id);
    if (!formData) {
      throw new Error(`Form not found: ${submission.form_id}`);
    }

    formData.submissions.set('current_user', {
      ...submission,
      last_updated: new Date()
    });

    await this.set(submission.form_id, formData);
  }

  async getFormSubmission(formId: string, userId: string): Promise<FormSubmission | null> {
    const formData = await this.get(formId);
    if (!formData) {
      return null;
    }
    return formData.submissions.get(userId) || null;
  }

  async clearSubmissions(formId: string): Promise<void> {
    const formData = await this.get(formId);
    if (formData) {
      formData.submissions.clear();
      await this.set(formId, formData);
    }
  }

  // Debug methods (remove in production)
  async _getAllSubmissions(formId: string): Promise<Map<string, FormSubmission>> {
    const formData = await this.get(formId);
    return formData?.submissions || new Map();
  }

  async _debugStore(): Promise<Map<string, FormData>> {
    return this.store;
  }

  async submitForm(submission: FormSubmission): Promise<void> {
    const formData = await this.get(submission.form_id);
    if (!formData) {
      throw new Error(`Form not found: ${submission.form_id}`);
    }

    // Mark form as complete
    const completedSubmission = {
      ...submission,
      is_complete: true,
      last_updated: new Date()
    };

    formData.submissions.set('current_user', completedSubmission);
    await this.set(submission.form_id, formData);
  }

  async saveFormDraft(submission: FormSubmission): Promise<void> {
    const formData = await this.get(submission.form_id);
    if (!formData) {
      throw new Error(`Form not found: ${submission.form_id}`);
    }

    const draftSubmission = {
      ...submission,
      last_updated: new Date()
    };

    formData.submissions.set('current_user_draft', draftSubmission);
    await this.set(submission.form_id, formData);
  }

  async getDraftSubmission(formId: string): Promise<FormSubmission | null> {
    const formData = await this.get(formId);
    return formData?.submissions.get('current_user_draft') || null;
  }

  async clearDraft(formId: string): Promise<void> {
    const formData = await this.get(formId);
    if (formData) {
      formData.submissions.delete('current_user_draft');
      await this.set(formId, formData);
    }
  }

  async trackStepAttempt(formId: string, stepId: string): Promise<void> {
    const formData = await this.get(formId);
    if (!formData) return;

    const analytics = formData.analytics.get('current_user') || {
      timeSpentPerStep: {},
      stepAttempts: {},
      validationErrors: {},
      lastAccessed: new Date()
    };

    analytics.stepAttempts[stepId] = (analytics.stepAttempts[stepId] || 0) + 1;
    analytics.lastAccessed = new Date();

    formData.analytics.set('current_user', analytics);
    await this.set(formId, formData);
  }

  async trackValidationError(formId: string, stepId: string): Promise<void> {
    const formData = await this.get(formId);
    if (!formData) return;

    const analytics = formData.analytics.get('current_user') || {
      timeSpentPerStep: {},
      stepAttempts: {},
      validationErrors: {},
      lastAccessed: new Date()
    };

    analytics.validationErrors[stepId] = (analytics.validationErrors[stepId] || 0) + 1;
    formData.analytics.set('current_user', analytics);
    await this.set(formId, formData);
  }

  async getFormAnalytics(formId: string): Promise<FormAnalytics | null> {
    const formData = await this.get(formId);
    return formData?.analytics.get('current_user') || null;
  }
}

// Export singleton instance
export const formDAL = FormDAL.getInstance(); 