import { useMemo } from 'react';
import { FormQuestion, FormValidationTypeMap } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const useFormValidation = (
  questions: FormQuestion[],
  responses: { [key: string]: BaseQuestionValue }
) => {
  const validate = useMemo(() => {
    const result: ValidationResult = {
      isValid: true,
      errors: {}
    };

    questions.forEach(question => {
      const value = responses[question.id];

      // Required field validation
      if (question.required && !value) {
        result.isValid = false;
        result.errors[question.id] = 'This field is required';
        return;
      }

      if (!value) return;

      // Type-specific validation
      switch (question.type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'url':
          const validation = question.validation as FormValidationTypeMap[typeof question.type];
          if (validation.pattern && !new RegExp(validation.pattern).test(value as string)) {
            result.isValid = false;
            result.errors[question.id] = 'Invalid format';
          }
          break;

        case 'checkbox':
          const choiceValidation = question.validation as FormValidationTypeMap['checkbox'];
          const selectedValues = value as string[];
          if (choiceValidation.min_selections && selectedValues.length < choiceValidation.min_selections) {
            result.isValid = false;
            result.errors[question.id] = `Select at least ${choiceValidation.min_selections} options`;
          }
          if (choiceValidation.max_selections && selectedValues.length > choiceValidation.max_selections) {
            result.isValid = false;
            result.errors[question.id] = `Select no more than ${choiceValidation.max_selections} options`;
          }
          break;

        case 'upload':
          const fileValidation = question.validation as FormValidationTypeMap['upload'];
          const fileValue = value as { size: number; type: string };
          if (fileValidation.max_size && fileValue.size > fileValidation.max_size) {
            result.isValid = false;
            result.errors[question.id] = 'File is too large';
          }
          if (fileValidation.allowed_types && !fileValidation.allowed_types.includes(fileValue.type)) {
            result.isValid = false;
            result.errors[question.id] = 'File type not supported';
          }
          break;
      }
    });

    return result;
  }, [questions, responses]);

  return validate;
}; 