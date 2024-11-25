import React from 'react';
import { RadioInputProps } from './types';
import { cn } from '../../../utils/cn';

const RadioInput: React.FC<RadioInputProps> = ({
  options,
  value,
  onChange,
  error,
  required
}) => {
  return (
    <div className="space-y-2">
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg",
              "border-2 border-primary-crazy-orange/20",
              "hover:border-primary-crazy-orange/40 transition-colors cursor-pointer",
              "bg-white/50"
            )}
          >
            <input
              type="radio"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              required={required}
              className="w-4 h-4 text-primary-crazy-orange"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default RadioInput; 