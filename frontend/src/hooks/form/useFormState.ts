import { useState, useEffect, useCallback } from 'react';
import { FormConfig, FormSubmission, FormProgress, FormStepResponse } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';

interface UseFormStateProps {
  formId: string;
  config: FormConfig;
  onSubmit?: (data: FormSubmission) => Promise<void>;
}

interface UseFormStateReturn {
  formState: FormSubmission;
  progress: FormProgress;
  isLoading: boolean;
  error: string | null;
  updateStep: (stepId: string, responses: { [key: string]: BaseQuestionValue }) => void;
  skipStep: (stepId: string) => void;
  canAccessStep: (stepId: string) => boolean;
  submitForm: () => Promise<void>;
  getStepResponse: (stepId: string) => FormStepResponse | undefined;
}

export const useFormState = ({ formId, config, onSubmit }: UseFormStateProps): UseFormStateReturn => {
  // Load initial state from localStorage
  const getInitialState = useCallback(() => {
    const saved = localStorage.getItem(`form_${formId}`);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      form_id: formId,
      steps: {},
      current_step: config.steps[0].id,
      completed_steps: [],
      skipped_steps: [],
      is_complete: false
    } as FormSubmission;
  }, [formId, config]);

  const [formState, setFormState] = useState<FormSubmission>(getInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Autosave to localStorage
  useEffect(() => {
    localStorage.setItem(`form_${formId}`, JSON.stringify(formState));
  }, [formId, formState]);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step) {
        setFormState(prev => ({
          ...prev,
          current_step: event.state.step
        }));
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getStepResponse = useCallback((stepId: string): FormStepResponse | undefined => {
    return formState.steps[stepId];
  }, [formState.steps]);

  const updateStep = useCallback((
    stepId: string,
    responses: { [key: string]: BaseQuestionValue }
  ) => {
    const stepResponse: FormStepResponse = {
      step_id: stepId,
      responses,
      is_complete: true,
      is_skipped: false,
      last_updated: new Date()
    };

    setFormState(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        [stepId]: stepResponse
      },
      completed_steps: [...new Set([...prev.completed_steps, stepId])]
    }));
  }, []);

  const skipStep = useCallback((stepId: string) => {
    const stepResponse: FormStepResponse = {
      step_id: stepId,
      responses: {},
      is_complete: false,
      is_skipped: true,
      last_updated: new Date()
    };

    setFormState(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        [stepId]: stepResponse
      },
      skipped_steps: [...new Set([...prev.skipped_steps, stepId])]
    }));
  }, []);

  const canAccessStep = useCallback((stepId: string): boolean => {
    const step = config.steps.find(s => s.id === stepId);
    if (!step) return false;

    // Check step conditions
    if (step.conditions) {
      return step.conditions.every(condition => {
        const conditionStep = formState.steps[condition.step_id];
        switch (condition.condition) {
          case 'completed':
            return formState.completed_steps.includes(condition.step_id);
          case 'skipped':
            return formState.skipped_steps.includes(condition.step_id);
          case 'value_equals':
            return conditionStep?.responses[condition.step_id] === condition.value;
          case 'value_exists':
            return !!conditionStep?.responses[condition.step_id];
          default:
            return false;
        }
      });
    }

    return true;
  }, [config.steps, formState]);

  const submitForm = async () => {
    if (!onSubmit) return;

    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(formState);
      setFormState(prev => ({
        ...prev,
        is_complete: true
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress whenever formState changes
  const calculateProgress = useCallback((): FormProgress => {
    const currentStepIndex = config.steps.findIndex(s => s.id === formState.current_step);
    const totalSteps = config.steps.length;
    
    // Calculate percentage including current step progress
    const completedStepsCount = formState.completed_steps.length;
    const skippedStepsCount = formState.skipped_steps.length;
    const currentStepProgress = currentStepIndex > 0 && !formState.completed_steps.includes(formState.current_step) ? 0.5 : 0;
    
    const progressPercentage = (
      (completedStepsCount + skippedStepsCount + currentStepProgress) / totalSteps
    ) * 100;

    return {
      current_step: formState.current_step,
      completed_steps: formState.completed_steps,
      skipped_steps: formState.skipped_steps,
      total_steps: totalSteps,
      steps_completed: completedStepsCount,
      current_step_index: currentStepIndex,
      progress_percentage: Math.round(progressPercentage),
      is_complete: formState.is_complete
    };
  }, [formState, config.steps]);

  return {
    formState,
    progress: calculateProgress(),
    isLoading,
    error,
    updateStep,
    skipStep,
    canAccessStep,
    submitForm,
    getStepResponse
  };
}; 