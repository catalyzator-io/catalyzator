import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/form/useForm';
import FormProgress from './FormProgress';
import FormStep from './FormStep';
import { FormErrorBoundary } from './FormErrorBoundary';
import { FormCompletion } from './FormCompletion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';
import { BaseQuestionValue } from '../../types/question';

interface FormContainerProps {
  formId: string;
  onComplete?: (formData: any) => Promise<void>;
  className?: string;
  redirectOnComplete?: string;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  formId,
  onComplete,
  className = '',
  redirectOnComplete = '/form-complete'
}) => {
  const navigate = useNavigate();
  const {
    config,
    configLoading,
    configError,
    formState,
    isFormLoading,
    formError,
    stepErrors,
    updateStep,
    skipStep,
    canAccessStep,
    submitForm,
    progress,
    isStepValid,
    loadForm
  } = useForm({
    formId,
    onComplete: async (formData) => {
      if (onComplete) {
        await onComplete(formData);
      }
      navigate(redirectOnComplete);
    }
  });

  // Create wrapper functions with correct signatures
  const handleStepSubmit = useCallback((responses: { [key: string]: BaseQuestionValue }) => {
    updateStep(formState.current_step, responses);
  }, [formState.current_step, updateStep]);

  const handleStepBack = useCallback((stepId: string) => {
    const prevResponses = formState.steps[stepId]?.responses || {};
    updateStep(stepId, prevResponses);
  }, [formState.steps, updateStep]);

  const handleSkip = useCallback(() => {
    skipStep(formState.current_step);
  }, [formState.current_step, skipStep]);

  // Load form configuration on mount
  useEffect(() => {
    loadForm();
  }, [loadForm]);

  const handleReset = useCallback(() => {
    loadForm();
  }, [loadForm]);

  // Get current step configuration
  const currentStepConfig = config?.steps.find(step => step.id === formState.current_step);

  return (
    <FormErrorBoundary onReset={handleReset}>
      <div className={cn(
        "min-h-screen bg-primary-cool-purple flex flex-col",
        "relative overflow-hidden",
        className
      )}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-crazy-orange/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-crazy-orange/10 rounded-full blur-3xl" />
        </div>

        {/* Loading State */}
        {(configLoading || !config) && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 text-white animate-spin mx-auto" />
              <p className="text-white/80">Loading form...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {configError && (
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Form</h2>
              <p className="text-gray-600">{configError}</p>
              <button
                onClick={loadForm}
                className="mt-4 px-4 py-2 bg-primary-cool-purple text-white rounded-lg hover:bg-opacity-90"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Form Content */}
        {config && !configError && currentStepConfig && (
          <>
            {/* Progress Section */}
            <div className="relative z-10 w-full px-6 py-4">
              <div className="max-w-screen-xl mx-auto">
                <FormProgress 
                  progress={progress}
                  steps={config.steps}
                  onStepClick={(stepId: string) => {
                    if (canAccessStep(stepId)) {
                      updateStep(stepId, formState.steps[stepId]?.responses || {});
                    }
                  }}
                  canNavigateToStep={canAccessStep}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 relative z-10">
              <AnimatePresence mode="wait">
                {formState.is_complete ? (
                  <FormCompletion
                    onContinue={() => navigate(redirectOnComplete)}
                  />
                ) : (
                  <motion.div
                    key={formState.current_step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-[600px]"
                  >
                    {/* Form Card */}
                    <motion.div
                      className="bg-white rounded-xl shadow-xl overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {formError && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700"
                        >
                          {formError}
                        </motion.div>
                      )}

                      {isFormLoading && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
                          <Loader2 className="w-8 h-8 text-primary-cool-purple animate-spin" />
                        </div>
                      )}

                      <div className="p-6">
                        <FormStep
                          step={currentStepConfig}
                          responses={formState.steps[formState.current_step]?.responses}
                          errors={stepErrors[formState.current_step]}
                          isValid={isStepValid(formState.current_step)}
                          onSubmit={handleStepSubmit}
                          onComplete={submitForm}
                          onStepBack={handleStepBack}
                          showBack={currentStepConfig.id !== config.steps[0].id}
                          showSkip={currentStepConfig.is_skippable}
                          onSkip={handleSkip}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </FormErrorBoundary>
  );
};

export default FormContainer; 