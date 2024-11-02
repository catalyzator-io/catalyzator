export interface Application {
    id: string;
    name: string;
    status: 'draft' | 'in_progress' | 'completed' | 'rejected' | 'approved';
    hasUpdates?: boolean;
    lastUpdate?: string;
    formData: any;
    entityId: string;
    providerId?: string;
    grantId?: string;
    currentStep: number;
    startTime: Date;
    progress: {
      sectionsFilled: number;
      totalSections: number;
      isComplete: boolean;
    };
  }
  
  export interface Entity {
    id: string;
    basicInfo?: {
      companyName?: string;
      companyNameEn?: string;
      companyUrl?: string;
    };
    type?: string;
    story?: string;
    role?: string;
    team?: {
      founders: string[];
      employeeCount: number;
    };
    status?: string;
    transactionStage?: string;
    products?: {
      grants?: {
        [key: string]: Application;
      };
    };
    created_at?: string;
    created_by?: string;
    updated_at?: string;
  }