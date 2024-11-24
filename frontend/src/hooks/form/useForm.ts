import { useState, useCallback } from 'react';
import { 
  FormConfig, 
  FormSubmission, 
  FormStepResponse,
  FormProgress
} from '../../types/form';
import { BaseQuestionValue } from '../../types/question';

interface UseFormProps {
  formConfig: FormConfig;
  initialData?: FormSubmission;
}

interface UseFormReturn {
  currentStep: string;
  progress: FormProgress;
  responses: { [key: string]: FormStepResponse };
  isComplete: boolean;
  goToStep: (stepId: string) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  submitStepResponse: (stepId: string, responses: { [key: string]: BaseQuestionValue }) => void;
  skipStep: (stepId: string) => void;
  isStepValid: (stepId: string) => boolean;
  canNavigateToStep: (stepId: string) => boolean;
}

export const useForm = ({ formConfig, initialData }: UseFormProps): UseFormReturn => {
  const [currentStep, setCurrentStep] = useState(initialData?.current_step || formConfig.steps[0].id);
  const [responses, setResponses] = useState<{ [key: string]: FormStepResponse }>(initialData?.steps || {});
  const [completedSteps, setCompletedSteps] = useState<string[]>(initialData?.completed_steps || []);
  const [skippedSteps, setSkippedSteps] = useState<string[]>(initialData?.skipped_steps || []);

  // Calculate current progress
  const progress: FormProgress = {
    current_step: currentStep,
    completed_steps: completedSteps,
    skipped_steps: skippedSteps,
    total_steps: formConfig.steps.length,
    steps_completed: completedSteps.length,
    current_step_index: formConfig.steps.findIndex(s => s.id === currentStep),
    progress_percentage: Math.round(
      ((completedSteps.length + skippedSteps.length) / formConfig.steps.length) * 100
    ),
    is_complete: completedSteps.length + skippedSteps.length === formConfig.steps.length
  };

  const isStepValid = useCallback((stepId: string): boolean => {
    const step = formConfig.steps.find(s => s.id === stepId);
    if (!step) return false;

    const stepResponse = responses[stepId];
    if (!stepResponse) return false;

    // Check if all required questions have responses
    return step.questions.every(question => {
      if (!question.required) return true;
      return stepResponse.responses[question.id] !== undefined;
    });
  }, [formConfig.steps, responses]);

  const canNavigateToStep = useCallback((stepId: string): boolean => {
    const stepIndex = formConfig.steps.findIndex(s => s.id === stepId);
    if (stepIndex === -1) return false;

    // Can always navigate to first step
    if (stepIndex === 0) return true;

    // Check if all previous steps are either completed or skipped
    for (let i = 0; i < stepIndex; i++) {
      const prevStepId = formConfig.steps[i].id;
      if (!completedSteps.includes(prevStepId) && !skippedSteps.includes(prevStepId)) {
        return false;
      }
    }

    return true;
  }, [formConfig.steps, completedSteps, skippedSteps]);

  const goToStep = useCallback((stepId: string) => {
    if (canNavigateToStep(stepId)) {
      setCurrentStep(stepId);
    }
  }, [canNavigateToStep]);

  const goToNextStep = useCallback(() => {
    const currentIndex = formConfig.steps.findIndex(s => s.id === currentStep);
    if (currentIndex < formConfig.steps.length - 1) {
      const nextStep = formConfig.steps[currentIndex + 1];
      goToStep(nextStep.id);
    }
  }, [currentStep, formConfig.steps, goToStep]);

  const goToPreviousStep = useCallback(() => {
    const currentIndex = formConfig.steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      const prevStep = formConfig.steps[currentIndex - 1];
      goToStep(prevStep.id);
    }
  }, [currentStep, formConfig.steps, goToStep]);

  const submitStepResponse = useCallback((
    stepId: string, 
    stepResponses: { [key: string]: BaseQuestionValue }
  ) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: {
        step_id: stepId,
        responses: stepResponses,
        is_complete: true,
        last_updated: new Date()
      }
    }));
    setCompletedSteps(prev => [...new Set([...prev, stepId])]);
  }, []);

  const skipStep = useCallback((stepId: string) => {
    const step = formConfig.steps.find(s => s.id === stepId);
    if (step?.is_skippable) {
      setSkippedSteps(prev => [...new Set([...prev, stepId])]);
      goToNextStep();
    }
  }, [formConfig.steps, goToNextStep]);

  return {
    currentStep,
    progress,
    responses,
    isComplete: progress.is_complete,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    submitStepResponse,
    skipStep,
    isStepValid,
    canNavigateToStep
  };
}; 