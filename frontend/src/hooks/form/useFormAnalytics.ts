import { useState, useEffect } from 'react';
import { FormSubmission } from '../../types/form';

interface FormAnalytics {
  timeSpentPerStep: { [stepId: string]: number };
  totalTimeSpent: number;
  stepAttempts: { [stepId: string]: number };
  completionRate: number;
}

export const useFormAnalytics = (formState: FormSubmission) => {
  const [analytics, setAnalytics] = useState<FormAnalytics>({
    timeSpentPerStep: {},
    totalTimeSpent: 0,
    stepAttempts: {},
    completionRate: 0
  });

  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const duration = Date.now() - startTime;
      setAnalytics((prev: FormAnalytics) => ({
        ...prev,
        timeSpentPerStep: {
          ...prev.timeSpentPerStep,
          [formState.current_step]: (prev.timeSpentPerStep[formState.current_step] || 0) + duration
        }
      }));
    };
  }, [formState.current_step]);

  return analytics;
}; 