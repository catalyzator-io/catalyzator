import { useState, useCallback } from 'react';
import { FormStep } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';
import { useFormValidation } from './useFormValidation';

interface UseFormStepProps {
  step: FormStep;
  initialResponses?: { [key: string]: BaseQuestionValue };
  onComplete: (responses: { [key: string]: BaseQuestionValue }) => void;
  onBack?: () => void;
}

interface UseFormStepReturn {
  responses: { [key: string]: BaseQuestionValue };
  errors: { [key: string]: string };
  isValid: boolean;
  isDirty: boolean;
  updateResponse: (questionId: string, value: BaseQuestionValue) => void;
  handleSubmit: () => void;
  handleBack: () => void;
}

export const useFormStep = ({
  step,
  initialResponses = {},
  onComplete,
  onBack
}: UseFormStepProps): UseFormStepReturn => {
  const [responses, setResponses] = useState<{ [key: string]: BaseQuestionValue }>(initialResponses);
  const [isDirty, setIsDirty] = useState(false);

  const { isValid, errors } = useFormValidation(step.questions, responses);

  const updateResponse = useCallback((questionId: string, value: BaseQuestionValue) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    setIsDirty(true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (isValid) {
      onComplete(responses);
    }
  }, [isValid, responses, onComplete]);

  const handleBack = useCallback(() => {
    if (onBack) {
      if (!isDirty || window.confirm('You have unsaved changes. Are you sure you want to go back?')) {
        onBack();
      }
    }
  }, [isDirty, onBack]);

  return {
    responses,
    errors,
    isValid,
    isDirty,
    updateResponse,
    handleSubmit,
    handleBack
  };
}; 