import { Entity } from './entity';
import { ProductId } from './product';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  description?: string;
  photoURL?: string;
  entity_ids?: string[];
  created_at?: Date;
  updated_at?: Date;
  settings?: UserSettings;
  access?: UserAccess;
}

interface UserSettings {
  notifications?: {
    email: boolean;
    push: boolean;
  };
  theme?: 'light' | 'dark' | 'system';
  language?: string;
}

interface UserAccess {
  products?: {
    [K in ProductId]?: {
      status: 'active' | 'waitlist';
      joinedAt: Date;
      metadata?: Record<string, any>;
    };
  };
}

export interface ProfileData {
  profile: UserProfile;
  entities: Entity[];
}

export interface ProfileUpdateInput extends Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>> {
  // Fields that can be updated
} 