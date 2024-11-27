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

export function MultiStepForm({
  title,
  description,
  steps,
  onSubmit,
  onStepChange,
  className,
  persistKey,
  redirectUrl,
  introStep,
  successStep,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [stepStatus, setStepStatus] = useState<Record<string, StepStatus>>(() =>
    Object.fromEntries(
      steps.map((step) => [
        step.id,
        { completed: false, valid: false, visited: false },
      ])
    )
  );
  const [showIntro, setShowIntro] = useState(!!introStep);

  // Generate dynamic validation schema based on questions
  const generateSchema = () => {
    const schema: Record<string, any> = {};
    
    steps.forEach((step) => {
      step.questions.forEach((question) => {
        let fieldSchema = z.any();
        
        if (question.isRequired) {
          switch (question.type) {
            case 'text':
            case 'rich-text':
              fieldSchema = z.string().min(1, 'This field is required');
              break;
            case 'email':
              fieldSchema = z.string().email('Invalid email address');
              break;
            case 'url':
              fieldSchema = z.string().url('Invalid URL');
              break;
            case 'number':
              fieldSchema = z.number();
              break;
            case 'date':
              fieldSchema = z.date();
              break;
            case 'file':
              fieldSchema = z.array(z.any()).min(1, 'At least one file is required');
              break;
            case 'audio':
            case 'video':
              fieldSchema = z.any().refine((val) => val != null, 'Recording is required');
              break;
            case 'question-group':
              if (question.groupConfig?.minEntries) {
                fieldSchema = z.array(z.any()).min(
                  question.groupConfig.minEntries,
                  `At least ${question.groupConfig.minEntries} entries required`
                );
              }
              break;
            default:
              fieldSchema = z.any();
          }
        }
        
        schema[question.id] = question.isRequired ? fieldSchema : fieldSchema.optional();
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
      onStepChange?.(stepIndex);
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
      onStepChange?.(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep);
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

  if (isSubmitted) {
    return (
      <SuccessStep
        {...successStep}
        redirectUrl={redirectUrl}
        onRedirect={() => {
          if (redirectUrl) {
            window.location.href = redirectUrl;
          }
        }}
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
      'min-h-screen bg-gradient-to-br from-purple-900 to-purple-800 py-8 px-4',
      className
    )}>
      <div className="mx-auto space-y-6">
        <ProgressSteps
          steps={steps}
          currentStep={currentStep}
          stepStatus={stepStatus}
          onStepClick={handleStepClick}
        />

        {title && <h1 className="text-3xl font-bold text-white text-center">{title}</h1>}
        {description && <p className="text-white/80 text-center">{description}</p>}
        
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-xl border border-purple-700/20 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-purple-900">{currentStepConfig.title}</h2>
              {currentStepConfig.description && (
                <p className="text-purple-900/80">{currentStepConfig.description}</p>
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