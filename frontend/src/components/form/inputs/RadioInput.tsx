import React from 'react';
import { ValidationOption } from '../../../types/question';

interface RadioInputProps {
  options: (string | ValidationOption)[];
  value?: string;
  onChange: (value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({
  options,
  value,
  onChange
}) => {
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  return (
    <div className="space-y-2">
      {normalizedOptions.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="w-4 h-4 text-primary-cool-purple"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioInput; 