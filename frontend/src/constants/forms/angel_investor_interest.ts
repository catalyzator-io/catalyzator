import { FormConfig, Option } from '../../types/form';
import { 
  STAGE_LABELS,
  INDUSTRY_LABELS,
  INVESTMENT_RANGE_LABELS,
  EXPERTISE_LABELS,
  MENTORSHIP_LEVEL_LABELS,
  REMOTE_PREFERENCE_LABELS,
  INVESTMENT_REGION_LABELS,
  createOptions
} from '../../types/investor';

// Create options from the label constants
const STAGE_OPTIONS: Option[] = createOptions(STAGE_LABELS);
const INDUSTRY_OPTIONS: Option[] = createOptions(INDUSTRY_LABELS);
const INVESTMENT_RANGE_OPTIONS: Option[] = createOptions(INVESTMENT_RANGE_LABELS);
const EXPERTISE_OPTIONS: Option[] = createOptions(EXPERTISE_LABELS);
const MENTORSHIP_OPTIONS: Option[] = createOptions(MENTORSHIP_LEVEL_LABELS);
const REMOTE_PREFERENCE_OPTIONS: Option[] = createOptions(REMOTE_PREFERENCE_LABELS);
const INVESTMENT_REGION_OPTIONS: Option[] = createOptions(INVESTMENT_REGION_LABELS);

export const ANGEL_INVESTOR_INTEREST_FORM: FormConfig = {
  id: 'angel_investor_interest',
  title: 'Angel Investor Profile 👼',
  description: 'Help us match you with the perfect investment opportunities',
  steps: [
    // Step 1: Information about FundMatch
    {
      id: 'fundmatch_info',
      title: 'Welcome to FundMatch! 🤝',
      description: `Before we begin, here's how we create perfect matches
Our intelligent matching system connects angels with promising startups based on:

• Industry expertise alignment 🎯
• Investment preferences match 💰
• Geographic focus compatibility 🌍
• Stage and sector alignment ⚡
• Risk profile matching 📊

We use AI and expert curation to ensure quality matches.`,
      questions: []
    },
    // Step 2: Basic Information
    {
      id: 'basic_info',
      title: 'Basic Information 📝',
      description: "Let's get to know you better!",
      questions: [
        {
          id: 'fullName',
          type: 'text',
          title: 'Your Full Name ✍️',
          description: 'As it appears on official documents',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter your full name',
          validation: {
            min_length: 2,
            max_length: 100
          }
        },
        {
          id: 'phone',
          type: 'tel',
          title: 'Phone Number 📱',
          description: 'Your preferred contact number',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter your phone number',
          validation: {
            pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$"
          }
        },
        {
          id: 'email',
          type: 'email',
          title: 'Email Address 📧',
          description: 'Your primary email for investment communications',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter your email address',
          validation: {
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        },
        {
          id: 'linkedin',
          type: 'url',
          title: 'LinkedIn Profile 🔗',
          description: 'Your professional LinkedIn profile',
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter your LinkedIn profile URL',
          validation: {
            pattern: "^https?://([a-z]{2,3}\\.)?linkedin\\.com/.*$"
          }
        }
      ]
    },
    // Step 3: Investment Preferences
    {
      id: 'investment_preferences',
      title: 'Investment Preferences 💰',
      description: "Tell us about your investment style and preferences",
      questions: [
        {
          id: 'investmentStages',
          type: 'checkbox',
          title: 'Preferred Investment Stages 📈',
          description: 'Select all stages you are interested in',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: STAGE_OPTIONS
          }
        },
        {
          id: 'ticketSize',
          type: 'radio',
          title: 'Typical Investment Ticket Size 💵',
          description: 'Your preferred investment amount per startup',
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: INVESTMENT_RANGE_OPTIONS
          }
        },
        {
          id: 'annualInvestments',
          type: 'number',
          title: 'Annual Investment Capacity 📊',
          description: 'How many investments do you plan to make annually?',
          value_type: 'number',
          required: true,
          multiple_entries: false,
          placeholder: 'Enter number of planned investments per year',
          validation: {
            min: 1,
            max: 100
          }
        }
      ]
    },
    // Step 4: Industry Preferences
    {
      id: 'industry_preferences',
      title: 'Industry Focus 🎯',
      description: "Tell us which industries excite you the most",
      questions: [
        {
          id: 'primaryIndustries',
          type: 'checkbox',
          title: 'Primary Industries of Interest 🏭',
          description: 'Select the main industries you want to invest in',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: INDUSTRY_OPTIONS
          }
        },
        {
          id: 'expertiseIndustries',
          type: 'checkbox',
          title: 'Areas of Expertise 🎓',
          description: 'Select industries where you have deep expertise',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: INDUSTRY_OPTIONS
          }
        }
      ]
    },
    // Step 5: Geographic Focus
    {
      id: 'geographic_focus',
      title: 'Geographic Focus 🌍',
      description: "Let's talk about where you want to invest",
      questions: [
        {
          id: 'primaryMarkets',
          type: 'checkbox',
          title: 'Target Markets 🎯',
          description: 'Select your preferred investment regions',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: INVESTMENT_REGION_OPTIONS
          }
        },
        {
          id: 'remoteInvesting',
          type: 'radio',
          title: 'Remote Investment Comfort 🌐',
          description: 'Are you comfortable investing in companies without meeting in person?',
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: REMOTE_PREFERENCE_OPTIONS
          }
        }
      ]
    },
    // Step 6: Value Add
    {
      id: 'value_add',
      title: 'Value Add 🎁',
      description: "How can you help your portfolio companies succeed?",
      questions: [
        {
          id: 'expertise',
          type: 'checkbox',
          title: 'Areas of Expertise 🧠',
          description: 'Select areas where you can provide significant value',
          value_type: 'checkbox',
          required: true,
          multiple_entries: true,
          validation: {
            options: EXPERTISE_OPTIONS
          }
        },
        {
          id: 'mentorship',
          type: 'radio',
          title: 'Mentorship Availability ⭐',
          description: 'How much time can you dedicate to mentoring?',
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: MENTORSHIP_OPTIONS
          }
        },
        {
          id: 'additionalValue',
          type: 'text',
          title: 'Additional Value Add 💫',
          description: 'Any other ways you can help portfolio companies?',
          value_type: 'text',
          required: false,
          multiple_entries: false,
          placeholder: 'Tell us about other ways you can help startups succeed',
          validation: {
            max_length: 1000
          }
        }
      ]
    }
  ],
  metadata: {
    product_id: 'fundmatch',
    entity_type: 'investor',
    version: '1.0',
  }
}; 