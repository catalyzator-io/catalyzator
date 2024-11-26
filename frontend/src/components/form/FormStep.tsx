import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FormStep as FormStepType } from '../../types/form';
import { BaseQuestionResponse } from '../../types/question';
import FormQuestion from './FormQuestion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';
import { ScrollArea } from '../ui/scroll-area';
import { useFormStep } from '../../hooks/form/useFormStep';
import { formDAL } from '../../utils/dal/form';

interface FormStepProps {
  step: FormStepType;
  responses?: { [key: string]: BaseQuestionResponse };
  errors?: { [key: string]: string };
  isValid?: boolean;
  onSubmit: (responses: { [key: string]: BaseQuestionResponse }) => void;
  onSkip?: () => void;
  showBack?: boolean;
  showSkip?: boolean;
  onComplete: (stepId: string) => void;
  onStepBack: (stepId: string) => void;
}

export const FormStep: React.FC<FormStepProps> = ({  // Changed to named export
  step,
  responses: initialResponses = {},
  errors: initialErrors = {},
  isValid = false,
  onSubmit,
  onSkip,
  showBack = false,
  showSkip = false,
  onComplete,
  onStepBack
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const {
    responses,
    errors,
    isSubmitting,
    isDirty,
    updateResponse: handleResponseUpdate,
    handleSubmit: baseHandleSubmit
  } = useFormStep({
    step,
    initialState: {
      step_id: step.id,
      responses: initialResponses,
      is_complete: isValid,
      status: isValid ? 'completed' : 'in_progress'
    },
    onComplete: async (responses) => {
      await formDAL.trackStepAttempt(step.id, step.id);
      onSubmit(responses);
      if (isValid) {
        onComplete(step.id);
      }
    },
    onBack: () => onStepBack(step.id)
  });

  // Reset error visibility when step changes
  useEffect(() => {
    setShowErrors(false);
  }, [step.id]);

  // Track validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0 && showErrors) {
      formDAL.trackValidationError(step.id, step.id);
    }
  }, [errors, step.id, showErrors]);

  const handleBack = () => {
    onStepBack(step.id);
  };

  const handleSubmitAttempt = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    baseHandleSubmit();
  }, [baseHandleSubmit]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleSubmitAttempt(new Event('submit') as any);
      }
      if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSubmitAttempt, handleBack]);

  return (
    <motion.form 
      onSubmit={handleSubmitAttempt}
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <ScrollArea className="max-h-[60vh]">
        {/* Title Section */}
        <motion.div
          className="mb-6 bg-white/5 backdrop-blur-sm rounded-xl pt-6 border border-white/10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-primary-cool-purple">{step.title}</h2>
          {step.description && (
            <p className="guidelines mb-6 text-gray-600 whitespace-pre-line">{step.description}</p>
          )}
        </motion.div>

        <div className="space-y-6 px-2">
          {step.questions.map((question, index) => (
            <motion.div 
              key={question.id} 
              className={cn(
                "p-4 rounded-lg border backdrop-blur-sm",
                errors[question.id] && showErrors
                  ? "border-red-300 bg-red-50/50" 
                  : "border-primary-crazy-orange/20 bg-white/5"
              )}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <FormQuestion
                question={question}
                value={responses[question.id]}
                onChange={(value: BaseQuestionResponse) => handleResponseUpdate(question.id, value)}
                error={errors[question.id]}
                showError={showErrors}
              />
            </motion.div>
          ))}

          {/* Step Level Error */}
          {showErrors && Object.keys(errors).length > 0 && (
            <motion.div
              className="bg-red-50 border-l-4 border-red-400 p-4 my-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <p className="text-red-700">Please fix the errors above to continue</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      <div className="flex items-center justify-between gap-4 pt-4 border-t">
        {showBack && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={isSubmitting}
            className={cn(
              "text-primary-cool-purple hover:text-primary-cool-purple/80",
              isSubmitting && "opacity-50 cursor-not-allowed"
            )}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}

        <div className="flex-1 flex justify-end gap-4">
          {showSkip && (
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              disabled={isSubmitting}
              className={cn(
                "text-primary-cool-purple hover:text-primary-cool-purple/80",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              Skip
            </Button>
          )}

          <Button
            type="submit"
            className={cn(
              "flex items-center justify-center gap-2",
              "bg-primary-crazy-orange hover:bg-primary-crazy-orange/90",
              "transition-all duration-200",
              "min-w-[120px] py-6",
              (isSubmitting || !isValid) && "opacity-50 cursor-not-allowed"
            )}
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.form>
  );
};