import { FormSubmission, FormConfig } from '../../types/form';
import { FORM_CONFIGS } from '../../constants/forms';

export class FormDAL {
  static async getFormConfig(formId: string): Promise<FormConfig> {
    const config = FORM_CONFIGS[formId];
    if (!config) {
      throw new Error(`Form config not found for ID: ${formId}`);
    }
    return config;
  }

  static async saveFormSubmission(submission: FormSubmission): Promise<void> {
    // Mock implementation
    throw new Error('Not implemented');
  }

  static async getFormSubmission(formId: string, userId: string): Promise<FormSubmission | null> {
    // Mock implementation
    throw new Error('Not implemented');
  }
} 