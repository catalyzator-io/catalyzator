import { ProductId, ProductFeatureId } from './product';

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

export interface IntroStepProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

export interface SuccessStepProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

export interface MultiStepFormProps {
  title: string;
  description: string;
  steps: StepConfig[];
  onSubmit: (data: Record<string, any>) => void;
  onStepChange?: (step: number, stepData: Record<string, any>) => Promise<void>;
  onStart?: () => Promise<{
    canAccess: boolean;
    submissionId?: string;
  }>;
  className?: string;
  persistKey?: string;
  onRedirect?: () => void;
  introStep?: IntroStepProps;
  successStep?: SuccessStepProps;
}

export interface FormConfig extends Omit<MultiStepFormProps, 'onSubmit' | 'onStepChange' | 'className' | 'persistKey'> {
  id: string;
  title: string;
  description: string;
}

export type FormId = 
  | 'angel_investor_interest'
  | 'entity_registration'
  | 'fundmatch_innovator'
  | 'innovator_introduction'
  | 'past_applications'
  | 'user_consent';

export interface FormSubmission {
  id: string;
  form_id: FormId;
  entity_id: string;
  submitted_by: string;
  data: Record<string, any>;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  submitted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

export const FORM_PRODUCT_ACCESS_MAP: Record<FormId, {
  productId?: ProductId;
  featureId: ProductFeatureId;
} | null> = {
  'angel_investor_interest': {
    productId: 'fundmatch',
    featureId: 'match-approved-innovators'
  }, // No product access granted
  'entity_registration': {
    featureId: 'forms'
  },
  'fundmatch_innovator': {
    productId: 'fundmatch',
    featureId: 'find-investors'
  },
  'innovator_introduction': {
    productId: 'pitch-to-grant',
    featureId: 'pitch-to-grant'
  },
  'past_applications': {
    productId: 'compass',
    featureId: 'grant-recommendation'
  }, // No product access granted
  'user_consent': null // No product access granted
};
