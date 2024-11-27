import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import { QuestionConfig } from '../../types/form';
import { Progress } from '../ui/progress';

interface FileUploadFieldProps {
  onChange: (files: File[]) => void;
  value?: File[];
  validation?: QuestionConfig['validation']['file'];
  multiple?: boolean;
  className?: string;
}

export function FileUploadField({
  onChange,
  value = [],
  validation,
  multiple = false,
  className,
}: FileUploadFieldProps) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Simulate upload progress
    acceptedFiles.forEach(file => {
      const key = `${file.name}-${file.size}`;
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [key]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);
    });

    onChange(multiple ? [...value, ...acceptedFiles] : acceptedFiles);
  }, [multiple, onChange, value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: validation?.allowedTypes
      ? Object.fromEntries(
          validation.allowedTypes.map((type: string) => [type, []])
        )
      : undefined,
    maxSize: validation?.maxSize,
  });

  const removeFile = (fileToRemove: File) => {
    onChange(value.filter(file => file !== fileToRemove));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer',
          isDragActive && 'border-crazy-orange bg-crazy-orange/10',
          'hover:border-crazy-orange hover:bg-crazy-orange/5 transition-colors'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-purple-900" />
        <p className="mt-2 text-sm text-purple-900">
          Drag & drop files here, or click to select
        </p>
        {validation?.maxSize && (
          <p className="text-xs text-purple-900">
            Max size: {(validation.maxSize / (1024 * 1024)).toFixed(1)}MB
          </p>
        )}
        {validation?.allowedTypes && (
          <p className="text-xs text-purple-900">
            Allowed types: {validation.allowedTypes.join(', ')}
          </p>
        )}
      </div>

      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((file, index) => {
            const key = `${file.name}-${file.size}`;
            const progress = uploadProgress[key] || 100;

            return (
              <li
                key={key}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-purple-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-purple-900">
                    {(file.size / 1024).toFixed(1)}KB
                  </p>
                  {progress < 100 && (
                    <Progress value={progress} className="mt-2 h-1" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="ml-4 text-purple-900 hover:text-crazy-orange"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}