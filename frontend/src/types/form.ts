import { BaseQuestion, BaseQuestionValueType, BaseValidationTypeMap, BaseQuestionValue } from './question';

// Additional form-specific field types
export type FormSpecificFieldType = 
  | 'email' 
  | 'tel'
  | 'url'
  | 'record'
  | 'dynamic';

// Combined field types
export type FormFieldType = BaseQuestionValueType | FormSpecificFieldType;

// Form-specific validation types
export interface EmailValidation {
  pattern?: string;
  allowed_domains?: string[];
}

export interface TelValidation {
  pattern?: string;
  country_codes?: string[];
}

export interface UrlValidation {
  pattern?: string;
  allowed_protocols?: string[];
}

export interface RecordValidation {
  max_duration?: number;
  min_duration?: number;
  allowed_formats?: string[];
}

// Extended validation map
export interface FormValidationTypeMap extends BaseValidationTypeMap {
  'email': EmailValidation;
  'tel': TelValidation;
  'url': UrlValidation;
  'record': RecordValidation;
  'dynamic': never;
}

// Form-specific question types
export interface FormQuestion extends Omit<BaseQuestion, 'validation'> {
  type: FormFieldType;
  placeholder?: string;
  multiple_entries: boolean;
  validation: FormValidationTypeMap[FormFieldType];
  metadata?: Record<string, any>;
}

// Step configuration
export interface FormStep {
  id: string;
  title: string;
  description?: string;
  questions: FormQuestion[];
  is_skippable?: boolean;
  conditions?: {
    step_id: string;
    condition: 'completed' | 'skipped' | 'value_equals' | 'value_exists';
    value?: any;
  }[];
}

// Form configuration
export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  steps: FormStep[];
  metadata?: {
    product_id?: string;
    entity_type?: string;
    version?: string;
    category?: string;
  };
}

// Response tracking
export interface FormStepResponse {
  step_id: string;
  responses: {
    [question_id: string]: BaseQuestionValue;
  };
  is_complete: boolean;
  is_skipped?: boolean;
  last_updated?: Date;
}

// Form submission state
export interface FormSubmission {
  form_id: string;
  steps: {
    [step_id: string]: FormStepResponse;
  };
  current_step: string;
  completed_steps: string[];
  skipped_steps: string[];
  is_complete: boolean;
  metadata?: Record<string, any>;
}

// Form progress tracking
export interface FormProgress {
  current_step: string;
  completed_steps: string[];
  skipped_steps: string[];
  total_steps: number;
  steps_completed: number;
  is_complete: boolean;
}

// Form update types
export type FormConfigUpdateInput = Partial<Omit<FormConfig, 'id'>>;
export type FormSubmissionUpdateInput = Partial<Omit<FormSubmission, 'form_id'>>;