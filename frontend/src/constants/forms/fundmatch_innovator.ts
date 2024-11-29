import { FormConfig, Option, QuestionConfig } from '../../types/form';
import { 
  INDUSTRY_LABELS,
  STAGE_LABELS,
  createOptions 
} from '../../types/investor';

const INDUSTRY_OPTIONS: Option[] = createOptions(INDUSTRY_LABELS);
const STAGE_OPTIONS: Option[] = createOptions(STAGE_LABELS);

const introStep = {
  id: 'grant_matching_intro',
  title: 'Welcome to Grant Matching! 🌟',
  description: `Get matched with investors for your grant requirements:

• Grant Matching Support 🎯
  We help find investors to match government grant requirements

• Pre-Approval System ⭐
  Angels can commit before your grant application

• Smart Matching 🤖
  Our AI finds investors who match your grant's conditions

• Higher Success Rate 📈
  Increase your chances of grant approval with secured matching`,
  buttonText: 'Start',
}

const successStep = {
  id: 'grant_matching_success',
  title: 'Success! 🎉',
  description: `We will review your profile and get back to you shortly!`,
  buttonText: 'Done'
}

const companyProfileQuestions: QuestionConfig[] = [
  {
    id: 'industries',
    type: 'multi-choice',
    question: 'Industry Focus 🎯',
    description: 'Select your primary industries (max 3)',
    isRequired: true,
    options: INDUSTRY_OPTIONS,
    validation: {
      minSelections: 1,
      maxSelections: 3
    }
  },
  {
    id: 'stage',
    type: 'single-choice-multi',
    question: 'Current Stage 📈',
    description: 'What stage is your company at?',
    isRequired: true,
    options: STAGE_OPTIONS
  },
  {
    id: 'grantReadiness',
    type: 'rich-text',
    question: 'Grant Readiness 📝',
    description: 'Briefly describe your readiness for the grant',
    placeholder: 'Describe your technology readiness, team capabilities, and why you\'re a good fit for the grant',
    isRequired: true,
    validation: {
      minLength: 100,
      maxLength: 1000
    }
  }
]

export const FUNDMATCH_INNOVATOR_FORM: FormConfig = {
  id: 'fundmatch_innovator',
  title: 'Grant Matching Profile 🤝',
  description: 'Help us find investors to match your grant requirements!',
  steps: [
    {
      id: 'company_profile',
      title: 'Company Profile 🏢',
      description: "Help investors understand your venture",
      questions: companyProfileQuestions
    }
  ],
  successStep: successStep,
  introStep: introStep,
}; 
