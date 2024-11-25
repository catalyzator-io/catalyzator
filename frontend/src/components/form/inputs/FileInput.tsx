import React from 'react';
import { FileInputProps } from './types';
import { FileUploader } from '../../ui/file-uploader';
import { FileReference } from '../../../types/common';

const FileInput: React.FC<FileInputProps> = ({
  value,
  onChange,
  allowedTypes,
  maxSize,
  placeholder,
  error,
  required
}) => {
  const isFileReference = (file: any): file is FileReference => {
    return 'url' in file && 'uploaded_at' in file;
  };

  const handleFilesAdded = (files: File[]) => {
    if (files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {!isFileReference(value) && (
        <FileUploader
          className="w-full"
          value={value ? [value] : []}
          onFilesAdded={handleFilesAdded}
          maxFiles={1}
          accept={allowedTypes?.reduce((acc, type) => {
            acc[type] = [];
            return acc;
          }, {} as Record<string, string[]>)}
          variant="compact"
          showPreview
          previewType="list"
          maxSize={maxSize}
        />
      )}
      {required && !value && (
        <p className="text-xs text-red-500">* File is required</p>
      )}
      {value && isFileReference(value) && (
        <div className="mt-2">
          <a 
            href={value.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-cool-purple hover:underline"
            aria-label={placeholder || 'View uploaded file'}
          >
            {placeholder || 'View uploaded file'}
          </a>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileInput; 