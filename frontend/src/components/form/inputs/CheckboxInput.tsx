import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { cn } from '../../../utils/cn';

interface CheckboxInputProps {
  options: Array<{ label: string; value: string } | string>;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  required?: boolean;
}

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
    <div className="space-y-4">
      {options.map((option, index) => {
        const optionValue = typeof option === 'string' ? option : option.value;
        const optionLabel = typeof option === 'string' ? option : option.label;
        const isChecked = value.includes(optionValue);

        return (
          <div key={optionValue} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${index}`}
              checked={isChecked}
              onCheckedChange={(checked) => handleChange(optionValue, checked as boolean)}
              className={cn(
                error && 'border-red-500',
                'data-[state=checked]:bg-primary-cool-purple data-[state=checked]:border-primary-cool-purple'
              )}
            />
            <Label
              htmlFor={`option-${index}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {optionLabel}
            </Label>
          </div>
        );
      })}
      {required && value.length === 0 && (
        <p className="text-xs text-red-500">* At least one option must be selected</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CheckboxInput; 