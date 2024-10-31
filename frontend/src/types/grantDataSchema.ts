
// Schema for Basic Info
export interface BasicPersonalInfo {
  fullName: string;
  nationalId: string;
  companyName: string;
  companyNameEn: string;
  companyUrl: string;
  foundingYear: string;
  address: string;
  phone: string;
  email: string;
}

export interface BasicCompanyInfo {
    companyName: string;
    companyNameEn: string;
    companyUrl: string;
    foundingYear: string;
    address: string;
  }

// Schema for Founders
export interface Founder {
  founderName: string;
  shareholding: number;
  nationalId: string; // URL or path to the uploaded document
  cv: string;        // URL or path to the uploaded CV
  email: string;
  phone: string;
}

export interface FoundersCollection {
  founders: Founder[];
}

// Schema for Budget
export interface Budget {
  amount: number; // Max 250,000
  desiredDate: string; // Date string
}

// Schema for Team Members
export interface TeamMember {
  memberName: string;
  linkedin: string;
}

export interface TeamCollection {
  teamMembers: TeamMember[];
}

// Schema for Academic Inquiry
export interface AcademicInquiry {
  hasAcademics: 'yes' | 'no';
}

// Schema for IP Rights Verification
export interface IPRightsVerification {
  violatesIP: 'yes' | 'no';
}

// Schema for IP Rights Protection
export interface IPRightsProtection {
  protectionDetails: string; // Description of the protection process
}

// Schema for Open Source Code Details
export interface OpenSourceDetails {
  details: string; // List of open-source components
}

// Schema for Pitch Deck
export interface PitchDeck {
  pitchDeckUrl: string; // URL or path to the uploaded pitch deck
}

// Schema for Pitch Recording
export interface PitchRecording {
  recordingUrl: string; // URL or path to the uploaded recording
}

export interface OtherText {
    otherText: string;
}

export interface OtherFiles {
    otherFilesUrl: string;
}

// Main Form Schema
export interface FormData {
  basicPersonalInfo: BasicPersonalInfo;
  basicCompanyInfo: BasicCompanyInfo;
  founders?: FoundersCollection; // Optional, based on multiple_entries
  budget?: Budget;
  team?: TeamCollection; // Optional, based on multiple_entries
  academicInquiry?: AcademicInquiry;
  ipRightsVerification?: IPRightsVerification;
  ipRightsProtection?: IPRightsProtection;
  openSourceDetails?: OpenSourceDetails;
  pitchDeck?: PitchDeck;
  pitchRecording?: PitchRecording;
  otherText?: OtherText;
  otherFiles?: OtherFiles;
}

// Firestore Collection Paths
export const COLLECTIONS = {
  basicPersonalInfo: 'basicPersonalInfo',
  basicCompanyInfo: 'basicCompanyInfo',
  founders: 'founders',
  budget: 'budget',
  team: 'team',
  academicInquiry: 'academicInquiry',
  ipRightsVerification: 'ipRightsVerification',
  ipRightsProtection: 'ipRightsProtection',
  openSourceDetails: 'openSourceDetails',
  pitchDeck: 'pitchDeck',
  pitchRecording: 'pitchRecording',
  otherText: 'otherText',
  otherFiles: 'otherFiles'
};