import React from 'react';
import { 
  FormQuestion as FormQuestionType, 
  FormValidationTypeMap,
  RecordValidation,
} from '../../types/form';
import { ChoiceValidation, DateValidation, FileValidation } from '../../types/question';
import { BaseQuestionValue } from '../../types/question';
import TextInput from './inputs/TextInput';
import RadioInput from './inputs/RadioInput';
import CheckboxInput from './inputs/CheckboxInput';
import FileInput from './inputs/FileInput';
import RecordInput from './inputs/RecordInput';
import DateInput from './inputs/DateInput';

interface FormQuestionProps {
  question: FormQuestionType;
  value?: BaseQuestionValue;
  onChange: (value: BaseQuestionValue) => void;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  value,
  onChange
}) => {
  const renderInput = () => {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
        return (
          <TextInput
            type={question.type}
            value={value as string}
            onChange={onChange}
            placeholder={question.placeholder}
            validation={question.validation as FormValidationTypeMap[typeof question.type]}
          />
        );
      case 'radio':
        return (
          <RadioInput
            options={(question.validation as ChoiceValidation).options}
            value={value as string}
            onChange={onChange}
          />
        );
      case 'checkbox':
        return (
          <CheckboxInput
            options={(question.validation as ChoiceValidation).options}
            value={value as string[]}
            onChange={onChange}
            validation={question.validation as ChoiceValidation}
          />
        );
      case 'upload':
        return (
          <FileInput
            value={value as unknown as File}
            onChange={(file: File) => {
              const fileValue = {
                name: file.name,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
              };
              onChange(fileValue);
            }}
            validation={question.validation as FileValidation}
            placeholder={question.placeholder}
          />
        );
      case 'record':
        return (
          <RecordInput
            value={value as string}
            onChange={onChange}
            validation={question.validation as RecordValidation}
          />
        );
      case 'date':
        return (
          <DateInput
            value={value as string}
            onChange={onChange}
            validation={question.validation as DateValidation}
          />
        );
      default:
        return <div>Unsupported question type</div>;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block">
        <span className="text-gray-700 font-medium">
          {question.title}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </span>
        {question.description && (
          <p className="text-sm text-gray-500 mt-1">{question.description}</p>
        )}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormQuestion; 