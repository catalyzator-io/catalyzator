import { FormConfig } from '../../types/form';
import { 
  INDUSTRY_LABELS,
  STAGE_LABELS,
  createOptions 
} from '../../types/investor';

const INDUSTRY_OPTIONS = createOptions(INDUSTRY_LABELS);
const STAGE_OPTIONS = createOptions(STAGE_LABELS);

export const FUNDMATCH_INNOVATOR_FORM: FormConfig = {
  id: 'fundmatch_innovator',
  title: 'Grant Matching Profile 🤝',
  description: 'Help us find investors to match your grant requirements!',
  steps: [
    // Step 1: Introduction to Grant Matching
    {
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
      questions: []
    },
    // Step 3: Company Profile
    {
      id: 'company_profile',
      title: 'Company Profile 🏢',
      description: "Help investors understand your venture",
      questions: [
        {
          id: 'industries',
          type: 'checkbox',
          title: 'Industry Focus 🎯',
          description: 'Select your primary industries (max 3)',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: INDUSTRY_OPTIONS,
            min_selections: 1,
            max_selections: 3
          }
        },
        {
          id: 'stage',
          type: 'radio',
          title: 'Current Stage 📈',
          description: 'What stage is your company at?',
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: STAGE_OPTIONS
          }
        },
        {
          id: 'grantReadiness',
          type: 'textarea',
          title: 'Grant Readiness 📝',
          description: 'Briefly describe your readiness for the grant',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Describe your technology readiness, team capabilities, and why you\'re a good fit for the grant',
          validation: {
            min_length: 100,
            max_length: 1000
          }
        }
      ]
    }
  ],
  metadata: {
    product_id: 'fundmatch',
    entity_type: 'innovator',
    version: '1.0'
  }
}; 