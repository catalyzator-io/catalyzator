import { FormConfig, QuestionConfig, StepConfig } from '../../types/form';
import { 
  INDUSTRY_LABELS,
  createOptions 
} from '../../types/investor';

const INDUSTRY_OPTIONS = createOptions(INDUSTRY_LABELS);

const introStep = {
  title: 'Welcome to Compass! 🧭',
  message: `Let us guide you to the perfect grants! Here's how Compass works:

• We analyze your past applications 📊
• Our AI identifies your strengths 💪
• We match you with relevant grants 🎯
• You get personalized recommendations ⭐
• Save time on grant searching ⏰
• Higher success rate with targeted applications 🚀

The more information you provide, the better we can match you!`,
  buttonText: 'Continue'
}

const successStep = {
  title: 'Compass Ready! 🧭',
  message: 'We are ready to help you find the perfect grants for your venture!',
  buttonText: 'Continue'
}

const companyProfileQuestions: QuestionConfig[] = [
  {
    id: 'industries',
    type: 'checkbox',
    question: 'Your Industries 🎯',
    description: 'Select all industries that apply to your venture',
    isRequired: true,
    options: INDUSTRY_OPTIONS
  },
  {
    id: 'companyStage',
    type: 'text',
    question: 'Company Stage 📈',
    description: 'Tell us about your current stage and traction',
    isRequired: true,
    placeholder: 'Describe your company stage, revenue, users, etc.',
    validation: {
      min_length: 50,
      max_length: 500
    }
  }
]

const pastApplicationsQuestions: QuestionConfig[] = [
  {
    id: 'applicationCount',
    type: 'number',
    question: 'Number of Past Applications 🔢',
    description: 'How many grant applications have you submitted in the past?',
    isRequired: true,
    placeholder: 'Enter the number of past applications',
    validation: {
      min: 1,
      max: 100
    }
  },
  {
    id: 'pastApplicationFiles',
    type: 'file',
    question: 'Upload Past Applications 📎',
    description: 'Share your previous grant applications (PDF, DOC, DOCX)',
    isRequired: true,    validation: {
      allowed_types: ['pdf', 'doc', 'docx'],
      max_size: 10485760, // 10MB
      max_files: 20
    }
  },
  {
    id: 'applicationDetails',
    type: 'text',
    question: 'Application Details 📋',
    description: 'Tell us about these applications (success rate, feedback received, etc.)',
    isRequired: true,
    placeholder: 'Share details about your application experience',
    validation: {
      min_length: 100,
      max_length: 1000
    }
  }
]

const grantPreferencesQuestions: QuestionConfig[] = [
  {
    id: 'grantSize',
    type: 'number',
    question: 'Preferred Grant Size 💰',
    description: 'What grant sizes are you interested in?',
    isRequired: true,
    placeholder: 'Describe your preferred grant size range',
    validation: {
      min: 100000,
      max: 100000000
    }
  },
  {
    id: 'additionalInfo',
    type: 'text',
    question: 'Additional Information 📌',
    description: 'Anything else that could help us find better matches?',
    isRequired: false,
    placeholder: 'Share any other relevant information',
    validation: {
      max_length: 10000
    }
  }
]

const pastApplicationsSteps: StepConfig[] = [
  // Step 1: Company Profile
  {
    id: 'company_profile',
    title: 'Company Profile 🏢',
    description: "Let's understand your venture better",
    questions: companyProfileQuestions
  },

  // Step 2: Past Applications
  {
    id: 'past_applications',
    title: 'Past Applications 📝',
    description: "Share your previous grant applications with us",
    questions: pastApplicationsQuestions
  },

  // Step 3: Grant Preferences
  {
    id: 'grant_preferences',
    title: 'Grant Preferences 🎯',
    description: "Help us understand what you're looking for",
    questions: grantPreferencesQuestions
  }
]

export const PAST_APPLICATIONS_FORM: FormConfig = {
  id: 'past_applications',
  title: 'Past Grant Applications 📚',
  description: 'Help us recommend the perfect grants by sharing your application history!',
  steps: pastApplicationsSteps,
  introStep: introStep,
  successStep: successStep,
}; 
