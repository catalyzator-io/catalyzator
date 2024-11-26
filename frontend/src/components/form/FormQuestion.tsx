import React from 'react';
import { motion } from 'framer-motion';
import { FormQuestion as FormQuestionType, FormValidationTypeMap } from '../../types/form';
import { BaseQuestionResponse } from '../../types/question';
import { FileValue } from '../../types/common';
import TextInput from './inputs/TextInput';
import CheckboxInput from './inputs/CheckboxInput';
import RadioInput from './inputs/RadioInput';
import FileInput from './inputs/FileInput';
import DateInput from './inputs/DateInput';
import RecordingInput from './inputs/RecordingInput';
import { cn } from '../../utils/cn';

interface FormQuestionProps {
  question: FormQuestionType;
  value?: BaseQuestionResponse;
  onChange: (value: BaseQuestionResponse) => void;
  error?: string;
  showError?: boolean;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  value,
  onChange,
  error,
  showError = true
}) => {
  const renderInput = () => {
    const commonProps = {
      error: showError ? error : undefined,
      required: question.required
    };

    const createResponse = (value: any): BaseQuestionResponse => ({
      question_id: question.id,
      value,
      is_complete: true,
      last_updated: new Date()
    });

    switch (question.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url': {
        return (
          <TextInput
            {...commonProps}
            type={question.type}
            value={(value?.value as string) || ''}
            onChange={(val: string) => onChange(createResponse(val))}
            placeholder={question.placeholder}
          />
        );
      }

      case 'checkbox': {
        const validation = question.validation as FormValidationTypeMap['checkbox'];
        const ensureStringArray = (val?: BaseQuestionResponse): string[] => {
          if (!val?.value) return [];
          if (Array.isArray(val.value)) {
            return val.value.map(v => String(v));
          }
          return [String(val.value)];
        };

        return (
          <CheckboxInput
            {...commonProps}
            options={validation.options}
            value={ensureStringArray(value)}
            onChange={(val: string[]) => onChange(createResponse(val))}
          />
        );
      }

      case 'radio': {
        const validation = question.validation as FormValidationTypeMap['radio'];
        return (
          <RadioInput
            {...commonProps}
            options={validation.options}
            value={(value?.value as string) || ''}
            onChange={(val: string) => onChange(createResponse(val))}
          />
        );
      }

      case 'upload': {
        const validation = question.validation as FormValidationTypeMap['upload'];
        return (
          <FileInput
            {...commonProps}
            value={value?.value as FileValue}
            onChange={(val: FileValue) => onChange(createResponse(val))}
            allowedTypes={validation.allowed_types}
            maxSize={validation.max_size}
            placeholder={question.placeholder}
          />
        );
      }

      case 'date': {
        const validation = question.validation as FormValidationTypeMap['date'];
        return (
          <DateInput
            {...commonProps}
            value={(value?.value as string) || ''}
            onChange={(val: string) => onChange(createResponse(val))}
            minDate={validation.min_date?.toISOString().split('T')[0]}
            maxDate={validation.max_date?.toISOString().split('T')[0]}
          />
        );
      }

      case 'recording': {
        const validation = question.validation as FormValidationTypeMap['recording'];
        return (
          <RecordingInput
            {...commonProps}
            value={value?.value as FileValue}
            onChange={(val: FileValue) => onChange(createResponse(val))}
            maxDuration={validation.max_duration}
            minDuration={validation.min_duration}
            allowedFormats={validation.allowed_formats}
            placeholder={question.placeholder}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      <div className={cn(
        "transition-colors duration-200",
        error && showError ? "text-red-600" : "text-gray-900"
      )}>
        <label className="block text-base font-medium">
          {question.title}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      </div>

      {question.description && (
        <p className={cn(
          "text-sm",
          error && showError ? "text-red-500/80" : "text-primary-crazy-orange"
        )}>
          {question.description}
        </p>
      )}

      <div className={cn(
        "mt-1 relative",
        error && showError && "animate-shake"
      )}>
        {renderInput()}
        {error && showError && (
          <motion.p 
            className="mt-1 text-sm text-red-500"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default FormQuestion; 