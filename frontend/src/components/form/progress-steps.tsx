import { Check, LockIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { StepConfig, StepStatus } from '../../types/form';

interface ProgressStepsProps {
  steps: StepConfig[];
  currentStep: number;
  stepStatus: Record<string, StepStatus>;
  onStepClick: (index: number) => void;
}


export function ProgressSteps({
  steps,
  currentStep,
  stepStatus,
  onStepClick,
}: ProgressStepsProps) {
  return (
    <div className="relative mb-8">
      <div className="absolute top-1/2 left-0 right-0 flex items-center">
        <div className="w-full h-0.5 bg-purple-200">
          <div 
            className="h-full bg-crazy-orange transition-all duration-300" 
            style={{ 
              width: `${(currentStep / (steps.length - 1)) * 100}%` 
            }} 
          />
        </div>
      </div>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const status = stepStatus[step.id];
          const isActive = index === currentStep;
          const isClickable = status?.visited;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                className={cn(
                  'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white',
                  isActive && 'border-crazy-orange bg-crazy-orange text-white',
                  status?.completed && 'border-crazy-orange bg-crazy-orange text-white',
                  !isActive && !status?.completed && 'border-purple-200',
                  isClickable && 'cursor-pointer hover:border-crazy-orange',
                  !isClickable && 'cursor-default'
                )}
                disabled={!isClickable}
              >
                {status?.completed ? (
                  <Check className="h-5 w-5" />
                ) : status?.visited ? (
                  <span className="text-sm font-medium">{index + 1}</span>
                ) : (
                  <LockIcon className="h-5 w-5" />
                )}
              </button>
              <span className={cn(
                'mt-2 text-sm font-medium',
                isActive && 'text-white',
                !isActive && 'text-white/80'
              )}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}