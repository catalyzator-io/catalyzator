import { Industry, Stage, InvestmentRange, CatalystEntity } from './entity';
import { ValidationOption } from './question';


export interface InvestorFormMetadata {
  investment_preferences?: {
    stages: Stage[];
    industries: Industry[];
    investment_range: InvestmentRange;
    annual_investments: number;
  };
  expertise?: {
    industries: Industry[];
    expertise_areas: Expertise[];
    mentorship_level: MentorshipLevel;
  };
  preferences?: {
    remote_preference: RemotePreference;
    geographic_focus: string[];
  };
}

export type InvestorEntity = CatalystEntity & {
  type: 'investor';
  form_metadata: InvestorFormMetadata;
}

// Geographic regions type
export type InvestmentRegion = 
  | 'israel'
  | 'united_states'
  | 'europe'
  | 'asia'
  | 'latin_america'
  | 'africa'
  | 'middle_east'
  | 'other';

// Constants for form options with proper typing
export const STAGE_LABELS: Record<Stage, string> = {
  'seed': 'Seed',
  'A': 'Series A',
  'B': 'Series B',
  'C': 'Series C'
};

export const INDUSTRY_LABELS =[
  { value: 'ai_ml', label: 'AI/ML' },
  { value: 'agtech', label: 'Agtech' },
  { value: 'biotech', label: 'Biotech' },
  { value: 'cleantech', label: 'Cleantech' },
  { value: 'cyber_security', label: 'Cyber Security' },
  { value: 'e_commerce', label: 'E-Commerce' },
  { value: 'edtech', label: 'Edtech' },
  { value: 'enterprise_software', label: 'Enterprise Software' },
  { value: 'fintech', label: 'Fintech' },
  { value: 'foodtech', label: 'Foodtech' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'hardware', label: 'Hardware' },
  { value: 'iot', label: 'IoT' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'media', label: 'Media' },
  { value: 'mobility', label: 'Mobility' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'retail', label: 'Retail' },
  { value: 'robotics', label: 'Robotics' },
  { value: 'saas', label: 'SaaS' },
  { value: 'semiconductor', label: 'Semiconductor' },
  { value: 'space', label: 'Space' },
  { value: 'telecom', label: 'Telecom' },
  { value: 'web3', label: 'Web3' },
  { value: 'other', label: 'Other' }
];

export const INVESTMENT_RANGE_LABELS: Record<InvestmentRangeType, string> = {
  'up_to_25k': 'Up to $25K',
  '25k_to_50k': '$25K-$50K',
  '50k_to_100k': '$50K-$100K',
  '100k_to_250k': '$100K-$250K',
  '250k_to_500k': '$250K-$500K',
  'above_500k': '$500K+'
};

export const EXPERTISE_LABELS: Record<Expertise, string> = {
  'strategy_business_development': 'Strategy & Business Development',
  'technology_product_development': 'Technology & Product Development',
  'sales_marketing': 'Sales & Marketing',
  'financial_management': 'Financial Management',
  'hr_team_building': 'HR & Team Building',
  'legal_regulatory': 'Legal & Regulatory',
  'international_expansion': 'International Expansion',
  'industry_connections': 'Industry Connections',
  'fundraising': 'Fundraising',
  'operations': 'Operations',
  'other': 'Other'
};

export const MENTORSHIP_LEVEL_LABELS: Record<MentorshipLevel, string> = {
  'very_active': 'Very Active (>5 hours/month)',
  'active': 'Active (2-5 hours/month)',
  'limited': 'Limited (<2 hours/month)',
  'case_by_case': 'Case by case basis'
};

export const REMOTE_PREFERENCE_LABELS: Record<RemotePreference, string> = {
  'fully_remote': 'Yes, completely comfortable',
  'hybrid': 'Yes, with some conditions',
  'in_person_only': 'No, prefer in-person meetings'
};

export const INVESTMENT_REGION_LABELS: Record<InvestmentRegion, string> = {
  'israel': 'Israel',
  'united_states': 'United States',
  'europe': 'Europe',
  'asia': 'Asia',
  'latin_america': 'Latin America',
  'africa': 'Africa',
  'middle_east': 'Middle East',
  'other': 'Other'
};

// Helper function to create options
export const createOptions = <T extends string>(labels: Record<T, string>): ValidationOption[] => {
  return Object.entries(labels).map(([value, label]) => ({ value, label: label as string }));
};

// Move these types from entity.ts to here
export type InvestmentRangeType = 
  | 'up_to_25k'
  | '25k_to_50k'
  | '50k_to_100k'
  | '100k_to_250k'
  | '250k_to_500k'
  | 'above_500k';


export type MentorshipLevel =
  | 'very_active'
  | 'active'
  | 'limited'
  | 'case_by_case';

export type RemotePreference =
  | 'fully_remote'
  | 'hybrid'
  | 'in_person_only';

export type Expertise = 
  | 'strategy_business_development'
  | 'technology_product_development'
  | 'sales_marketing'
  | 'financial_management'
  | 'hr_team_building'
  | 'legal_regulatory'
  | 'international_expansion'
  | 'industry_connections'
  | 'fundraising'
  | 'operations'
  | 'other';
  