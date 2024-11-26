import { FormFieldType, FormValidationTypeMap, FormQuestion } from '../../types/form';
import { BaseQuestionResponse, BaseQuestionValue } from '../../types/question';
import { FileValue } from '../../types/common';
import { BaseValidation } from '../../types/question';

interface ValidationResult {
  isValid: boolean;
  error?: string;
  errors?: { [key: string]: string };
}

export const useFormValidation = () => {
  const validateField = <T extends FormFieldType>(
    type: T,
    response: BaseQuestionResponse | undefined,
    validation: FormValidationTypeMap[T] & BaseValidation
  ): ValidationResult => {
    // Check required field
    if (validation.required && (!response || !response.value)) {
      return {
        isValid: false,
        error: 'This field is required'
      };
    }

    if (!response?.value) return { isValid: true };

    const value = response.value;

    // Type-specific validation
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url': {
        const textValidation = validation as FormValidationTypeMap['text'];
        const strValue = value as string;
        
        if (textValidation.min_length && strValue.length < textValidation.min_length) {
          return {
            isValid: false,
            error: `Minimum length is ${textValidation.min_length} characters`
          };
        }
        
        if (textValidation.max_length && strValue.length > textValidation.max_length) {
          return {
            isValid: false,
            error: `Maximum length is ${textValidation.max_length} characters`
          };
        }
        
        if (textValidation.pattern) {
          if (type === 'email' && !strValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return {
              isValid: false,
              error: 'Invalid email format'
            };
          }
          if (!new RegExp(textValidation.pattern).test(strValue)) {
            return {
              isValid: false,
              error: 'Invalid format'
            };
          }
        }
        break;
      }

      case 'number': {
        const numValidation = validation as FormValidationTypeMap['number'];
        const numValue = Number(value);

        if (isNaN(numValue)) {
          return {
            isValid: false,
            error: 'Must be a valid number'
          };
        }

        if (numValidation.min !== undefined && numValue < numValidation.min) {
          return {
            isValid: false,
            error: `Must be at least ${numValidation.min}`
          };
        }

        if (numValidation.max !== undefined && numValue > numValidation.max) {
          return {
            isValid: false,
            error: `Must be no more than ${numValidation.max}`
          };
        }

        if (numValidation.integer_only && !Number.isInteger(numValue)) {
          return {
            isValid: false,
            error: 'Must be a whole number'
          };
        }
        break;
      }

      case 'checkbox': {
        const choiceValidation = validation as FormValidationTypeMap['checkbox'];
        const selectedValues = Array.isArray(value) 
          ? value.map(v => String(v))
          : value ? [String(value)] : [];
        
        if (validation.required && selectedValues.length === 0) {
          return {
            isValid: false,
            error: 'At least one option must be selected'
          };
        }
        
        if (choiceValidation.min_selections && selectedValues.length < choiceValidation.min_selections) {
          return {
            isValid: false,
            error: `Please select at least ${choiceValidation.min_selections} options`
          };
        }
        
        if (choiceValidation.max_selections && selectedValues.length > choiceValidation.max_selections) {
          return {
            isValid: false,
            error: `Please select no more than ${choiceValidation.max_selections} options`
          };
        }

        const validOptions = choiceValidation.options.map(opt => 
          typeof opt === 'string' ? opt : opt.value
        );
        
        if (!selectedValues.every(val => validOptions.includes(val))) {
          return {
            isValid: false,
            error: 'Invalid selection'
          };
        }

        return { isValid: true };
      }

      case 'radio': {
        const choiceValidation = validation as FormValidationTypeMap['checkbox'];
        const selectedValues = Array.isArray(value) 
          ? value.filter((v): v is string => typeof v === 'string')
          : [value as string];
        
        if (choiceValidation.min_selections && selectedValues.length < choiceValidation.min_selections) {
          return {
            isValid: false,
            error: `Please select at least ${choiceValidation.min_selections} options`
          };
        }
        
        if (choiceValidation.max_selections && selectedValues.length > choiceValidation.max_selections) {
          return {
            isValid: false,
            error: `Please select no more than ${choiceValidation.max_selections} options`
          };
        }

        const validOptions = choiceValidation.options.map(opt => 
          typeof opt === 'string' ? opt : opt.value
        );
        
        if (!selectedValues.every(val => validOptions.includes(val))) {
          return {
            isValid: false,
            error: 'Invalid selection'
          };
        }
        break;
      }

      case 'upload':
      case 'recording': {
        const fileValue = value as FileValue;
        const fileValidation = validation as (FormValidationTypeMap[T] & { max_size?: number });
        
        if (!fileValue) {
          if (validation.required) {
            return {
              isValid: false,
              error: type === 'recording' ? 'Recording is required' : 'File is required'
            };
          }
          return { isValid: true };
        }

        const fileSize = 'size' in fileValue ? fileValue.size : 0;
        const fileType = 'type' in fileValue ? fileValue.type : '';

        if (type === 'recording') {
          const recordingValidation = validation as FormValidationTypeMap['recording'];
          if (recordingValidation.allowed_formats?.length && 
              !recordingValidation.allowed_formats.includes(fileType)) {
            return {
              isValid: false,
              error: `Recording format must be one of: ${recordingValidation.allowed_formats.join(', ')}`
            };
          }
        } else {
          const uploadValidation = validation as FormValidationTypeMap['upload'];
          if (uploadValidation.allowed_types?.length && 
              !uploadValidation.allowed_types.includes(fileType)) {
            return {
              isValid: false,
              error: `File type must be one of: ${uploadValidation.allowed_types.join(', ')}`
            };
          }
        }

        if (fileValidation.max_size && fileSize > fileValidation.max_size) {
          return {
            isValid: false,
            error: `File must be smaller than ${Math.round(fileValidation.max_size / 1024 / 1024)}MB`
          };
        }

        break;
      }

      case 'date': {
        const dateValidation = validation as FormValidationTypeMap['date'];
        const dateValue = new Date(value as string);
        
        if (isNaN(dateValue.getTime())) {
          return {
            isValid: false,
            error: 'Invalid date'
          };
        }

        if (dateValidation.min_date && dateValue < new Date(dateValidation.min_date)) {
          return {
            isValid: false,
            error: 'Date is too early'
          };
        }
        
        if (dateValidation.max_date && dateValue > new Date(dateValidation.max_date)) {
          return {
            isValid: false,
            error: 'Date is too late'
          };
        }

        if (dateValidation.future_only && dateValue < new Date()) {
          return {
            isValid: false,
            error: 'Date must be in the future'
          };
        }

        if (dateValidation.past_only && dateValue > new Date()) {
          return {
            isValid: false,
            error: 'Date must be in the past'
          };
        }
        break;
      }
    }

    return { isValid: true };
  };

  const validateStep = (
    questions: FormQuestion[],
    responses: { [key: string]: BaseQuestionResponse }
  ): { isValid: boolean; errors: { [key: string]: string } } => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    questions.forEach(question => {
      const result = validateField(question.type, responses[question.id], question.validation);
      if (!result.isValid) {
        errors[question.id] = result.error || 'Invalid input';
        isValid = false;
      }
    });

    return { isValid, errors };
  };

  const validateCrossField = (
    questions: FormQuestion[],
    responses: { [key: string]: BaseQuestionValue }
  ): ValidationResult => {
    // Find date questions
    const dateQuestions = questions.filter(q => q.type === 'date');
    const startDateQuestion = dateQuestions.find(q => q.id === 'start_date');
    const endDateQuestion = dateQuestions.find(q => q.id === 'end_date');

    if (startDateQuestion && endDateQuestion) {
      const startDate = responses[startDateQuestion.id] as string;
      const endDate = responses[endDateQuestion.id] as string;
      
      if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
        return {
          isValid: false,
          error: 'End date must be after start date',
          errors: {
            [endDateQuestion.id]: 'End date must be after start date'
          }
        };
      }
    }

    return { isValid: true };
  };

  return {
    validateField,
    validateStep,
    validateCrossField
  };
}; 