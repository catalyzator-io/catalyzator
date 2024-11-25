import { useState, useCallback, useEffect } from 'react';
import { FormConfig, FormSubmission, FormProgress, FormStepStatus } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';
import { useFormValidation } from './useFormValidation';
import { FormDAL } from '../../utils/dal/form';

interface UseFormStateProps {
  formId: string;
  config: FormConfig;
  onSubmit?: (formData: FormSubmission) => Promise<void>;
  autoSave?: boolean;
}

export const useFormState = ({ 
  formId, 
  config, 
  onSubmit,
  autoSave = true 
}: UseFormStateProps) => {
  // Initialize with persisted state if available
  const [formState, setFormState] = useState<FormSubmission>(() => {
    const persisted = loadPersistedState(formId);
    return persisted || {
      form_id: formId,
      steps: {},
      current_step: config.steps[0].id,
      completed_steps: [],
      skipped_steps: [],
      is_complete: false,
      last_updated: new Date()
    };
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepErrors, setStepErrors] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [isSaving, setIsSaving] = useState(false);

  const { validateStep } = useFormValidation();

  // Load saved state
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedState = await FormDAL.getFormSubmission(formId, 'current_user');
        if (savedState) {
          setFormState(savedState);
        }
      } catch (err) {
        console.error('Failed to load saved state:', err);
      }
    };
    loadSavedState();
  }, [formId]);

  // Auto-save state changes
  useEffect(() => {
    if (!autoSave) return;
    persistState(formId, formState);
  }, [formId, formState, autoSave]);

  const updateStep = useCallback((
    stepId: string,
    responses: { [key: string]: BaseQuestionValue }
  ) => {
    const step = config.steps.find(s => s.id === stepId);
    if (!step) return { isValid: false, errors: {} };

    const validationResult = validateStep(step.questions, responses);
    
    setStepErrors(prev => ({
      ...prev,
      [stepId]: validationResult.errors
    }));

    setFormState(prev => {
      // Determine step status
      let status: FormStepStatus = 'not_started';
      if (Object.keys(responses).length > 0) {
        status = validationResult.isValid ? 'completed' : 'in_progress';
      }
      if (prev.skipped_steps.includes(stepId)) {
        status = 'skipped';
      }

      return {
        ...prev,
        steps: {
          ...prev.steps,
          [stepId]: {
            step_id: stepId,
            responses,
            is_complete: validationResult.isValid,
            status,
            last_updated: new Date()
          }
        },
        current_step: stepId,
        completed_steps: validationResult.isValid 
          ? [...prev.completed_steps.filter(id => id !== stepId), stepId]
          : prev.completed_steps.filter(id => id !== stepId),
        last_updated: new Date()
      };
    });

    return validationResult;
  }, [config.steps, validateStep]);

  const skipStep = useCallback((stepId: string) => {
    const step = config.steps.find(s => s.id === stepId);
    if (!step?.is_skippable) return;

    setFormState(prev => ({
      ...prev,
      steps: {
        ...prev.steps,
        [stepId]: {
          ...prev.steps[stepId],
          status: 'skipped',
          last_updated: new Date()
        }
      },
      skipped_steps: [...prev.skipped_steps, stepId],
      last_updated: new Date()
    }));
  }, [config.steps]);

  const canAccessStep = useCallback((stepId: string): boolean => {
    const stepIndex = config.steps.findIndex(s => s.id === stepId);
    const currentIndex = config.steps.findIndex(s => s.id === formState.current_step);
    
    // Can access if:
    // 1. Step is current or previous
    // 2. Step is completed
    // 3. Previous step is completed or skipped
    return (
      stepIndex <= currentIndex ||
      formState.completed_steps.includes(stepId) ||
      (stepIndex > 0 && (
        formState.completed_steps.includes(config.steps[stepIndex - 1].id) ||
        formState.skipped_steps.includes(config.steps[stepIndex - 1].id)
      ))
    );
  }, [config.steps, formState]);

  const isStepValid = useCallback((stepId: string): boolean => {
    const step = config.steps.find(s => s.id === stepId);
    if (!step) return false;

    const stepState = formState.steps[stepId];
    if (!stepState) return false;

    return stepState.is_complete || formState.skipped_steps.includes(stepId);
  }, [config.steps, formState]);

  const submitForm = useCallback(async () => {
    if (!onSubmit) return;
    
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(formState);
      setFormState(prev => ({ 
        ...prev, 
        is_complete: true,
        last_updated: new Date()
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit form');
    } finally {
      setIsLoading(false);
    }
  }, [formState, onSubmit]);

  // Calculate progress
  const calculateProgress = useCallback((): FormProgress => {
    const currentStepIndex = config.steps.findIndex(s => s.id === formState.current_step);
    const completedCount = formState.completed_steps.length;
    const skippedCount = formState.skipped_steps.length;
    const totalSteps = config.steps.length;

    return {
      current_step: formState.current_step,
      completed_steps: formState.completed_steps,
      skipped_steps: formState.skipped_steps,
      total_steps: totalSteps,
      steps_completed: completedCount,
      current_step_index: currentStepIndex,
      progress_percentage: Math.round(((completedCount + skippedCount) / totalSteps) * 100),
      is_complete: formState.is_complete
    };
  }, [config.steps, formState]);

  // Add session storage persistence
  const STORAGE_KEY = (formId: string) => `form_state_${formId}`;

  const loadPersistedState = (formId: string): FormSubmission | null => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY(formId));
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };

  const persistState = (formId: string, state: FormSubmission) => {
    try {
      sessionStorage.setItem(STORAGE_KEY(formId), JSON.stringify(state));
    } catch (err) {
      console.error('Failed to persist form state:', err);
    }
  };

  return {
    formState,
    isLoading,
    isSaving,
    error,
    stepErrors,
    updateStep,
    skipStep,
    canAccessStep,
    submitForm,
    progress: calculateProgress(),
    isStepValid
  };
}; 