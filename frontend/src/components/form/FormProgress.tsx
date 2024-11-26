import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FormProgress as FormProgressType, FormStep, FormStepStatus } from '../../types/form';
import { Check, Lock, AlertCircle, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '../ui/tooltip';
import { formDAL } from '../../utils/dal/form';

// Import FormAnalytics type
interface FormAnalytics {
  timeSpentPerStep: { [stepId: string]: number };
  stepAttempts: { [stepId: string]: number };
  validationErrors: { [stepId: string]: number };
  lastAccessed: Date;
}

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
  const [analytics, setAnalytics] = useState<FormAnalytics | null>(null);

  useEffect(() => {
    const loadAnalytics = async () => {
      const data = await formDAL.getFormAnalytics(steps[0].id);
      setAnalytics(data);
    };
    loadAnalytics();
  }, [steps]);

  // Helper function to safely reduce numbers
  const sumNumbers = (numbers: number[]): number => {
    return numbers.reduce((a, b) => a + b, 0);
  };

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary-cool-purple bg-primary-cool-purple/10">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-primary-cool-purple">
              {progress.progress_percentage}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-cool-purple/10">
          <motion.div
            style={{ width: `${progress.progress_percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-cool-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progress_percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mt-4 p-4 bg-white/5 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Attempts</div>
              <div className="font-medium">
                {sumNumbers(Object.values(analytics.stepAttempts))}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Validation Errors</div>
              <div className="font-medium">
                {sumNumbers(Object.values(analytics.validationErrors))}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Last Active</div>
              <div className="font-medium">
                {new Date(analytics.lastAccessed).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Indicators */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Step {progress.current_step_index + 1} of {progress.total_steps}
        </div>
        <div className="flex -space-x-2">
          <TooltipProvider>
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
                <Tooltip key={step.id}>
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
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default FormProgress; 