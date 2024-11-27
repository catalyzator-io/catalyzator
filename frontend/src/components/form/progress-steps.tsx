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
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" />
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const status = stepStatus[step.id];
          const isActive = index === currentStep;
          const isClickable = status?.visited && index < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => isClickable && onStepClick(index)}
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  status?.completed && 'border-primary bg-primary text-primary-foreground',
                  !isActive && !status?.completed && 'border-muted-foreground bg-background',
                  isClickable && 'cursor-pointer hover:border-primary',
                  !isClickable && 'cursor-default'
                )}
                disabled={!isClickable}
              >
                {status?.completed ? (
                  <Check className="h-4 w-4" />
                ) : status?.visited ? (
                  <span className="text-sm font-medium">{index + 1}</span>
                ) : (
                  <LockIcon className="h-4 w-4" />
                )}
              </button>
              <span className={cn(
                'mt-2 text-xs font-medium',
                isActive && 'text-primary',
                !isActive && 'text-muted-foreground'
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