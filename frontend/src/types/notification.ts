import { ApplicationStatus, BaseStatus, BaseMetadata, MatchStatus, Status } from './common';
import { Industry } from './entity';
import { ProductId, ProductFeatureId } from './product';

export type NotificationPriority = 'low' | 'medium' | 'high';
export type NotificationSeverity = 'info' | 'warning' | 'error';
export type NotificationChannel = 'email' | 'push' | 'in_app';
export type ProductNotificationAction = 'activated' | 'deactivated' | 'expired' | 'renewed';
export type NotificationType = 'application_update'
    | 'grant_match'
    | 'investor_match'
    | 'team_invite'
    | 'product_update'
    | 'system';

// Base notification content
interface NotificationBase {
  title: string;
  message: string;
  link?: string;
  type: NotificationType;
  status: Status;
}

// Application-related notifications
export interface ApplicationNotification extends NotificationBase {
  type: 'application_update';
  application_id: string;
  grant_id: string;
  status: ApplicationStatus;
  updates?: {
    field: string;
    old_value: any;
    new_value: any;
  }[];
}

// Match-related notifications
export interface MatchNotification extends NotificationBase {
  type: 'grant_match' | 'investor_match';
  match_id: string;
  score: number;
  industry: Industry[];
  status: MatchStatus;
  investment_range?: {
    min: number;
    max: number;
    currency: string;
  };
}

// Team-related notifications
export interface TeamNotification extends NotificationBase {
  type: 'team_invite';
  entity_id: string;
  role: string;
  invited_by: string;
  expires_at: Date;
  status: BaseStatus;
}

// Product-related notifications
export interface ProductNotification extends NotificationBase {
  type: 'product_update';
  product_id: ProductId;
  feature_id?: ProductFeatureId;
  action: ProductNotificationAction;
  status: BaseStatus;
}

// System notifications
export interface SystemNotification extends NotificationBase {
  type: 'system';
  severity: NotificationSeverity;
  action_required?: boolean;
  status: BaseStatus;
}

// Union type for all notifications
export type NotificationContent = 
  | ApplicationNotification
  | MatchNotification
  | TeamNotification
  | ProductNotification
  | SystemNotification;

// Main notification type
export interface Notification extends Omit<BaseMetadata, 'updated_at' | 'updated_by' | 'created_by' | 'status'> {
  id: string;
  recipient_id: string;
  content: NotificationContent;
  read: boolean;
  read_at?: Date;
  expires_at?: Date;
  priority: NotificationPriority;
}

// Notification preferences per type
export type NotificationPreferences = {
  [K in NotificationContent['type']]: {
    [C in NotificationChannel]: boolean;
  };
};

export type NotificationUpdateInput = Partial<Omit<Notification, 'id' | 'recipient_id'>>; 