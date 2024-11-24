import React from 'react';
import { FormStep as FormStepType } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';
import FormQuestion from './FormQuestion';

interface FormStepProps {
  step: FormStepType;
  responses?: { [key: string]: BaseQuestionValue };
  onSubmit: (responses: { [key: string]: BaseQuestionValue }) => void;
  onBack?: () => void;
  isValid?: boolean;
  errors?: { [key: string]: string };
}

const FormStep: React.FC<FormStepProps> = ({
  step,
  responses = {},
  onSubmit,
  onBack,
  isValid = true,
  errors = {}
}) => {
  const [stepResponses, setStepResponses] = React.useState<{ [key: string]: BaseQuestionValue }>(responses);

  // Update responses when they change externally
  React.useEffect(() => {
    setStepResponses(responses);
  }, [responses]);

  const handleQuestionResponse = (questionId: string, value: BaseQuestionValue) => {
    setStepResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(stepResponses);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
        {step.description && (
          <p className="text-gray-600">{step.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {step.questions.map(question => (
          <div key={question.id} className="space-y-1">
            <FormQuestion
              question={question}
              value={stepResponses[question.id]}
              onChange={(value: BaseQuestionValue) => handleQuestionResponse(question.id, value)}
            />
            {errors[question.id] && (
              <p className="text-sm text-red-500">{errors[question.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg ${
            isValid 
              ? 'bg-primary-cool-purple text-white hover:bg-primary-cool-purple/90'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
};

export default FormStep; 