import { useCallback, useState, useEffect } from 'react';
import { FormConfig, FormSubmission } from '../../types/form';
import { useFormState } from './useFormState';
import { formDAL } from '../../utils/dal/form';

interface UseFormProps {
  formId: string;
  onComplete?: (formData: FormSubmission) => Promise<void>;
  redirectOnComplete?: string;
}

export const useForm = ({ formId, onComplete }: UseFormProps) => {
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [configLoading, setConfigLoading] = useState(true);
  const [configError, setConfigError] = useState<string | null>(null);

  const loadForm = useCallback(async () => {
    try {
      setConfigLoading(true);
      setConfigError(null);
      const formConfig = await formDAL.getFormConfig(formId);
      setConfig(formConfig);
    } catch (err) {
      setConfigError(err instanceof Error ? err.message : 'Failed to load form');
      setConfig(null);
    } finally {
      setConfigLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    loadForm();
  }, [loadForm]);

  const formState = useFormState({
    formId,
    config: config || {
      id: formId,
      title: '',
      description: '',
      steps: [],
      metadata: {}
    },
    onSubmit: onComplete
  });

  if (configLoading || !config) {
    return {
      config: null,
      configLoading,
      configError,
      loadForm,
      ...formState
    };
  }

  return {
    config,
    configLoading,
    configError,
    loadForm,
    ...formState
  };
}; 