import { BaseQuestion, BaseQuestionValueType, BaseValidationTypeMap, BaseQuestionValue } from './question';
import { ChoiceValidation } from './question';

// Additional form-specific field types
export type FormSpecificFieldType = 
  | 'email' 
  | 'tel'
  | 'url';

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

// Extended validation map
export interface FormValidationTypeMap extends BaseValidationTypeMap {
  'email': EmailValidation;
  'tel': TelValidation;
  'url': UrlValidation;
}

// Form-specific question types
export interface FormQuestion extends Omit<BaseQuestion, 'validation' | 'questions'> {
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
    [step_id: string]: FormStepState;
  };
  current_step: string;
  completed_steps: string[];
  skipped_steps: string[];
  is_complete: boolean;
  metadata?: Record<string, any>;
  last_updated?: Date;
}

// Form progress tracking
export interface FormProgress {
  current_step: string;
  completed_steps: string[];
  skipped_steps: string[];
  total_steps: number;
  steps_completed: number;
  current_step_index: number;
  progress_percentage: number;
  is_complete: boolean;
}

// Form update types
export type FormConfigUpdateInput = Partial<Omit<FormConfig, 'id'>>;
export type FormSubmissionUpdateInput = Partial<Omit<FormSubmission, 'form_id'>>;


// Update TextInput validation type
export type FormFieldValidation<T extends FormFieldType> = T extends 'radio' | 'checkbox' 
  ? ChoiceValidation 
  : FormValidationTypeMap[T];

// Add these types
export type FormStepStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped';

export interface FormStepState {
  step_id: string;
  responses: { [key: string]: BaseQuestionValue };
  is_complete: boolean;
  status: FormStepStatus;
  last_updated?: Date;
}