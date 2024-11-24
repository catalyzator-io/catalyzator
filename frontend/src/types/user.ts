import { BaseMetadata, Theme, Language, EntityType } from './common';
import { ProductAccessMap } from './product';
import { NotificationPreferences } from './notification';

export interface UserProfile {
  full_name: string;
  email: string;
  phone?: string;
  description?: string;
  photo_url?: string;
  primary_entity_type?: EntityType;
  entity_ids: string[];
}

export interface UserSettings {
  notifications: NotificationPreferences;
  theme: Theme;
  language: Language;
  marketing_emails: boolean;
}

export interface User extends Omit<BaseMetadata, 'status' > {
  id: string;
  profile: UserProfile;
  settings: UserSettings;
  product_access: ProductAccessMap;
}

export type UserUpdateInput = {profile: Partial<UserProfile>, settings: Partial<UserSettings>, product_access: Partial<ProductAccessMap>};