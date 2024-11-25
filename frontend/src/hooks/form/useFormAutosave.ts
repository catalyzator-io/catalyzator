import { useState, useEffect, useRef } from 'react';
import { FormSubmission } from '../../types/form';

export const useFormAutosave = (
  formState: FormSubmission,
  saveForm: (state: FormSubmission) => Promise<void>
) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<number>();

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(async () => {
      setIsSaving(true);
      try {
        await saveForm(formState);
        setLastSaved(new Date());
      } catch (err) {
        console.error('Autosave failed:', err);
      } finally {
        setIsSaving(false);
      }
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formState, saveForm]);

  return { isSaving, lastSaved };
}; 