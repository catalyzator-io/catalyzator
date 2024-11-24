import { BaseMetadata, ApplicationStatus } from './common';
import { BaseQuestionValue } from './question';

export type ApplicationType = 'grant' | 'investment' | 'accelerator';

export type QuestionStatus = 
  | 'not_started'
  | 'in_progress'
  | 'completed'
  | 'requires_review'
  | 'approved'
  | 'rejected';

export interface QuestionAnswer {
  question_id: string;
  value?: BaseQuestionValue; // when the question is a recursive structure there might not be value
  status: QuestionStatus;
  feedback?: string;
  last_updated: Date;
  updated_by: string;
}

// Progress tracking for recursive question structure
export interface QuestionProgress {
  question_id: string;
  status: QuestionStatus;
  answer?: QuestionAnswer;
  questions?: {
    [question_id: string]: QuestionProgress;
  };
}

export interface SectionProgress {
  questions: {
    [question_id: string]: QuestionProgress;
  };
  status: QuestionStatus;
}

export interface ApplicationProgress {
  sections: {
    [section_id: string]: SectionProgress;
  };
  sections_completed: number;
  total_sections: number;
  questions_completed: number;
  total_questions: number;
  is_complete: boolean;
  current_section?: string;
}

export interface Application extends BaseMetadata {
  id: string;
  type: ApplicationType;
  name: string;
  entity_id: string;
  provider_id?: string;
  grant_id: string;
  status: ApplicationStatus;
  progress: ApplicationProgress;
}

export type ApplicationUpdateInput = Partial<Omit<Application, 
  | 'id' 
  | 'entity_id' 
  | 'created_at' 
  | 'created_by'
  | 'provider_id' 
  | 'grant_id' 
  | 'type'
>>; 