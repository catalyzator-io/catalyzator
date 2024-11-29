import { RouteObject } from 'react-router-dom';
import { MultiStepForm } from '../components/form/multi-step-form';
import { FORM_CONFIGS } from '../constants/forms';
import { FormManager } from '../utils/form/FormManager';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FormConfig, FormId } from '../types/form';
import { useState } from 'react';

interface FormWrapperProps {
  formId: FormId;
  config: FormConfig;
}

const FormWrapper = ({ formId, config }: FormWrapperProps) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const handleStart = async () => {
    if (!currentUser) {
      navigate('/signin');
      return { canAccess: false, submissionId: undefined };
    }

    const { canAccess, submissionId } = await FormManager.initializeForm(
      formId,
      currentUser.uid
    );

    if (!canAccess) {
      if (submissionId) {
        const redirectPath = await FormManager.getRedirectPath(formId, currentUser.uid);
        navigate(redirectPath);
      }
      return { canAccess: false, submissionId: undefined };
    }

    setSubmissionId(submissionId);
    return { canAccess: true, submissionId: submissionId || undefined };
  };

  const handleStepChange = async (step: number, stepData: Record<string, any>) => {
    if (!currentUser || !submissionId) return;

    await FormManager.updateFormStep(
      formId,
      currentUser.uid,
      submissionId,
      step,
      stepData
    );
  };

  const handleSubmit = async (data: any) => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    try {
      await FormManager.handleSubmit(
        formId,
        currentUser.uid,
        submissionId || '',
        data
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (show toast, etc.)
    }
  };

  const handleRedirect = async () => {
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    try {
      const redirectPath = await FormManager.getRedirectPath(
        formId,
        currentUser.uid
      );
      navigate(redirectPath);
    } catch (error) {
      console.error('Error handling redirect:', error);
      navigate('/dashboard');
    }
  };

  return (
    <MultiStepForm
      {...config}
      onStart={handleStart}
      onSubmit={handleSubmit}
      onStepChange={handleStepChange}
      onRedirect={handleRedirect}
      className="mx-auto p-4"
    />
  );
};

const formRoutes: RouteObject[] = Object.entries(FORM_CONFIGS).map(
  ([formId, { conf, url }]) => ({
    path: url,
    element: <FormWrapper formId={formId as FormId} config={conf} />
  })
);

export default formRoutes; 