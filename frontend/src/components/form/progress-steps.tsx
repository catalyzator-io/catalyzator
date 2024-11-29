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
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-white/10">
            Progress: {((currentStep / (steps.length - 1)) * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => {
            const status = stepStatus[step.id];
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            const isClickable = status?.visited;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center w-full">
                  <button
                    type="button"
                    onClick={() => isClickable && onStepClick(index)}
                    className={cn(
                      'relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 bg-white shrink-0',
                      'transition-all duration-200',
                      isActive && 'border-crazy-orange bg-crazy-orange text-white scale-110 ring-2 ring-white/30 ring-offset-2 ring-offset-transparent',
                      status?.completed && 'border-crazy-orange bg-crazy-orange text-white',
                      !isActive && !status?.completed && 'border-purple-200',
                      isClickable && 'cursor-pointer hover:border-crazy-orange hover:scale-110',
                      !isClickable && 'cursor-not-allowed'
                    )}
                    disabled={!isClickable}
                  >
                    {status?.completed ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : status?.visited ? (
                      <span className="text-xs font-medium">{index + 1}</span>
                    ) : (
                      <LockIcon className="h-3.5 w-3.5" />
                    )}
                  </button>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 w-full mx-1",
                        isPast ? "bg-crazy-orange" : "bg-purple-200"
                      )}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center mt-2">
        <span className="text-sm font-medium text-white">
          {steps[currentStep].title}
        </span>
      </div>
    </div>
  );
}