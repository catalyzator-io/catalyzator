import React from 'react';
import { Input } from '../../ui/input';
import { cn } from '../../../utils/cn';
import { TextInputProps } from './types';

const TextInput: React.FC<TextInputProps> = ({
  type,
  value = '',
  onChange,
  placeholder,
  error,
  required
}) => {
  return (
    <div className="space-y-1">
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-lg",
          "border-2 border-primary-crazy-orange/20",
          "focus:border-primary-crazy-orange focus:ring-primary-crazy-orange/20",
          "placeholder:text-gray-400",
          error && "border-red-300"
        )}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextInput; 