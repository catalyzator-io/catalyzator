import { RouteObject, useNavigate } from 'react-router-dom';
import { MultiStepForm } from '../components/form/multi-step-form';
import { FORM_CONFIGS } from '../constants/forms';
import { useAuth } from '../hooks/useAuth';
import { dal } from '../utils/dal/dal';
import { formDAL } from '../utils/dal/form/FormDAL';
import { useState } from 'react';
import { FormId } from '@/types/form';
import { toast } from 'react-hot-toast';

interface FileField {
  questionId: string;
  files: File[];
}

const FormWrapper = ({ formId, conf, url }: { formId: string, conf: any, url: string }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = conf.steps.length;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const extractFileFields = (data: Record<string, any>): { 
    fileFields: Record<string, File[]>,
    cleanData: Record<string, any>
  } => {
    const fileFields: Record<string, File[]> = {};
    const cleanData = { ...data };

    // Recursively check for File objects in nested structures
    const processValue = (value: any, currentKey: string) => {
      if (value instanceof File) {
        // Initialize array if it doesn't exist
        if (!fileFields[currentKey]) {
          fileFields[currentKey] = [];
        }
        fileFields[currentKey].push(value);
        return true;
      }
      if (Array.isArray(value)) {
        const hasFiles = value.some(item => processValue(item, currentKey));
        if (hasFiles) {
          delete cleanData[currentKey];
        }
        return hasFiles;
      }
      return false;
    };

    // Process all fields
    Object.entries(data).forEach(([key, value]) => {
      processValue(value, key);
    });

    return { fileFields, cleanData };
  };

  const handleSubmit = async (data: any) => {
    if (!currentUser?.uid) return;

    if (currentStep < totalSteps - 1) {
      handleStepChange(currentStep + 1);
      return;
    }

    setIsSubmitting(true);

    try {
    
      if (formId === 'user_consent') {
        await dal.user.updateTermsAcceptance(currentUser.uid);
        navigate(FORM_CONFIGS.entity_registration.url);
        toast.success('Terms accepted successfully');
      } else if (formId === 'entity_registration') {
        data["created_by"] = currentUser.uid;   
        await toast.promise(
          dal.entities.createEntity(data),
          {
            loading: 'Creating entity...',
            success: 'Entity created successfully',
            error: 'Failed to create entity'
          }
        );
        setTimeout(() => {
          navigate('/');
        }, 500);
        
      } else {
        const entityIds = await dal.user.getUserEntities(currentUser.uid);

        if (!entityIds || entityIds.length === 0) {
          throw new Error('No entities found for user');
        }

        // Extract file fields from form data
        const { fileFields, cleanData } = extractFileFields(data);

        await toast.promise(
          formDAL.createSubmission({
            form_id: formId as FormId,
            entity_id: entityIds[0],
            submitted_by: currentUser.uid,
            data: cleanData,
            files: fileFields
          }),
          {
            loading: 'Uploading files and submitting form...',
            success: 'Form submitted successfully',
            error: 'Failed to submit form'
          }
        );

        setTimeout(() => {
          navigate('/');
        }, 500);
      

      }
    } catch (error) {
      console.error('Error processing form submission:', error);
    } finally {
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