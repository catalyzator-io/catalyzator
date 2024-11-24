import { BaseMetadata } from './common';

export type ProductId = 'pitch-to-grant' | 'compass' | 'fundmatch';

export type ProductCategory = 'innovator' | 'catalyst' | 'both';

export type ProductFeatureId = 'pitch-to-grant' | 'grant-recommendation' | 'match-approved-innovators' | 'find-investors';

export interface ProductFeature {
  id: ProductFeatureId;
  product_id: ProductId;
  name: string;
  description: string;
  is_premium: boolean;
  metadata?: Record<string, any>;
}

export interface Product extends BaseMetadata {
  id: ProductId;
  name: string;
  description: string;
  category: ProductCategory;
  features: ProductFeature[];
  is_active: boolean;
  metadata?: {
    icon?: string;
    route?: string;
    external_link?: string;
    required_permissions?: string[];
  };
}

// Standard product access definition
export interface ProductAccess {
  is_active: boolean;
  activated_at: Date;
  features_access: {
    [K in ProductFeatureId]?: {
      is_active: boolean;
      activated_at: Date;
    };
  };
}

export type ProductAccessMap = {
  [K in ProductId]?: ProductAccess;
}; 