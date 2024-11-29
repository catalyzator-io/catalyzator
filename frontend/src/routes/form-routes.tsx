import { RouteObject, useNavigate } from 'react-router-dom';
import { MultiStepForm } from '../components/form/multi-step-form';
import { FORM_CONFIGS } from '../constants/forms';
import { useAuth } from '../hooks/useAuth';
import { dal } from '../utils/dal/dal';
import { useState } from 'react';

const FormWrapper = ({ formId, conf, url }: { formId: string, conf: any, url: string }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = conf.steps.length;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {

    if (!currentUser?.uid) return;

    if (currentStep < totalSteps - 1) {
        console.log('Not on last step, moving to next step');

        handleStepChange(currentStep + 1);
        return;
      }
    setIsSubmitting(true);


    try {
      if (formId === 'user_consent') {
        await dal.user.updateTermsAcceptance(currentUser.uid);
        navigate(FORM_CONFIGS.entity_registration.url);
      } 
      else if (formId === 'entity_registration') {
      if (isSubmitting) {
        await dal.entities.createEntity(data);
      
        navigate('/');
      }
      }
      else {
        console.log('Form submitted:', data);
      }
     
    }
     catch (error) {
      console.error('Error processing form submission:', error);
    }
    finally {
        setIsSubmitting(false);
      }
  };

 

  const handleStepChange = (step: number) => {
    if (step >= 0 && step <= totalSteps) {
      setCurrentStep(step);
      console.log(`Moving to step ${step + 1} of ${totalSteps}`);
    }
  };

  const handleRedirect = () => {
    if (formId === 'entity_registration') {
      navigate('/');
    }
  };

  return (
    <MultiStepForm
      {...conf}
      onSubmit={handleSubmit}
      onStepChange={handleStepChange}
      onRedirect={handleRedirect}
      className="mx-auto p-4"
    />
  );
};

const formRoutes: RouteObject[] = Object.entries(FORM_CONFIGS).map(([formId, { conf, url }]) => ({
  path: url,
  element: <FormWrapper formId={formId} conf={conf} url={url} />
}));

export default formRoutes; 