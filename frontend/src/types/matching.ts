import { BaseMetadata, MatchStatus } from './common';
import { Industry, Stage } from './entity';

export interface MatchingCriteria {
  industry: Industry[];
  stage: Stage[];
  investment_size: {
    min: number;
    max: number;
    currency: string;
  };
  team_size: {
    min?: number;
    max?: number;
  };
  custom_criteria?: Record<string, any>;
}

export interface Match extends BaseMetadata {
  id: string;
  innovator_id: string;
  catalyst_id: string;
  grant_id?: string;
  application_id?: string;
  status: MatchStatus;
  score: number;
  criteria_met: MatchingCriteria[];
  response_deadline?: Date;
  investment_amount?: {
    amount: number;
    currency: string;
  };
  metadata?: {
    matching_reason?: string;
    rejection_reason?: string;
    notes?: string;
    [key: string]: any;
  };
}

export type MatchUpdateInput = Partial<Omit<Match, 
  | 'id' 
  | 'innovator_id' 
  | 'catalyst_id' 
  | 'created_at' 
  | 'created_by'
>>; 