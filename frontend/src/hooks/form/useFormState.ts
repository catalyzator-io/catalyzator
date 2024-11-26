import { useState, useCallback, useEffect } from 'react';
import { FormConfig, FormSubmission, FormProgress, FormStepStatus } from '../../types/form';
import { BaseQuestionResponse } from '../../types/question';
import { useFormValidation } from './useFormValidation';
import { formDAL } from '../../utils/dal/form';
import { storage } from '../../utils/storage';

interface UseFormStateProps {
  formId: string;
  config: FormConfig;
  onSubmit?: (formData: FormSubmission) => Promise<void>;
  autoSave?: boolean;
}

const STORAGE_KEY = (formId: string) => `form_state_${formId}`;

const loadPersistedState = (formId: string): FormSubmission | null => {
  if (!storage.isAvailable()) {
    return null;
  }

  try {
    const saved = storage.get(STORAGE_KEY(formId));
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const persistState = (formId: string, state: FormSubmission) => {
  if (!storage.isAvailable()) {
    return;
  }

  try {
    storage.set(STORAGE_KEY(formId), JSON.stringify(state));
  } catch (err) {
    console.error('Failed to persist form state:', err);
  }
};

export const useFormState = ({ 
  formId, 
  config, 
  onSubmit,
  autoSave = true 
}: UseFormStateProps) => {
  // Always declare all hooks first, regardless of conditions
  const [formState, setFormState] = useState<FormSubmission>(() => {
    const persisted = loadPersistedState(formId);
    return persisted || {
      form_id: formId,
      steps: {},
      current_step: config?.steps[0]?.id || '',
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

  // Effects
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        // Try to load draft first
        const draftState = await formDAL.getDraftSubmission(formId);
        if (draftState) {
          setFormState(draftState);
          return;
        }

        // If no draft, try to load completed submission
        const savedState = await formDAL.getFormSubmission(formId, 'current_user');
        if (savedState) {
          setFormState(savedState);
        }
      } catch (err) {
        console.error('Failed to load saved state:', err);
      }
    };
    loadSavedState();
  }, [formId]);

  useEffect(() => {
    if (!autoSave) return;

    const saveDraft = async () => {
      try {
        setIsSaving(true);
        await formDAL.saveFormDraft(formState);
      } catch (err) {
        console.error('Failed to save draft:', err);
      } finally {
        setIsSaving(false);
      }
    };

    const timeoutId = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timeoutId);
  }, [formState, autoSave]);

  useEffect(() => {
    console.log('config', config);
    if (!config) {
      setError('Form configuration is missing');
      return;
    }

    if (!config.steps.length) {
      setError('Form has no steps configured');
      return;
    }

    if (!formState.current_step && config.steps.length > 0) {
      setFormState(prev => ({
        ...prev,
        current_step: config.steps[0].id
      }));
    }
  }, [config, formState.current_step]);

  // Callbacks
  const updateStep = useCallback((
    stepId: string,
    responses: { [key: string]: BaseQuestionResponse }
  ) => {
    if (!config) return { isValid: false, errors: { _form: 'Form configuration is missing' } };

    const step = config.steps.find(s => s.id === stepId);
    if (!step) return { isValid: false, errors: {} };

    const validationResult = validateStep(step.questions, responses);
    
    setStepErrors(prev => ({
      ...prev,
      [stepId]: validationResult.errors
    }));

    setFormState(prev => {
      const newResponses = Object.entries(responses).reduce((acc, [id, response]) => ({
        ...acc,
        [id]: {
          ...response,
          last_updated: new Date()
        }
      }), {});

      return {
        ...prev,
        steps: {
          ...prev.steps,
          [stepId]: {
            step_id: stepId,
            responses: newResponses,
            is_complete: validationResult.isValid,
            status: validationResult.isValid ? 'completed' : 'in_progress',
            last_updated: new Date()
          }
        }
      };
    });

    return validationResult;
  }, [config, validateStep]);

  const skipStep = useCallback((stepId: string) => {
    if (!config) return;
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
    if (!config) return false;
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
    if (!config) return false;
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
      await formDAL.submitForm(formState);
      await formDAL.clearDraft(formId); // Clear draft after successful submission
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
  }, [formState, onSubmit, formId]);

  // Calculate progress
  const calculateProgress = useCallback((): FormProgress => {
    if (!config) {
      return {
        current_step: '',
        completed_steps: [],
        skipped_steps: [],
        total_steps: 0,
        steps_completed: 0,
        current_step_index: -1,
        progress_percentage: 0,
        is_complete: false
      };
    }
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