import { LucideIcon } from 'lucide-react';

export type ProductId = 'pitch-to-grant' | 'compass' | 'fundmatch';

export type ProductCategory = 'innovator' | 'catalyst';

export interface Product {
  id: ProductId;
  title: string;
  description: string;
  icon: LucideIcon;
  category: ProductCategory;
  route: string;
}

export interface UserProductAccess {
  productId: ProductId;
  is_active: boolean;
  joinedAt: Date;
} 