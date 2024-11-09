export interface Grant {
  id: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
} 