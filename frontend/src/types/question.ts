import { FileReference } from './common';

// Base value types that can be used in both forms and grants
export type BaseQuestionValueType = 
  | 'text' 
  | 'textarea'
  | 'number' 
  | 'boolean'
  | 'date'
  | 'file'
  | 'upload'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'rich_text';

// Base validation types
export interface TextValidation {
  min_length?: number;
  max_length?: number;
  pattern?: string;
}

export interface NumberValidation {
  min?: number;
  max?: number;
  integer_only?: boolean;
}

export interface DateValidation {
  min_date?: Date;
  max_date?: Date;
  future_only?: boolean;
  past_only?: boolean;
}

export interface FileValidation {
  allowed_types: string[];
  max_size: number; // in bytes
  max_files?: number;
}

export interface ChoiceValidation {
  options: string[];
  min_selections?: number;
  max_selections?: number;
  allow_other?: boolean;
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
export type SimpleValue = string | number | boolean | null;
export type ComplexValue = FileReference | SimpleValue[] | { [key: string]: SimpleValue };
export type BaseQuestionValue = SimpleValue | ComplexValue;

export interface BaseQuestionResponse {
  question_id: string;
  value: BaseQuestionValue;
  is_complete: boolean;
  last_updated?: Date;
} 