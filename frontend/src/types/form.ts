export type QuestionType = 'text' | 'upload' | 'record' | 'radio' | 'checkbox' | 'number' | 'email' | 'tel' | 'year' | 'url' | 'date' | 'dynamic';

export interface Option {
  label: string;
  value: string;
}

interface FirebaseMapping {
    collection: string;
    document?: string;
    field: string;
    conditions?: { field: string; operator: string; value: string }[];
  }
  
export interface DynamicField {
  id: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'upload' | 'url' | 'date';
  label: string;
  placeholder?: string;
  required?: boolean;
  firebasePath?: FirebaseMapping; // Add this to your existing Question type

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
    multiple_entries: boolean;
    allowText?: boolean;
    allowUpload?: boolean;
    allowRecord?: boolean;
    inputSize?: 'small' | 'large'; // New property for input size
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

export interface GrantFormResponse {
  text?: string;
  file?: File;
  audioUrl?: string;
  selectedOptions?: string[];
  dynamicEntries?: DynamicEntry[];
  fields?: Record<string, string | File>;
}

export interface EntityOnboardingFormResponse {
    text?: string;
    fields?: Record<string, string | File>;
  }