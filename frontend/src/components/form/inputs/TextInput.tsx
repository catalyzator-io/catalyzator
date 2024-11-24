import React from 'react';
import { FormValidationTypeMap } from '../../../types/form';

type TextInputType = 'text' | 'email' | 'tel' | 'url';

interface TextInputProps {
  type: TextInputType;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  validation: FormValidationTypeMap[TextInputType];
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  value = '',
  onChange,
  placeholder,
  validation
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-cool-purple/20 focus:border-primary-cool-purple outline-none transition-all"
      pattern={validation.pattern}
    />
  );
};

export default TextInput; 