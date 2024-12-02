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

function ProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function MultiStepForm({
  title,
  description,
  steps,
  onSubmit,
  onStepChange,
  className,
  persistKey,
  onRedirect,
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
            case 'checkbox':
              schema[question.id] = z.boolean().refine((val) => val === true, {
                message: 'This field is required'
              });
              break;
            case 'question-group':
              // Generate schema for inner questions
              const innerSchema: Record<string, any> = {};
              
              // Get the first question's fields as template
              question.groupConfig?.questions.forEach((innerQuestion) => {
                if (innerQuestion.isRequired) {
                  switch (innerQuestion.type) {
                    case 'text':
                    case 'rich-text':
                      innerSchema[innerQuestion.id] = z.string().min(1, 'This field is required');
                      break;
                    case 'email':
                      innerSchema[innerQuestion.id] = z.string().email('Invalid email address');
                      break;
                    case 'url':
                      innerSchema[innerQuestion.id] = z.string().url('Invalid URL');
                      break;
                    case 'number':
                      innerSchema[innerQuestion.id] = z.number().min(1, 'This field is required');
                      break;
                    case 'date':
                      innerSchema[innerQuestion.id] = z.date();
                      break;
                    case 'checkbox':
                      innerSchema[innerQuestion.id] = z.boolean().refine((val) => val === true, {
                        message: 'This field is required'
                      });
                      break;
                    case 'multi-choice':
                      innerSchema[innerQuestion.id] = z.array(z.string()).min(1, 'At least one option must be selected');
                      break;
                    default:
                      innerSchema[innerQuestion.id] = z.any();
                  }
                } else {
                  // Optional fields
                  switch (innerQuestion.type) {
                    case 'checkbox':
                      innerSchema[innerQuestion.id] = z.boolean().optional();
                      break;
                    case 'multi-choice':
                      innerSchema[innerQuestion.id] = z.array(z.string()).optional();
                      break;
                    default:
                      innerSchema[innerQuestion.id] = z.any().optional();
                  }
                }
              });

              // Create array schema with the inner object schema
              const groupObjectSchema = z.object(innerSchema);

              if (question.groupConfig?.minEntries) {
                schema[question.id] = z.array(groupObjectSchema).min(
                  question.groupConfig.minEntries,
                  `At least ${question.groupConfig.minEntries} entries required`
                );
              } else if (question.isRequired) {
                schema[question.id] = z.array(groupObjectSchema).min(1, 'At least one entry is required');
              } else {
                schema[question.id] = z.array(groupObjectSchema).optional();
              }
              break;
            case 'multi-choice':
              schema[question.id] = z.array(z.string()).min(1, 'At least one option must be selected');
              break;
            default:
              schema[question.id] = z.unknown();
          }
        } else {
          // For optional fields
          switch (question.type) {
            case 'question-group':
              // Even for optional groups, validate inner fields if present
              const optionalInnerSchema: Record<string, any> = {};
              
              question.groupConfig?.questions.forEach((innerQuestion) => {
                if (innerQuestion.isRequired) {
                  switch (innerQuestion.type) {
                    case 'text':
                    case 'rich-text':
                      optionalInnerSchema[innerQuestion.id] = z.string().min(1, 'This field is required');
                      break;
                    case 'email':
                      optionalInnerSchema[innerQuestion.id] = z.string().email('Invalid email address');
                      break;
                    case 'url':
                      optionalInnerSchema[innerQuestion.id] = z.string().url('Invalid URL');
                      break;
                    case 'number':
                      optionalInnerSchema[innerQuestion.id] = z.number().min(1, 'This field is required');
                      break;
                    case 'date':
                      optionalInnerSchema[innerQuestion.id] = z.date();
                      break;
                    case 'checkbox':
                      optionalInnerSchema[innerQuestion.id] = z.boolean().refine((val) => val === true, {
                        message: 'This field is required'
                      });
                      break;
                    case 'multi-choice':
                      optionalInnerSchema[innerQuestion.id] = z.array(z.string()).optional();
                      break;
                    default:
                      optionalInnerSchema[innerQuestion.id] = z.any().optional();
                  }
                } else {
                  optionalInnerSchema[innerQuestion.id] = z.any().optional();
                }
              });

              schema[question.id] = z.array(z.object(optionalInnerSchema)).optional();
              break;
            case 'multi-choice':
              schema[question.id] = z.array(z.string()).optional();
              break;
            default:
              schema[question.id] = z.unknown().optional();
          }
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
    } else {
      // Show error messages for all invalid fields
      fields.forEach(async (fieldName) => {
        await form.trigger(fieldName);
      });
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
      <div className={cn(
        'min-h-screen bg-gradient-to-br from-purple-900 to-purple-900',
        'flex items-center justify-center',
        className
      )}>
        <div className="w-full max-w-2xl px-4">
          <Card className="rounded-2xl shadow-2xl border-2 border-crazy-orange/80 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-black break-words whitespace-pre-wrap">{successStep?.title}</h2>
                {successStep?.message && (
                  <p className="text-gray-600 break-words whitespace-pre-wrap leading-relaxed">{successStep.message}</p>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Button 
                onClick={onRedirect}
                className="bg-crazy-orange text-white hover:bg-crazy-orange/90"
              >
                {successStep?.ctaText || 'Continue'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (showIntro) {
    return (
      <div className={cn(
        'min-h-screen bg-gradient-to-br from-purple-900 to-purple-900',
        'flex items-center justify-center',
        className
      )}>
        <div className="w-full max-w-2xl px-4">
          <Card className="rounded-2xl shadow-2xl border-2 border-crazy-orange/80 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-black break-words whitespace-pre-wrap">{introStep?.title}</h2>
                {introStep?.message && (
                  <p className="text-gray-600 break-words whitespace-pre-wrap leading-relaxed">{introStep.message}</p>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex justify-center pb-6">
              <Button 
                onClick={() => setShowIntro(false)}
                className="bg-crazy-orange text-white hover:bg-crazy-orange/90"
              >
                {introStep?.ctaText || 'Start'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const currentStepConfig = steps[currentStep];

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-purple-900 to-purple-900 py-8 px-4',
      className
    )}>
      <div className="mx-auto space-y-6">
        <div className="max-w-2xl mx-auto px-4">
          <ProgressBar 
            currentStep={currentStep} 
            totalSteps={steps.length} 
          />
        </div>

        {title && <h1 className="text-4xl font-bold text-white text-center pt-6">{title}</h1>}
        {description && <p className="text-white/80 text-center">{description}</p>}
        
        <Card className="max-w-2xl mx-auto rounded-2xl shadow-2xl border-2 border-crazy-orange/80 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-black pb-4">{currentStepConfig.title}</h2>
              {currentStepConfig.description && (
                <div className={cn(
                  "guidelines text-gray-600 whitespace-pre-line prose prose-gray max-w-none",
                  "prose-ul:list-disc prose-ol:list-decimal",
                  "prose-li:my-1 prose-p:my-2",
                  !currentStepConfig.questions.length && "h-[400px] overflow-y-auto"
                )}>
                  {currentStepConfig.description}
                </div>
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