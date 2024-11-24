import { FormConfig, FormQuestion } from '../../types/form';

const basicInfoQuestions: FormQuestion[] = [
  {
    id: 'entity_name',
    title: 'What is your organization\'s name?',
    description: 'The official name of your organization',
    type: 'text',
    value_type: 'text',
    required: true,
    multiple_entries: false,
    placeholder: 'Enter your organization name',
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'entity_type',
    title: 'What type of organization are you?',
    description: 'Are you an innovator seeking funding or a catalyst supporting innovation?',
    type: 'radio',
    value_type: 'radio',
    required: true,
    multiple_entries: false,
    validation: {
      options: ['innovator', 'catalyst'],
      allow_other: false
    }
  }
];

const entityDetailsQuestions: FormQuestion[] = [
  {
    id: 'website',
    title: 'Your organization\'s website',
    description: 'Share your online presence',
    type: 'url',
    value_type: 'text',
    required: false,
    multiple_entries: false,
    placeholder: 'https://',
    validation: {
      pattern: 'https?://.+'
    }
  },
  {
    id: 'description',
    title: 'Describe your organization',
    description: 'What does your organization do?',
    type: 'textarea',
    value_type: 'textarea',
    required: true,
    multiple_entries: false,
    validation: {
      min_length: 50,
      max_length: 1000
    }
  },
  {
    id: 'industry',
    title: 'Select your industry',
    description: 'Choose the industries that best describe your organization',
    type: 'multiselect',
    value_type: 'multiselect',
    required: true,
    multiple_entries: true,
    validation: {
      options: [
        'ai_ml', 'agtech', 'biotech', 'cleantech', 'cyber_security',
        'e_commerce', 'edtech', 'enterprise_software', 'fintech',
        'foodtech', 'gaming', 'healthcare', 'hardware', 'iot',
        'logistics', 'marketplace', 'media', 'mobility', 'real_estate',
        'retail', 'robotics', 'saas', 'semiconductor', 'space',
        'telecom', 'web3', 'other'
      ],
      min_selections: 1,
      max_selections: 5,
      allow_other: true
    }
  }
];

export const ENTITY_REGISTRATION_FORM: FormConfig = {
  id: 'entity_registration',
  title: 'Welcome to Your Organization Registration',
  description: 'Let\'s get your organization set up in our system! 🚀',
  steps: [
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
      conditions: [
        {
          step_id: 'basic_info',
          condition: 'completed'
        }
      ],
      questions: entityDetailsQuestions
    }
  ],
  metadata: {
    product_id: 'registration',
    version: '1.0'
  }
}; 