import { FileValue } from './common';

// Base value types that can be used in both forms and grants
export type BaseQuestionValueType = 
  | 'text' 
  | 'textarea'
  | 'number' 
  | 'boolean'
  | 'date'
  | 'file'
  | 'upload'
  | 'recording'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'rich_text';

// Base validation types
export interface BaseValidation {
  required?: boolean;
}

export interface TextValidation extends BaseValidation {
  min_length?: number;
  max_length?: number;
  pattern?: string;
  
}

export interface NumberValidation extends BaseValidation {
  min?: number;
  max?: number;
  integer_only?: boolean;
}

export interface DateValidation extends BaseValidation {
  min_date?: Date;
  max_date?: Date;
  future_only?: boolean;
  past_only?: boolean;
}

export interface FileValidation extends BaseValidation {
  max_size?: number;
  allowed_types?: string[];
  max_files?: number;
}

export interface RecordingValidation extends BaseValidation {
  max_duration?: number;
  min_duration?: number;
  allowed_formats?: string[];
}

export interface ValidationOption {
  value: string;
  label: string;
}
  
export interface ChoiceValidation extends BaseValidation {
  options: ValidationOption[];
  min_selections?: number;
  max_selections?: number;
}

export interface RecordField {
  id: string;
  label: string;
  required?: boolean;
  type?: 'text' | 'number';
}

export interface RecordValidation extends BaseValidation {
  fields: Array<{
    id: string;
    label: string;
    required?: boolean;
    type?: 'text' | 'number';
  }>;
}

// Map value types to their validation types
export type BaseValidationTypeMap = {
  'text': TextValidation;
  'textarea': TextValidation;
  'rich_text': TextValidation;
  'number': NumberValidation;
  'boolean': never;
  'date': DateValidation;
  'file': FileValidation;
  'upload': FileValidation;
  'recording': RecordingValidation;
  'select': ChoiceValidation;
  'multiselect': ChoiceValidation;
  'radio': ChoiceValidation;
  'checkbox': ChoiceValidation;
}

// Base question interface
export interface BaseQuestion {
  id: string;
  title: string;
  description: string;
  value_type: BaseQuestionValueType;
  guidance?: string;
  required: boolean;
  validation: BaseValidationTypeMap[BaseQuestionValueType];
  questions?: BaseQuestion[]; // Recursive structure
}

// Base response value type (avoiding circular reference)
export type SimpleValue = string | number | boolean;
export type ComplexValue = FileValue | SimpleValue[] | { [key: string]: SimpleValue };
export type BaseQuestionValue = SimpleValue | ComplexValue | null;

// Add type guard
export const isSimpleValue = (value: unknown): value is SimpleValue => {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
};

export interface BaseQuestionResponse {
  question_id: string;
  value: BaseQuestionValue;
  is_complete: boolean;
  last_updated?: Date;
} 