import { BaseMetadata, FileReference, GrantStatus } from './common';
import { Industry, Stage } from './entity';
import { BaseQuestion } from './question';

export type GrantQuestionContentType =
  | 'business_plan'
  | 'financial_projection'
  | 'team_description'
  | 'market_analysis'
  | 'product_description'
  | 'ip_status'
  | 'milestones'
  | 'budget'
  | 'other';

// Extend base question for grant-specific needs
export interface GrantQuestion extends BaseQuestion {
  content_type: GrantQuestionContentType;
}

export interface GrantSection {
  id: string;
  title: string;
  description: string;
  questions: GrantQuestion[];
}

export interface GrantRequirements {
  min_team_size?: number;
  max_team_size?: number;
  allowed_industries: Industry[];
  allowed_stages: Stage[];
  required_documents: string[];
  other_requirements?: string[];
}

export interface GrantFinancials {
  total_amount: number;
  min_amount: number;
  max_amount: number;
  currency: string;
  matching_required: boolean;
  matching_percentage?: number;
}

export interface GrantTimeline {
    applications_open: Date;
    applications_close: Date;
    review_period_end?: Date;
    program_start?: Date;
    program_end?: Date;
}

export interface Grant extends BaseMetadata {
  id: string;
  name: string;
  description: string;
  catalyst_id: string; // entity id of the catalyst
  status: GrantStatus;
  requirements: GrantRequirements;
  financials: GrantFinancials;
  sections: GrantSection[];
  timeline: GrantTimeline;
  attachments?: {
    [key: string]: FileReference;
  };
}

export type GrantUpdateInput = Partial<Omit<Grant, 'id' | 'catalyst_id' | 'created_at' | 'created_by'>>; 