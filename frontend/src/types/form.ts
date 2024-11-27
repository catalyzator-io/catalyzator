export interface FileValidation {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
}

export interface MediaValidation {
  maxDuration?: number; // in seconds
  maxSize?: number; // in bytes
}

export type Option = {
  label: string;
  value: string;
}

export interface QuestionConfig {
  id: string;
  type: 'text' | 'rich-text' | 'number' | 'date' | 'daterange' | 'url' | 'email' | 'phone' | 'file' | 'audio' | 'video' | 'multi-choice' | 'checkbox' | 'single-choice-multi' | 'question-group';
  question: string;
  description?: string;
  isRequired: boolean;
  placeholder?: string;
  options?: Option[];
  validation?: {
    file?: FileValidation;
    media?: MediaValidation;
    [key: string]: any;
  };
  className?: string;
  groupConfig?: {
    maxEntries?: number;
    minEntries?: number;
    questions: QuestionConfig[];
  };
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  questions: QuestionConfig[];
  className?: string;
}

export interface StepStatus {
  completed: boolean;
  valid: boolean;
  visited: boolean;
}

export interface MultiStepFormProps {
  title?: string;
  description?: string;
  steps: StepConfig[];
  onSubmit: (formData: Record<string, any>) => void;
  onStepChange?: (currentStep: number) => void;
  className?: string;
  persistKey?: string;
  redirectUrl?: string;
  introStep?: {
    title?: string;
    message?: string;
    buttonText?: string;
  };
  successStep?: {
    title?: string;
    message?: string;
    buttonText?: string;
  };
}

export interface FormConfig extends Omit<MultiStepFormProps, 'onSubmit' | 'onStepChange' | 'className' | 'persistKey'> {
  id: string;
  title: string;
  description: string;
}
