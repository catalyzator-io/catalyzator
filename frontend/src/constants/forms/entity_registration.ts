import { StepConfig, FormConfig, QuestionConfig } from '../../types/form';
import { INDUSTRY_LABELS } from '../../types/investor';
const basicInfoQuestions: QuestionConfig[] = [
  {
    id: 'entity_name',
    question: 'What is your organization\'s name?',
    description: 'The official name of your organization',
    type: 'text',
    isRequired: true,
    placeholder: 'Enter your organization name',
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'entity_type',
    question: 'What type of organization are you?',
    description: 'Are you an innovator seeking funding or a catalyst supporting innovation?',
    type: 'single-choice-multi',
    isRequired: true,
    options: [
      { label: 'Innovator (Startup, Lab, Venture, etc.)', value: 'innovator' },
      { label: 'Catalyst (Venture Capital, Fund, etc.)', value: 'catalyst' }
    ],
    validation: {
      allowOther: false
    }
  }
];

const entityDetailsQuestions: QuestionConfig[] = [
  {
    id: 'website',
    question: 'Your organization\'s website',
    description: 'Share your online presence',
    type: 'url',
    isRequired: false,
    placeholder: 'https://',
  },
  {
    id: 'description',
    question: 'Describe your organization',
    description: 'What does your organization do?',
    type: 'rich-text',
    isRequired: true,
    validation: {
      min_length: 50,
      max_length: 1000
    }
  },
  {
    id: 'industry',
    question: 'Select your industry',
    description: 'Choose the industries that best describe your organization',
    type: 'multi-choice',
    isRequired: true,
    options: INDUSTRY_LABELS,
    validation: {
      min_selections: 1,
      max_selections: 5,
      allow_other: true
    }
  }
];

const steps: StepConfig[] = [
  {
    id: 'basic_info',
    title: 'Basic Information',
    description: 'Let\'s start with the essentials',
    questions: basicInfoQuestions
  },
  {
    id: 'entity_details',
    title: 'Organization Details',
    description: 'Tell us more about your organization',
    questions: entityDetailsQuestions
  },
  {
    id: 'none',
    title: 'None',
    description: 'None',
    questions: entityDetailsQuestions
  }
];

export const ENTITY_REGISTRATION_FORM: FormConfig = {
  id: 'entity_registration',
  title: 'Welcome to Your Organization Registration',
  description: 'Let\'s get your organization set up in our system! 🚀',
  steps: steps,
  introStep: {
    title: 'Welcome to Your Organization Registration',
    message: 'Let\'s get your organization set up in our system! 🚀',
    buttonText: 'Continue'
  },
  successStep: {
    title: 'Organization Registration Complete! 🎉',
    message: 'Your organization has been registered successfully!',
    buttonText: 'Continue'
  }
};
