import React from 'react';
import { DateInputProps } from './types';
import { cn } from '../../../utils/cn';

const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  error,
  required
}) => {
  return (
    <div className="space-y-1">
      <input
        type="date"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        min={minDate}
        max={maxDate}
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

export default DateInput; 