import React from 'react';
import { motion } from 'framer-motion';
import { FormProgress as FormProgressType, FormStep, FormStepStatus } from '../../types/form';
import { Check, Lock, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface FormProgressProps {
  progress: FormProgressType;
  steps: FormStep[];
  onStepClick: (stepId: string) => void;
  canNavigateToStep: (stepId: string) => boolean;
}

const getStepIcon = (status: FormStepStatus, isLocked: boolean) => {
  if (isLocked) return <Lock className="w-4 h-4" />;
  switch (status) {
    case 'completed':
      return <Check className="w-4 h-4" />;
    case 'in_progress':
      return <Clock className="w-4 h-4" />;
    case 'skipped':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return null;
  }
};

const getStepColor = (status: FormStepStatus, isLocked: boolean) => {
  if (isLocked) return 'text-gray-400 bg-gray-100';
  switch (status) {
    case 'completed':
      return 'text-green-500 bg-green-50';
    case 'in_progress':
      return 'text-blue-500 bg-blue-50';
    case 'skipped':
      return 'text-yellow-500 bg-yellow-50';
    default:
      return 'text-gray-500 bg-gray-50';
  }
};

const FormProgress: React.FC<FormProgressProps> = ({
  progress,
  steps,
  onStepClick,
  canNavigateToStep
}) => {
  return (
    <div className="w-full">
      {/* Progress Info */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            Step {progress.current_step_index + 1} of {progress.total_steps}
          </div>
          <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-cool-purple"
              initial={{ width: 0 }}
              animate={{ width: `${progress.progress_percentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-sm text-gray-500">
            {progress.progress_percentage}%
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {steps.map((step, index) => {
              const status = progress.completed_steps.includes(step.id)
                ? 'completed'
                : progress.skipped_steps.includes(step.id)
                ? 'skipped'
                : progress.current_step === step.id
                ? 'in_progress'
                : 'not_started';

              const isLocked = !canNavigateToStep(step.id);

              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      disabled={isLocked}
                      onClick={() => !isLocked && onStepClick(step.id)}
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center border-2',
                        'transition-all duration-200',
                        getStepColor(status, isLocked),
                        isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                      )}
                      whileHover={!isLocked ? { scale: 1.1 } : undefined}
                      whileTap={!isLocked ? { scale: 0.95 } : undefined}
                    >
                      {getStepIcon(status, isLocked)}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {step.title}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProgress; 