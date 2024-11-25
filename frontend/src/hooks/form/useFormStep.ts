import { useState, useCallback, useEffect } from 'react';
import { FormStep, FormStepState } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';
import { useFormValidation } from './useFormValidation';

interface UseFormStepProps {
  step: FormStep;
  initialState?: FormStepState;
  onComplete: (responses: { [key: string]: BaseQuestionValue }) => void;
  onBack?: () => void;
  onSkip?: () => void;
}

export const useFormStep = ({
  step,
  initialState,
  onComplete,
  onBack,
  onSkip
}: UseFormStepProps) => {
  const [responses, setResponses] = useState<{ [key: string]: BaseQuestionValue }>(
    initialState?.responses || {}
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const { validateStep } = useFormValidation();

  // Reset state when step changes
  useEffect(() => {
    setResponses(initialState?.responses || {});
    setErrors({});
    setIsDirty(false);
  }, [step.id, initialState]);

  // Prompt before leaving if dirty
  useEffect(() => {
    if (isDirty) {
      const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [isDirty]);

  const updateResponse = useCallback((questionId: string, value: BaseQuestionValue) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    setErrors(prev => ({
      ...prev,
      [questionId]: ''
    }));
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    const { isValid, errors: validationErrors } = validateStep(step.questions, responses);

    if (!isValid) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onComplete(responses);
      setIsDirty(false);
    } catch (err) {
      console.error('Failed to complete step:', err);
      setErrors({ _form: 'Failed to save step' });
    } finally {
      setIsSubmitting(false);
    }
  }, [step, responses, onComplete, validateStep]);

  const handleBack = useCallback(() => {
    if (!isDirty || window.confirm('You have unsaved changes. Are you sure you want to go back?')) {
      onBack?.();
    }
  }, [isDirty, onBack]);

  const handleSkip = useCallback(() => {
    if (!isDirty || window.confirm('You have unsaved changes. Are you sure you want to skip this step?')) {
      onSkip?.();
    }
  }, [isDirty, onSkip]);

  return {
    responses,
    errors,
    isSubmitting,
    isDirty,
    updateResponse,
    handleSubmit,
    handleBack,
    handleSkip
  };
}; 