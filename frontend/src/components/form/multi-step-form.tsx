import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { cn } from '../../utils/cn';
import { MultiStepFormProps, StepStatus } from '../../types/form';
import { useFormPersistence } from '../../hooks/use-form-persistence';
import { QuestionField } from './question-field';
import { ProgressSteps } from './progress-steps';
import { SuccessStep } from './success-step';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Form } from '../ui/form';
import { IntroStep } from './intro-step';
import { LoadingSpinner } from '../ui/loading-spinner';
import { useNavigate } from 'react-router-dom';

export function MultiStepForm({
  title,
  description,
  steps,
  onSubmit,
  onStepChange,
  onStart,
  className,
  persistKey,
  onRedirect,
  introStep,
  successStep,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>(() =>
    Object.fromEntries(
      steps.map((step) => [
        step.id,
        { completed: false, valid: false, visited: false },
      ])
    )
  );
  const [showIntro, setShowIntro] = useState(!!introStep);
  const navigate = useNavigate();

  // Generate dynamic validation schema based on questions
  const generateSchema = () => {
    const schema: Record<string, any> = {};
    
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        if (question.isRequired) {
          switch (question.type) {
            case 'text':
            case 'rich-text':
              schema[question.id] = z.string().min(1, 'This field is required');
              break;
            case 'email':
              schema[question.id] = z.string().email('Invalid email address');
              break;
            case 'url':
              schema[question.id] = z.string().url('Invalid URL');
              break;
            case 'number':
              schema[question.id] = z.number().min(1, 'This field is required');
              break;
            case 'date':
              schema[question.id] = z.date();
              break;
            case 'file':
              schema[question.id] = z.array(z.unknown()).min(1, 'At least one file is required');
              break;
            case 'audio':
            case 'video':
              schema[question.id] = z.unknown().refine((val) => val != null, 'Recording is required');
              break;
            case 'question-group':
              if (question.groupConfig?.minEntries) {
                schema[question.id] = z.array(z.unknown()).min(
                  question.groupConfig.minEntries,
                  `At least ${question.groupConfig.minEntries} entries required`
                );
              } else {
                schema[question.id] = z.array(z.unknown());
              }
              break;
            default:
              schema[question.id] = z.unknown();
          }
        } else {
          // For optional fields
          schema[question.id] = z.unknown().optional();
        }
      });
    });

    return z.object(schema);
  };

  const form = useForm({
    resolver: zodResolver(generateSchema()),
    mode: 'onChange',
  });

  useFormPersistence(form, title ? title : persistKey);

  useEffect(() => {
    const validateCurrentStep = async () => {
      const fields = steps[currentStep].questions.map((q) => q.id);
      const isValid = await form.trigger(fields);
      
      setStepStatus((prev) => ({
        ...prev,
        [steps[currentStep].id]: {
          ...prev[steps[currentStep].id],
          valid: isValid,
          visited: true,
        },
      }));
    };

    validateCurrentStep();
  }, [currentStep, form, steps]);

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      if (onStepChange) {
        const stepData = form.getValues();
        onStepChange(stepIndex, stepData).catch(console.error);
      }
    }
  };

  const handleNext = async () => {
    const fields = steps[currentStep].questions.map((q) => q.id);
    const isValid = await form.trigger(fields);
    
    if (isValid) {
      setStepStatus((prev) => ({
        ...prev,
        [steps[currentStep].id]: {
          ...prev[steps[currentStep].id],
          completed: true,
          valid: true,
        },
      }));

      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (onStepChange) {
        const stepData = form.getValues();
        onStepChange(nextStep, stepData).catch(console.error);
      }
    }
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    if (onStepChange) {
      const stepData = form.getValues();
      onStepChange(prevStep, stepData).catch(console.error);
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    const isValid = await form.trigger();
    if (isValid) {
      setStepStatus((prev) => ({
        ...prev,
        [steps[currentStep].id]: {
          ...prev[steps[currentStep].id],
          completed: true,
          valid: true,
        },
      }));

      // Call the onSubmit callback
      onSubmit(data);
      
      // Clear persistence if enabled
      if (persistKey) {
        localStorage.removeItem(persistKey);
      }

      // Show success step
      setIsSubmitted(true);
    }
  };

  // Initialize form
  useEffect(() => {
    const initialize = async () => {
      if (!onStart) {
        setIsLoading(false);
        return;
      }

      try {
        const { canAccess, submissionId } = await onStart();
        if (!canAccess) {
          setError('You do not have access to this form or have already submitted it');
          navigate('/');  // Redirect to home if no access
          return;
        }
        if (submissionId) {
          setSubmissionId(submissionId);
        }
      } catch (error) {
        setError('Failed to initialize form');
        navigate('/');  // Redirect to home on error
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [onStart, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        {error}
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <SuccessStep
        {...successStep}
        onRedirect={onRedirect}
      />
    );
  }

  if (showIntro) {
    return (
      <IntroStep
        {...introStep}
        onStart={() => setShowIntro(false)}
      />
    );
  }

  const currentStepConfig = steps[currentStep];

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-purple-900 to-purple-900 py-8 px-4',
      className
    )}>
      <div className="mx-auto space-y-6">
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          stepStatus={stepStatus}
          onStepClick={handleStepClick}
        />

        {title && <h1 className="text-4xl font-bold text-white text-center pt-6">{title}</h1>}
        {description && <p className="text-white/80 text-center">{description}</p>}
        
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-2xl border-2 border-crazy-orange/80 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-black pb-4">{currentStepConfig.title}</h2>
              {currentStepConfig.description && (
                <div className="guidelines mb-6 text-gray-600 whitespace-pre-line">{currentStepConfig.description}</div>
              )}
            </div>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-6">
                    {currentStepConfig.questions.map((question) => (
                      <QuestionField key={question.id} question={question} />
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="text-purple-900 border-purple-200 hover:bg-purple-100"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button type="submit" className="bg-crazy-orange text-white hover:bg-crazy-orange/90">
                    <Check className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext} className="bg-crazy-orange text-white hover:bg-crazy-orange/90">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}