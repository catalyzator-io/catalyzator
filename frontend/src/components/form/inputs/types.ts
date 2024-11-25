import { ValidationOption } from '../../../types/question';
import { FileValue } from '../../../types/common';

interface BaseInputProps {
  error?: string;
  required?: boolean;
}

export interface TextInputProps extends BaseInputProps {
  type: 'text' | 'email' | 'number' | 'tel' | 'url';
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Base interface for choice-based inputs
interface BaseChoiceProps extends BaseInputProps {
  options: ValidationOption[];
}

export interface RadioInputProps extends BaseChoiceProps {
  value?: string;
  onChange: (value: string) => void;
}

export interface CheckboxInputProps extends BaseChoiceProps {
  value?: string[];
  onChange: (value: string[]) => void;
}

export interface FileInputProps extends BaseInputProps {
  value?: FileValue;
  onChange: (value: FileValue) => void;
  placeholder?: string;
  allowedTypes?: string[];
  maxSize?: number;
}

export interface DateInputProps extends BaseInputProps {
  value?: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
}

export interface RecordingInputProps extends BaseInputProps {
  value?: FileValue;
  onChange: (value: FileValue) => void;
  placeholder?: string;
  maxDuration?: number;
  minDuration?: number;
  allowedFormats?: string[];
} 