import React from 'react';
import { motion } from 'framer-motion';
import { FormProgress as FormProgressType, FormStep } from '../../types/form';
import { Check, Circle, Lock, AlertCircle } from 'lucide-react';

// Define valid step statuses
type StepStatus = 'completed' | 'current' | 'error' | 'skipped' | 'pending';

interface FormProgressProps {
  progress: FormProgressType;
  steps: FormStep[];
  onStepClick: (stepId: string) => void;
  canNavigateToStep: (stepId: string) => boolean;
  errors?: { [stepId: string]: boolean };
}

const FormProgress: React.FC<FormProgressProps> = ({
  progress,
  steps,
  onStepClick,
  canNavigateToStep,
  errors = {}
}) => {
  const getStepStatus = (stepId: string): StepStatus => {
    if (errors[stepId]) return 'error';
    if (progress.completed_steps.includes(stepId)) return 'completed';
    if (progress.skipped_steps.includes(stepId)) return 'skipped';
    if (progress.current_step === stepId) return 'current';
    return 'pending';
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5" />;
      case 'skipped':
        return <Circle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStepStyles = (status: StepStatus, canNavigate: boolean) => {
    const baseStyles = 'transition-all duration-200';
    const stateStyles: Record<StepStatus, string> = {
      completed: 'bg-primary-cool-purple text-white',
      current: 'bg-white border-2 border-primary-cool-purple text-primary-cool-purple',
      error: 'bg-red-50 border-2 border-red-500 text-red-500',
      skipped: 'bg-gray-300 text-gray-600',
      pending: 'bg-gray-100 text-gray-400'
    };
    const accessStyles = canNavigate 
      ? 'hover:scale-110 cursor-pointer' 
      : 'cursor-not-allowed opacity-50';

    return `${baseStyles} ${stateStyles[status]} ${accessStyles}`;
  };

  return (
    <div className="w-full space-y-4">
      {/* Progress percentage and step counter */}
      <div className="flex justify-between items-center">
        <motion.span 
          className="text-sm font-medium text-gray-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={progress.steps_completed}
        >
          Progress: {progress.progress_percentage}%
        </motion.span>
        <span className="text-sm text-gray-600">
          Step {progress.current_step_index + 1} of {progress.total_steps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-2">
        <div className="absolute w-full h-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-cool-purple to-primary-crazy-orange"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progress_percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const canNavigate = canNavigateToStep(step.id);
          const isCurrent = index === progress.current_step_index;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.button
                onClick={() => canNavigate && onStepClick(step.id)}
                disabled={!canNavigate}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center ${getStepStyles(status, canNavigate)}`}
                whileHover={canNavigate ? { scale: 1.1 } : {}}
                whileTap={canNavigate ? { scale: 0.95 } : {}}
              >
                {getStepIcon(status) || (!canNavigate ? <Lock className="w-4 h-4" /> : <span>{index + 1}</span>)}

                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`
                      absolute left-full w-full h-0.5 -translate-y-1/2 top-1/2
                      ${status === 'completed' 
                        ? 'bg-primary-cool-purple' 
                        : 'bg-gray-200'
                      }
                    `}
                  />
                )}
              </motion.button>

              {/* Step label */}
              <motion.span 
                className={`
                  mt-2 text-xs font-medium text-center max-w-[100px] truncate
                  ${isCurrent ? 'text-primary-cool-purple' : 'text-gray-600'}
                `}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.title}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormProgress; 