import React from 'react';
import { FormConfig } from '../../types/form';
import { useFormState } from '../../hooks/form/useFormState';
import FormProgress from './FormProgress';
import FormStep from './FormStep';
import FormNavigation from './FormNavigation';
import { BaseQuestionValue } from '../../types/question';
import { Loader2 } from 'lucide-react';

interface FormContainerProps {
  config: FormConfig;
  onComplete?: (formData: any) => Promise<void>;
  className?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  config,
  onComplete,
  className = ''
}) => {
  const {
    formState,
    isLoading,
    error,
    updateStep,
    skipStep,
    canAccessStep,
    submitForm
  } = useFormState({
    formId: config.id,
    config,
    onSubmit: onComplete
  });

  const currentStepConfig = config.steps.find(step => step.id === formState.current_step);

  if (!currentStepConfig) {
    return <div>Error: Step not found</div>;
  }

  const current_step_index = config.steps.findIndex(s => s.id === formState.current_step);
  const progress = {
    current_step: formState.current_step,
    completed_steps: formState.completed_steps,
    skipped_steps: formState.skipped_steps,
    total_steps: config.steps.length,
    steps_completed: formState.completed_steps.length,
    current_step_index: current_step_index,
    progress_percentage: Math.round(current_step_index / config.steps.length * 100),
    is_complete: formState.is_complete
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary-cool-purple" />
        <p className="text-gray-600">Saving your progress...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      <FormProgress 
        progress={progress} 
        steps={config.steps}
        onStepClick={(stepId) => {
          if (canAccessStep(stepId)) {
            window.history.pushState({ step: stepId }, '', `#${stepId}`);
            updateStep(formState.current_step, {});
          }
        }}
        canNavigateToStep={canAccessStep}
      />
      
      <FormStep
        step={currentStepConfig}
        responses={formState.steps[formState.current_step]?.responses}
        onSubmit={(stepResponses: { [key: string]: BaseQuestionValue }) => {
          updateStep(formState.current_step, stepResponses);
          if (!formState.is_complete) {
            const nextStep = config.steps[
              config.steps.findIndex(s => s.id === formState.current_step) + 1
            ];
            if (nextStep) {
              window.history.pushState({ step: nextStep.id }, '', `#${nextStep.id}`);
            } else {
              submitForm();
            }
          }
        }}
        onBack={() => {
          const prevStep = config.steps[
            config.steps.findIndex(s => s.id === formState.current_step) - 1
          ];
          if (prevStep) {
            window.history.pushState({ step: prevStep.id }, '', `#${prevStep.id}`);
          }
        }}
      />

      <FormNavigation
        showBack={currentStepConfig.id !== config.steps[0].id}
        showSkip={currentStepConfig.is_skippable ?? false}
        onBack={() => window.history.back()}
        onSkip={() => {
          skipStep(formState.current_step);
          const nextStep = config.steps[
            config.steps.findIndex(s => s.id === formState.current_step) + 1
          ];
          if (nextStep) {
            window.history.pushState({ step: nextStep.id }, '', `#${nextStep.id}`);
          }
        }}
      />
    </div>
  );
};

export default FormContainer; 