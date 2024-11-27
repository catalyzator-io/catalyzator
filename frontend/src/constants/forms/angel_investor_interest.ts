import { FormConfig, StepConfig, QuestionConfig, Option } from '../../types/form';
import { 
  STAGE_LABELS,
  INDUSTRY_LABELS,
  INVESTMENT_RANGE_LABELS,
  EXPERTISE_LABELS,
  MENTORSHIP_LEVEL_LABELS,
  REMOTE_PREFERENCE_LABELS,
  INVESTMENT_REGION_LABELS,
  createOptions,
} from '../../types/investor';

// Create options from the label constants
const STAGE_OPTIONS: Option[] = createOptions(STAGE_LABELS);
const INDUSTRY_OPTIONS: Option[] = createOptions(INDUSTRY_LABELS);
const INVESTMENT_RANGE_OPTIONS: Option[] = createOptions(INVESTMENT_RANGE_LABELS);
const EXPERTISE_OPTIONS: Option[] = createOptions(EXPERTISE_LABELS);
const MENTORSHIP_OPTIONS: Option[] = createOptions(MENTORSHIP_LEVEL_LABELS);
const REMOTE_PREFERENCE_OPTIONS: Option[] = createOptions(REMOTE_PREFERENCE_LABELS);
const INVESTMENT_REGION_OPTIONS: Option[] = createOptions(INVESTMENT_REGION_LABELS);

const introStep = {
  title: 'Welcome to FundMatch! 🤝',
  description: `Before we begin, here's how we create perfect matches
Our intelligent matching system connects angels with promising startups based on:

• Industry expertise alignment 🎯
• Investment preferences match 💰
• Geographic focus compatibility 🌍
• Stage and sector alignment ⚡
• Risk profile matching 📊

We use AI and expert curation to ensure quality matches.`,
  buttonText: 'Continue'
}

const successStep = {
  title: 'Thank you! 🎉',
  description: 'Your profile has been submitted successfully',
  buttonText: 'Done'
}

const basicInfoQuestions: QuestionConfig[] = [
  {
    id: 'fullName',
    type: 'text',
    question: 'Your Full Name ✍️',
    description: 'As it appears on official documents',
    isRequired: true,
    placeholder: 'Enter your full name',
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'phone',
    type: 'phone',
    question: 'Phone Number 📱',
    description: 'Your preferred contact number',
    isRequired: true,
    placeholder: 'Enter your phone number'
  },
  {
    id: 'email',
    type: 'email',
    question: 'Email Address 📧',
    description: 'Your primary email for investment communications',
    isRequired: true,
    placeholder: 'Enter your email address',
  },
  {
    id: 'linkedin',
    type: 'url',
    question: 'LinkedIn Profile 🔗',
    description: 'Your professional LinkedIn profile',
    isRequired: true,
    placeholder: 'Enter your LinkedIn profile URL',
    validation: {
      pattern: "^https?://([a-z]{2,3}\\.)?linkedin\\.com/.*$"
    }
  }
]

const investmentPreferencesQuestions: QuestionConfig[] = [
  {
    id: 'investmentStages',
    type: 'multi-choice',
    question: 'Preferred Investment Stages 📈',
    description: 'Select all stages you are interested in',
    isRequired: true,
    options: STAGE_OPTIONS
  },
  {
    id: 'ticketSize',
    type: 'single-choice-multi',
    question: 'Typical Investment Ticket Size 💵',
    description: 'Your preferred investment amount per startup',
    isRequired: true,
    options: INVESTMENT_RANGE_OPTIONS
  },
  {
    id: 'annualInvestments',
    type: 'number',
    question: 'Annual Investment Capacity 📊',
    description: 'How many investments do you plan to make annually?',
    isRequired: true,
    placeholder: 'Enter number of planned investments per year',
    validation: {
      min: 1,
      max: 20
    }
  }
]

const industryPreferencesQuestions: QuestionConfig[] = [
  {
    id: 'primaryIndustries',
    type: 'multi-choice',
    question: 'Primary Industries of Interest 🏭',
    description: 'Select the main industries you want to invest in',
    isRequired: true,
    options: INDUSTRY_OPTIONS
  },
  {
    id: 'expertiseIndustries',
    type: 'multi-choice',
    question: 'Areas of Expertise 🎓',
    description: 'Select industries where you have deep expertise',
    isRequired: true,
    options: INDUSTRY_OPTIONS
  }
]

const geographicFocusQuestions: QuestionConfig[] = [
  {
    id: 'primaryMarkets',
    type: 'checkbox',
    question: 'Target Markets 🎯',
    description: 'Select your preferred investment regions',
    isRequired: true,
    options: INVESTMENT_REGION_OPTIONS
  },
  {
    id: 'remoteInvesting',
    type: 'single-choice-multi',
    question: 'Remote Investment Comfort 🌐',
    description: 'Are you comfortable investing in companies without meeting in person?',
    isRequired: true,
    options: REMOTE_PREFERENCE_OPTIONS
  }
]

const valueAddQuestions: QuestionConfig[] = [
  {
    id: 'expertise',
    type: 'multi-choice',
    question: 'Areas of Expertise 🧠',
    description: 'Select areas where you can provide significant value',
    isRequired: true,
    options: EXPERTISE_OPTIONS
  },
  {
    id: 'mentorship',
    type: 'single-choice-multi',
    question: 'Mentorship Availability ⭐',
    description: 'How much time can you dedicate to mentoring?',
    isRequired: true,
    options: MENTORSHIP_OPTIONS
  },
  {
    id: 'additionalValue',
    type: 'text',
    question: 'Additional Value Add 💫',
    description: 'Any other ways you can help portfolio companies?',
    isRequired: false,
    placeholder: 'Tell us about other ways you can help startups succeed',
    validation: {
      max_length: 1000
    }
  }
]

const angelInvestorInterestSteps: StepConfig[] = [
  // Step 2: Basic Information
  {
    id: 'basic_info',
    title: 'Basic Information 📝',
    description: "Let's get to know you better!",
    questions: basicInfoQuestions
  },
  // Step 3: Investment Preferences
  {
    id: 'investment_preferences',
    title: 'Investment Preferences 💰',
    description: "Tell us about your investment style and preferences",
    questions: investmentPreferencesQuestions
  },
  // Step 4: Industry Preferences
  {
    id: 'industry_preferences',
    title: 'Industry Focus 🎯',
    description: "Tell us which industries excite you the most",
    questions: industryPreferencesQuestions
  },
  // Step 5: Geographic Focus
  {
    id: 'geographic_focus',
    title: 'Geographic Focus 🌍',
    description: "Let's talk about where you want to invest",
    questions: geographicFocusQuestions
  },
  // Step 6: Value Add
  {
    id: 'value_add',
    title: 'Value Add 🎁',
    description: "How can you help your portfolio companies succeed?",
    questions: valueAddQuestions
  }
]

export const ANGEL_INVESTOR_INTEREST_FORM: FormConfig = {
  id: 'angel_investor_interest',
  title: 'Angel Investor Profile 👼',
  description: 'Help us match you with the perfect investment opportunities',
  steps: angelInvestorInterestSteps,
  successStep: successStep,
  introStep: introStep,
  redirectUrl: '/app/fundmatch'
}; 