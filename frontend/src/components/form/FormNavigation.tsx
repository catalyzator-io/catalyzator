import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormNavigationProps {
  showBack: boolean;
  showSkip: boolean;
  onBack: () => void;
  onSkip: () => void;
}

const FormNavigation: React.FC<FormNavigationProps> = ({
  showBack,
  showSkip,
  onBack,
  onSkip
}) => {
  return (
    <div className="flex justify-between gap-4">
      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
      
      {showSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors"
        >
          Skip
        </button>
      )}
    </div>
  );
};

export default FormNavigation; 