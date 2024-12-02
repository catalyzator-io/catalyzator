import { BaseMetadata, FileReference } from './common';
import { ProductAccessMap } from './product';
import { Application } from './application';

export type EntityType = 'innovator' | 'catalyst';

export type Stage = 'early_stage' | 'seed' | 'A' | 'B' | 'C';

export type Industry =
  | 'ai_ml'
  | 'agtech'
  | 'biotech'
  | 'cleantech'
  | 'cyber_security'
  | 'e_commerce'
  | 'edtech'
  | 'enterprise_software'
  | 'fintech'
  | 'foodtech'
  | 'gaming'
  | 'healthcare'
  | 'hardware'
  | 'iot'
  | 'logistics'
  | 'marketplace'
  | 'media'
  | 'mobility'
  | 'real_estate'
  | 'retail'
  | 'robotics'
  | 'saas'
  | 'semiconductor'
  | 'space'
  | 'telecom'
  | 'web3'
  | 'other';

export type InvestmentRange = {
  min: number;
  max: number;
  currency: string;
};

interface EntityBase extends BaseMetadata {
  id: string;
  name: string;
  name_en?: string;
  description?: string;
  logo?: FileReference;
  website?: string;
  type: EntityType;
  members: string[]; // User IDs of team members with access
  forms?: {
    [formId: string]: {
      status: 'draft' | 'submitted' | 'approved' | 'rejected';
      submitted_at?: Date;
      updated_at: Date;
    };
  };
}

export interface InnovatorEntity extends EntityBase {
  type: 'innovator';
  founding_date?: Date;
  team_size?: number;
  industry: Industry[]; // Changed from optional string[] to required Industry[]
  stage?: Stage;
  product_access: ProductAccessMap;
  applications: {
    [applicationId: string]: Application;
  };
  other_industry_details?: string; // For when 'other' is selected in industry
}

export interface CatalystEntity extends EntityBase {
  type: 'catalyst';
  investment_thesis?: string;
  investment_range?: InvestmentRange;
  active_grants: string[]; // Grant IDs this catalyst manages
  preferred_industries?: Industry[]; // Added preferred industries for matching
}

export type Entity = InnovatorEntity | CatalystEntity;

export type EntityUpdateInput = Partial<Omit<EntityBase, 'id' | 'type' | 'members'>>;

