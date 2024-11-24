import React from 'react';
import { FormValidationTypeMap } from '../../../types/form';

interface FileInputProps {
  value?: File;
  onChange: (value: File) => void;
  validation: FormValidationTypeMap['upload'];
  placeholder?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  value,
  onChange,
  validation,
  placeholder
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <input
      type="file"
      onChange={handleChange}
      placeholder={placeholder}
      accept={validation.allowed_types?.join(',')}
      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-cool-purple/20 focus:border-primary-cool-purple outline-none transition-all"
    />
  );
};

export default FileInput; 