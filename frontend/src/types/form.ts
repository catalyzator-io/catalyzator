export type QuestionType = 'text' | 'upload' | 'record' | 'radio' | 'checkbox' | 'number' | 'email' | 'tel' | 'year' | 'url' | 'date' | 'dynamic';

export interface Option {
  label: string;
  value: string;
}

export interface DynamicField {
  id: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'upload' | 'url' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: RegExp;
}

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  placeholder?: string;
  guidelines?: string;
  options?: Option[];
  fields?: DynamicField[];
  multiple_entries: boolean,

  allowText?: boolean;
  allowUpload?: boolean;
  allowRecord?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: RegExp;
  };
  maxEntries?: number;
}

export interface DynamicEntry {
  id: string;
  values: Record<string, string | File>;
}

export interface FormResponse {
  text?: string;
  file?: File;
  audioUrl?: string;
  selectedOptions?: string[];
  dynamicEntries?: DynamicEntry[];
  fields?: Record<string, string | File>;
}