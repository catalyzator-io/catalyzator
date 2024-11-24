import { FormConfig } from '../../types/form';
import { 
  INDUSTRY_LABELS,
  createOptions 
} from '../../types/investor';

const INDUSTRY_OPTIONS = createOptions(INDUSTRY_LABELS);

export const PAST_APPLICATIONS_FORM: FormConfig = {
  id: 'past_applications',
  title: 'Past Grant Applications 📚',
  description: 'Help us recommend the perfect grants by sharing your application history!',
  steps: [
    // Step 1: Introduction to Compass
    {
      id: 'compass_intro',
      title: 'Welcome to Compass! 🧭',
      description: `Let us guide you to the perfect grants! Here's how Compass works:

• We analyze your past applications 📊
• Our AI identifies your strengths 💪
• We match you with relevant grants 🎯
• You get personalized recommendations ⭐
• Save time on grant searching ⏰
• Higher success rate with targeted applications 🚀

The more information you provide, the better we can match you!`,
      questions: []
    },

    // Step 2: Company Profile
    {
      id: 'company_profile',
      title: 'Company Profile 🏢',
      description: "Let's understand your venture better",
      questions: [
        {
          id: 'industries',
          type: 'checkbox',
          title: 'Your Industries 🎯',
          description: 'Select all industries that apply to your venture',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: INDUSTRY_OPTIONS
          }
        },
        {
          id: 'companyStage',
          type: 'text',
          title: 'Company Stage 📈',
          description: 'Tell us about your current stage and traction',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Describe your company stage, revenue, users, etc.',
          validation: {
            min_length: 50,
            max_length: 500
          }
        }
      ]
    },

    // Step 3: Past Applications
    {
      id: 'past_applications',
      title: 'Past Applications 📝',
      description: "Share your previous grant applications with us",
      questions: [
        {
          id: 'applicationCount',
          type: 'number',
          title: 'Number of Past Applications 🔢',
          description: 'How many grant applications have you submitted in the past?',
          value_type: 'number',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter the number of past applications',
          validation: {
            min: 1,
            max: 100
          }
        },
        {
          id: 'pastApplicationFiles',
          type: 'upload',
          title: 'Upload Past Applications 📎',
          description: 'Share your previous grant applications (PDF, DOC, DOCX)',
          value_type: 'file',
          required: true,
          multiple_entries: true,
          placeholder: 'Upload your past grant applications',
          validation: {
            allowed_types: ['pdf', 'doc', 'docx'],
            max_size: 10485760, // 10MB
            max_files: 20
          }
        },
        {
          id: 'applicationDetails',
          type: 'text',
          title: 'Application Details 📋',
          description: 'Tell us about these applications (success rate, feedback received, etc.)',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Share details about your application experience',
          validation: {
            min_length: 100,
            max_length: 1000
          }
        }
      ]
    },

    // Step 4: Grant Preferences
    {
      id: 'grant_preferences',
      title: 'Grant Preferences 🎯',
      description: "Help us understand what you're looking for",
      questions: [
        {
          id: 'grantSize',
          type: 'number',
          title: 'Preferred Grant Size 💰',
          description: 'What grant sizes are you interested in?',
          value_type: 'number',
          required: true,
          multiple_entries: false,
          placeholder: 'Describe your preferred grant size range',
          validation: {
            min: 100000,
            max: 100000000
          }
        },
        {
          id: 'additionalInfo',
          type: 'textarea',
          title: 'Additional Information 📌',
          description: 'Anything else that could help us find better matches?',
          value_type: 'text',
          required: false,
          multiple_entries: false,
          placeholder: 'Share any other relevant information',
          validation: {
            max_length: 10000
          }
        }
      ]
    }
  ],
  metadata: {
    product_id: 'compass',
    entity_type: 'innovator',
    version: '1.0'
  }
}; 