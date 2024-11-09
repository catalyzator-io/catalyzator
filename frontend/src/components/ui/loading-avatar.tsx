import React from 'react';
import { cn } from '../../utils/cn';

interface LoadingAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingAvatar: React.FC<LoadingAvatarProps> = ({ 
  size = 'md', 
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'rounded-full bg-gray-200 animate-pulse',
        size === 'sm' && 'w-6 h-6',
        size === 'md' && 'w-8 h-8',
        size === 'lg' && 'w-12 h-12',
        className
      )}
      {...props}
    />
  );
}; 