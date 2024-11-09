import { LucideIcon } from 'lucide-react';

export type ProductId = 
  | 'pitch-to-grant'
  | 'navigator'
  | 'launch-suite'
  | 'market-radar'
  | 'catalyzator-os'
  | 'impact-view'
  | 'grant-match'
  | 'insights-connect';

export type ProductCategory = 'catalyzatee' | 'catalyzator';

export type ProductStatus = 'active' | 'waitlist' | 'coming_soon';

export interface Product {
  id: ProductId;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ProductCategory;
  status: ProductStatus;
  route?: string;
  waitlistRoute?: string;
}

export interface UserProductAccess {
  productId: ProductId;
  is_active: boolean;
  is_waitlisted: boolean;
  joinedAt: Date;
  metadata?: Record<string, any>;
} 