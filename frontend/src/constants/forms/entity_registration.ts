import { StepConfig, FormConfig, QuestionConfig } from '../../types/form';

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
      { label: 'Innovator', value: 'innovator' },
      { label: 'Catalyst', value: 'catalyst' }
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
    options: [
      { value: 'ai_ml', label: 'AI/ML' },
      { value: 'agtech', label: 'Agtech' },
      { value: 'biotech', label: 'Biotech' },
      { value: 'cleantech', label: 'Cleantech' },
      { value: 'cyber_security', label: 'Cyber Security' },
      { value: 'e_commerce', label: 'E-Commerce' },
      { value: 'edtech', label: 'Edtech' },
      { value: 'enterprise_software', label: 'Enterprise Software' },
      { value: 'fintech', label: 'Fintech' },
      { value: 'foodtech', label: 'Foodtech' },
      { value: 'gaming', label: 'Gaming' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'hardware', label: 'Hardware' },
      { value: 'iot', label: 'IoT' },
      { value: 'logistics', label: 'Logistics' },
      { value: 'marketplace', label: 'Marketplace' },
      { value: 'media', label: 'Media' },
      { value: 'mobility', label: 'Mobility' },
      { value: 'real_estate', label: 'Real Estate' },
      { value: 'retail', label: 'Retail' },
      { value: 'robotics', label: 'Robotics' },
      { value: 'saas', label: 'SaaS' },
      { value: 'semiconductor', label: 'Semiconductor' },
      { value: 'space', label: 'Space' },
      { value: 'telecom', label: 'Telecom' },
      { value: 'web3', label: 'Web3' },
      { value: 'other', label: 'Other' }
    ],
    validation: {
      min_selections: 1,
      max_selections: 5,
      allow_other: true
    }
  }
];

const ENTITY_REGISTRATION_FORM_STEPS: StepConfig[] = [
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
  }
];

export const ENTITY_REGISTRATION_FORM: FormConfig = {
  id: 'entity_registration',
  title: 'Welcome to Your Organization Registration',
  description: 'Let\'s get your organization set up in our system! 🚀',
  steps: ENTITY_REGISTRATION_FORM_STEPS,
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
