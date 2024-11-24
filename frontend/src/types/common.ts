// Common types used across the system

// Base status types
export type BaseStatus = 
  | 'active' 
  | 'inactive' 
  | 'pending' 
  | 'archived';

// Application specific statuses
export type ApplicationStatus = 
  | 'draft'
  | 'in_progress' 
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected';

// Grant specific statuses
export type GrantStatus = 
  | 'draft'
  | 'active'
  | 'paused'
  | 'closed';

// Match specific statuses
export type MatchStatus = 
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'expired'
  | 'completed';

// Combined status type
export type Status = BaseStatus | ApplicationStatus | GrantStatus | MatchStatus;

export type EntityType = 'innovator' | 'catalyst';

export interface BaseMetadata {
  created_at: Date;
  updated_at?: Date;
  created_by: string; // user id
  updated_by?: string; // user id
  status: Status;
}

export interface FileReference {
  url: string;
  name: string;
  type: string;
  size: number;
  uploaded_at: Date;
}

export type Theme = 'light' | 'dark' | 'system';

export type Language = 'en';