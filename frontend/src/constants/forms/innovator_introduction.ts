import { FormConfig } from '../../types/form';

export const INNOVATOR_INTRODUCTION_FORM: FormConfig = {
  id: 'innovator_introduction',
  title: 'Tell Us About Your Venture',
  description: 'Help us understand your startup better! 🚀',
  steps: [
    // Step 1: Basic Personal Info
    {
      id: 'basic_personal_info',
      title: 'Basic Personal Information 👤',
      description: "Time for the official stuff! Let's make sure we've got all your details right. 📝",
      questions: [
        {
          id: 'fullName',
          type: 'text',
          title: "What's your full name? ✍️",
          description: "Enter your legal full name as it appears on official documents",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your legal full name",
          validation: {
            min_length: 2,
            max_length: 100
          }
        },
        {
          id: 'nationalId',
          type: 'text',
          title: "National ID Number (promise we'll keep it safe) 🔒",
          description: "Your national identification number helps us verify your identity",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your official ID number",
          validation: {
            min_length: 5,
            max_length: 20
          }
        },
        {
          id: 'phone',
          type: 'tel',
          title: "Best number to reach you 📱",
          description: "A phone number where we can contact you during business hours",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your contact phone number",
          validation: {
            pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$"
          }
        },
        {
          id: 'email',
          type: 'email',
          title: "Your email for good news ✉️",
          description: "Your primary email address for important communications",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your business email address",
          validation: {
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        }
      ]
    },
    // Step 2: Basic Company Info
    {
      id: 'basic_company_info',
      title: 'Company Information 🏢',
      description: "Let's get to know your venture better! Every great company has a story. 🚀",
      questions: [
        {
          id: 'companyNameEn',
          type: 'text',
          title: "Company Name in English ✨",
          description: "The official English name of your company",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your company name in English",
          validation: {
            min_length: 2,
            max_length: 100
          }
        },
        {
          id: 'companyUrl',
          type: 'url',
          title: "Your company's home on the web 🌐",
          description: "Your company's official website URL",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your company's website URL",
          validation: {
            pattern: "^https?://[\\w\\d.-]+\\.[a-zA-Z]{2,}(/\\S*)?$"
          }
        },
        {
          id: 'foundingYear',
          type: 'date',
          title: "When did the magic begin? 📅",
          description: "The date your company was officially established",
          value_type: 'date',
          required: true,
          multiple_entries: false,
          placeholder: "Enter the year your company was established",
          validation: {
            past_only: true
          }
        }
      ]
    },
    // Step 3: Founders
    {
      id: 'founders_info',
      title: 'Founders Information 👥',
      description: "Every superhero team needs its origin story! Tell us about your dream team. ⭐",
      questions: [
        {
          id: 'founderName',
          type: 'text',
          title: "Founder's name (the one on their coffee mug) ☕",
          description: "The founder's legal full name",
          value_type: 'text',
          required: true,
          multiple_entries: true,
          placeholder: "Enter founder's legal full name",
          validation: {
            min_length: 2,
            max_length: 100
          }
        },
        {
          id: 'shareholding',
          type: 'number',
          title: "Their slice of the pie (Share holding percentage) 🥧",
          description: "Percentage of shares owned by this founder",
          value_type: 'number',
          required: true,
          multiple_entries: true,
          placeholder: "Enter percentage of shares owned",
          validation: {
            min: 0,
            max: 100
          }
        },
        {
          id: 'nationalId',
          type: 'upload',
          title: "National ID Document 📄",
          description: "A clear scan of the founder's ID document",
          value_type: 'file',
          required: true,
          multiple_entries: true,
          placeholder: "Upload a clear scan of the ID document",
          validation: {}
        },
        {
          id: 'cv',
          type: 'upload',
          title: "Their story (CV) 📚",
          description: "The founder's current curriculum vitae",
          value_type: 'file',
          required: true,
          multiple_entries: true,
          placeholder: "Upload current CV in PDF format",
          validation: {}
        },
        {
          id: 'email',
          type: 'email',
          title: "Email Address 📧",
          description: "The founder's primary email address",
          value_type: 'text',
          required: true,
          multiple_entries: true,
          placeholder: "Enter founder's email address",
          validation: {
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        },
        {
          id: 'phone',
          type: 'tel',
          title: "Phone Number 📞",
          description: "The founder's contact phone number",
          value_type: 'text',
          required: true,
          multiple_entries: true,
          placeholder: "Enter founder's contact number",
          validation: {
            pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$"
          }
        }
      ]
    },
    // Step 4: Budget
    {
      id: 'budget_info',
      title: 'Budget Information 💰',
      description: "Let's talk numbers! We can help with up to 250,000 shekels to power your vision. 🚀",
      questions: [
        {
          id: 'amount',
          type: 'number',
          title: "How much funding are you asking for? 💸",
          description: "The amount of funding you're requesting",
          value_type: 'number',
          required: true,
          multiple_entries: false,
          placeholder: "Enter amount in shekels (maximum 250,000)",
          validation: {
            min: 0,
            max: 250000
          }
        },
        {
          id: 'desiredDate',
          type: 'date',
          title: "When would you like to receive the funding? 📅",
          description: "Your preferred funding date",
          value_type: 'date',
          required: true,
          multiple_entries: false,
          placeholder: "Enter your preferred date to receive funding",
          validation: {
            future_only: true
          }
        }
      ]
    },
    // Step 5: Team
    {
      id: 'team_info',
      title: 'Team Information 👥',
      description: "Who's helping you change the world? Tell us about your amazing team! ✨",
      questions: [
        {
          id: 'memberName',
          type: 'text',
          title: "Team Member Name (your world-changers) 🌟",
          description: "Full name of the team member",
          value_type: 'text',
          required: true,
          multiple_entries: true,
          placeholder: "Enter team member's full name",
          validation: {
            min_length: 2,
            max_length: 100
          }
        },
        {
          id: 'linkedin',
          type: 'url',
          title: "Their LinkedIn Profile (let's connect!) 🔗",
          description: "LinkedIn profile URL of the team member",
          value_type: 'text',
          required: true,
          multiple_entries: true,
          placeholder: "Enter team member's LinkedIn profile URL",
          validation: {
            pattern: "^https?://([a-z]{2,3}\\.)?linkedin\\.com/.*$"
          }
        }
      ]
    },
    // Step 6: Academic & IP
    {
      id: 'academic_ip',
      title: 'Academic & IP Information 🎓',
      description: "Let's protect those brilliant ideas of yours! 💡",
      questions: [
        {
          id: 'academicInquiry',
          type: 'radio',
          title: "Any academic / research / medical personal on board? 🔬",
          description: "Indicate if any team members are connected to academic institutions",
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['yes', 'no']
          }
        },
        {
          id: 'ipRightsVerification',
          type: 'radio',
          title: "Does your company violate any IP rights? ⚖️",
          description: "Confirm your IP compliance status",
          value_type: 'radio',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['yes', 'no']
          }
        },
        {
          id: 'ipRightsProtection',
          type: 'text',
          title: "How do you protect your brilliant ideas? 💡",
          description: "Describe your IP protection process",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "Describe your process for verifying IP rights and avoiding infringement",
          validation: {
            min_length: 10,
            max_length: 1000
          }
        },
        {
          id: 'openSourceDetails',
          type: 'text',
          title: "Are you using / developing any open-source code? 🔧",
          description: "Detail any open-source components in your project",
          value_type: 'text',
          required: true,
          multiple_entries: false,
          placeholder: "List any open-source code components used in your project",
          validation: {
            min_length: 10,
            max_length: 1000
          }
        }
      ]
    },
    // Step 7: Pitch Materials
    {
      id: 'pitch_materials',
      title: 'Pitch Materials 🎯',
      description: "Time to shine! Show us what makes your venture special ✨",
      questions: [
        {
          id: 'pitchDeck',
          type: 'upload',
          title: "Time to show off your vision! 📊",
          description: "Upload your pitch deck presentation",
          value_type: 'file',
          required: true,
          multiple_entries: false,
          placeholder: "Upload your pitch deck slides (PDF format preferred)",
          validation: {}
        },
        {
          id: 'pitchRecording',
          type: 'record',
          title: "Lights, Camera, Innovation! 🎥",
          description: "Record a 5-7 minute pitch that'll blow our minds!",
          value_type: 'file',
          required: true,
          multiple_entries: false,
          validation: {
            min_duration: 300,
            max_duration: 420
          }
        }
      ]
    },
    // Step 8: Additional Information
    {
      id: 'additional_info',
      title: 'Additional Information ➕',
      description: "Anything else that makes your venture unique? We're all ears! 👂",
      questions: [
        {
          id: 'otherText',
          type: 'text',
          title: "Got something else to share? 💭",
          description: "Share any additional information",
          value_type: 'text',
          required: false,
          multiple_entries: false,
          placeholder: "Anything else to add?",
          validation: {
            max_length: 2000
          }
        },
        {
          id: 'otherFiles',
          type: 'upload',
          title: "Any other documents to show us? 📎",
          description: "Upload any additional relevant documents",
          value_type: 'file',
          required: false,
          multiple_entries: true,
          placeholder: "Upload your docs (PDF format preferred)",
          validation: {}
        }
      ]
    }
  ],
  metadata: {
    product_id: 'pitch-to-grant',
    entity_type: 'innovator',
    version: '1.0'
  }
};