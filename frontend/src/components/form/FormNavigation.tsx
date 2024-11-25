import React from 'react';
import { ArrowLeft, SkipForward } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

interface FormNavigationProps {
  showBack: boolean;
  showSkip: boolean;
  onBack: () => void;
  onSkip: () => void;
  className?: string;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  showBack,
  showSkip,
  onBack,
  onSkip,
  className
}) => {
  return (
    <div className={cn("flex justify-between items-center gap-4", className)}>
      {showBack && (
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      )}
      
      {showSkip && (
        <Button
          variant="outline"
          onClick={onSkip}
          className="flex items-center gap-2 ml-auto"
        >
          Skip
          <SkipForward className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default FormNavigation; 