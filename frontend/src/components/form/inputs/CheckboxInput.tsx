import React from 'react';
import { ValidationOption, ChoiceValidation } from '../../../types/question';

interface CheckboxInputProps {
  options: (string | ValidationOption)[];
  value?: string[];
  onChange: (value: string[]) => void;
  validation: ChoiceValidation;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  options,
  value = [],
  onChange,
  validation
}) => {
  const normalizedOptions = options.map(opt => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    if (validation.max_selections && newValue.length > validation.max_selections) {
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      {normalizedOptions.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={value.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="w-4 h-4 text-primary-cool-purple rounded"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxInput; 