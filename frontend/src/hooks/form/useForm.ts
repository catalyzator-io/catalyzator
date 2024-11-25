import { useCallback, useState, useEffect } from 'react';
import { FormConfig, FormSubmission } from '../../types/form';
import { useFormState } from './useFormState';
import { FormDAL } from '../../utils/dal/form';

interface UseFormProps {
  formId: string;
  onComplete?: (formData: FormSubmission) => Promise<void>;
  redirectOnComplete?: string;
}

export const useForm = ({ formId, onComplete }: UseFormProps) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  // Load form configuration
  const loadForm = useCallback(async () => {
    try {
      setConfigLoading(true);
      setConfigError(null);
      const formConfig = await FormDAL.getFormConfig(formId);
      setConfig(formConfig);
    } catch (err) {
      setConfigError(err instanceof Error ? err.message : 'Failed to load form');
      console.error('Failed to load form config:', err);
    } finally {
      setConfigLoading(false);
    }
  }, [formId]);

  // Load form on mount
  useEffect(() => {
    loadForm();
  }, [loadForm]);

  // Initialize form state if config is loaded
  const formState = useFormState({
    formId,
    config: config!,
    onSubmit: onComplete,
    autoSave: true
  });

  // Combine loading states
  const isFormLoading = configLoading || formState.isLoading;
  const formError = configError || formState.error;

  return {
    config,
    configLoading,
    configError,
    loadForm,
    isFormLoading,
    formError,
    ...formState
  };
}; 