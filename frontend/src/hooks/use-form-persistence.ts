import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useFormPersistence(
  form: UseFormReturn<any>,
  key?: string
) {
  useEffect(() => {
    if (!key) return;

    // Load saved data
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        form.reset(parsedData);
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }

    // Subscribe to form changes
    const subscription = form.watch((data) => {
      localStorage.setItem(key, JSON.stringify(data));
    });

    return () => subscription.unsubscribe();
  }, [form, key]);
}