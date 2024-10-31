import * as React from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { UploadIcon, XIcon } from 'lucide-react';

export interface FileUploaderProps extends Omit<DropzoneOptions, 'onDrop'> {
  className?: string;
  dropzoneClassName?: string;
  onFilesAdded?: (files: File[]) => void | Promise<void>;
  onFileRemoved?: (file: File) => void | Promise<void>;
  value?: File[];
  disabled?: boolean;
  maxFiles?: number;
  variant?: 'default' | 'compact';
  showPreview?: boolean;
  previewType?: 'image' | 'list';
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  ({
    className,
    dropzoneClassName,
    onFilesAdded,
    onFileRemoved,
    value = [],
    disabled = false,
    maxFiles = 1,
    variant = 'default',
    showPreview = true,
    previewType = 'list',
    ...props
  }, ref) => {
    const [files, setFiles] = React.useState<File[]>(value);

    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
        setFiles(newFiles);
        onFilesAdded?.(acceptedFiles);
      },
      [files, maxFiles, onFilesAdded]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      disabled,
      maxFiles,
      ...props,
    });

    const removeFile = (fileToRemove: File) => {
      const newFiles = files.filter((file) => file !== fileToRemove);
      setFiles(newFiles);
      onFileRemoved?.(fileToRemove);
    };

    const renderPreview = () => {
      if (!showPreview || files.length === 0) return null;

      return (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => {
            const isImage = file.type.startsWith('image/');
            
            if (previewType === 'image' && isImage) {
              return (
                <div key={index} className="relative inline-block">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => removeFile(file)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <span className="text-sm truncate max-w-[200px]">
                  {file.name}
                </span>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => removeFile(file)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <div
          {...getRootProps()}
          className={cn(
            'relative cursor-pointer',
            'border-2 border-dashed border-muted-foreground/25 rounded-lg',
            'transition-colors duration-200',
            isDragActive && 'border-primary/50 bg-accent/50',
            disabled && 'cursor-not-allowed opacity-60',
            variant === 'compact' ? 'p-2' : 'p-8',
            dropzoneClassName
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <UploadIcon className={cn(
              'text-muted-foreground',
              variant === 'compact' ? 'h-4 w-4' : 'h-8 w-8'
            )} />
            {variant === 'default' && (
              <>
                <p className="text-sm font-medium">
                  Drag & drop files here, or click to select files
                </p>
                <p className="text-xs text-muted-foreground">
                  {props.accept ? `Accepted files: ${Object.keys(props.accept).join(', ')}` : 'Any file type accepted'}
                </p>
              </>
            )}
          </div>
        </div>
        {renderPreview()}
      </div>
    );
  }
);

FileUploader.displayName = 'FileUploader';