import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import { cn } from '../../../utils/cn';
import { CheckboxInputProps } from './types';

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  options,
  value = [],
  onChange,
  error,
  required
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    const newValue = checked
      ? [...value, optionValue]
      : value.filter(v => v !== optionValue);
    onChange(newValue);
  };

  return (
    <div className="space-y-2">
      <div className="space-y-3">
        {options.map(option => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-3 p-4 rounded-lg",
              "border-2 border-primary-crazy-orange/20",
              "hover:border-primary-crazy-orange/40 transition-colors cursor-pointer",
              "bg-white/50"
            )}
          >
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={(checked) => handleChange(option.value, checked as boolean)}
              className="data-[state=checked]:bg-primary-crazy-orange data-[state=checked]:border-primary-crazy-orange"
              required={required && value.length === 0}
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

export default CheckboxInput; 