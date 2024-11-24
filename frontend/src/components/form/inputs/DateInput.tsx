import React from 'react';
import { FormValidationTypeMap } from '../../../types/form';

interface DateInputProps {
  value?: string;
  onChange: (value: string) => void;
  validation: FormValidationTypeMap['date'];
}

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  validation
}) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      min={validation.min_date?.toISOString()}
      max={validation.max_date?.toISOString()}
      className="w-full p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-cool-purple/20 focus:border-primary-cool-purple outline-none transition-all"
    />
  );
};

export default DateInput; 