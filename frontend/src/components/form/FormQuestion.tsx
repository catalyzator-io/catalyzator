import React from 'react';
import { FormQuestion as FormQuestionType, FormValidationTypeMap } from '../../types/form';
import { BaseQuestionValue } from '../../types/question';
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
  value?: BaseQuestionValue;
  onChange: (value: BaseQuestionValue) => void;
  error?: string;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  value,
  onChange,
  error
}) => {
  const renderInput = () => {
    const commonProps = {
      error,
      required: question.required
    };

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
            value={(value as string) || ''}
            onChange={(val: string) => onChange(val)}
            placeholder={question.placeholder}
          />
        );
      }

      case 'checkbox': {
        const validation = question.validation as FormValidationTypeMap['checkbox'];
        return (
          <CheckboxInput
            {...commonProps}
            options={validation.options}
            value={(value as string[]) || []}
            onChange={(val: string[]) => onChange(val)}
          />
        );
      }

      case 'radio': {
        const validation = question.validation as FormValidationTypeMap['radio'];
        return (
          <RadioInput
            {...commonProps}
            options={validation.options}
            value={(value as string) || ''}
            onChange={(val: string) => onChange(val)}
          />
        );
      }

      case 'upload': {
        const validation = question.validation as FormValidationTypeMap['upload'];
        return (
          <FileInput
            {...commonProps}
            value={value as FileValue}
            onChange={(val: FileValue) => onChange(val)}
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
            value={(value as string) || ''}
            onChange={(val: string) => onChange(val)}
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
            value={value as FileValue}
            onChange={(val: FileValue) => onChange(val)}
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
      <div className="flex items-start justify-between">
        <label className="block text-base font-medium text-gray-900">
          {question.title}
          {question.required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      </div>

      {question.description && (
        <p className="text-sm text-primary-crazy-orange">
          {question.description}
        </p>
      )}

      <div className={cn(
        "mt-1",
        error && "animate-shake"
      )}>
        {renderInput()}
        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormQuestion; 