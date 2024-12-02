import { FormConfig, QuestionConfig, StepConfig } from '../../types/form';


const introStep = {
  title: 'Welcome to Pitch2Grant! 🧭',
  message: `Let Pitch2Grant streamline your grant applications! Here's how it works:

📝 Answer detailed questions about your startup – Founders, team, idea, IP rights, and more!
📂 Upload key materials – Pitch deck, pitch recording, and other essentials.
🤖 AI simplifies the process – Automatically organizes your responses into a polished grant application.
⏱️ Submit in minutes – Say goodbye to tedious forms and repetitive work.
🚀 Focus on innovation – Leave the paperwork to us while you grow your startup.
`,
  buttonText: 'Fund me!'
}

const successStep = {
  id: 'innovator_introduction_success',
  title: 'Success! 🎉',
  message: `We will review your profile and get back to you shortly!`,
  buttonText: 'Done'
}

const basicPersonalInfoQuestions: QuestionConfig[] = [
  {
    id: 'fullName',
    type: 'text',
    question: "What's your full name? ✍️",
    description: "Enter your legal full name as it appears on official documents",
    isRequired: true,
    placeholder: "Enter your legal full name",
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'nationalId',
    type: 'text',
    question: "National ID Number (promise we'll keep it safe) 🔒",
    description: "Your national identification number helps us verify your identity",
    isRequired: true,
    placeholder: "Enter your official ID number",
    validation: {
      min_length: 5,
      max_length: 20
    }
  },
  {
    id: 'phone',
    type: 'phone',
    question: "Best number to reach you 📱",
    description: "A phone number where we can contact you during business hours",
    isRequired: true,
    placeholder: "Enter your contact phone number"
  },
  {
    id: 'email',
    type: 'email',
    question: "Your email for good news 📧",
    description: "Your primary email address for important communications",
    isRequired: true,
    placeholder: "Enter your business email address"
  }
]

const companyProfileQuestions: QuestionConfig[] = [
  {
    id: 'companyNameEn',
    type: 'text',
    question: "Company Name in English ✨",
    description: "The official English name of your company",
    isRequired: true,
    placeholder: "Enter your company name in English",
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'companyUrl',
    type: 'url',
    question: "Your company's home on the web 🌐",
    description: "Your company's official website URL",
    isRequired: false,
    placeholder: "Enter your company's website URL"
  },
  {
    id: 'foundingYear',
    type: 'date',
    question: "When did the magic begin? 📅",
    description: "The date your company was officially established",
    isRequired: true,
    placeholder: "Enter the year your company was established",
    validation: {
      past_only: true
    }
  }
]

const foundersQuestions: QuestionConfig[] = [
  {
    id: 'founderName',
    type: 'text',
    question: "Founder's name (the one on their coffee mug) ☕",
    description: "The founder's legal full name",
    isRequired: true,
    placeholder: "Enter founder's legal full name",
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'shareholding',
    type: 'number',
    question: "Their slice of the pie (Share holding percentage) 🥧",
    description: "Percentage of shares owned by this founder",
    isRequired: true,
    placeholder: "Enter percentage of shares owned",
    validation: {
      min: 0,
      max: 100
    }
  },
  {
    id: 'nationalId',
    type: 'file',
    question: "National ID Document 📄",
    description: "A clear scan of the founder's ID document",
    isRequired: true,
    placeholder: "Upload a clear scan of the ID document",
    validation: {
      file: {
        allowedTypes: ['pdf', 'jpg', 'jpeg', 'png']
      }
    }
  },
  {
    id: 'cv',
    type: 'file',
    question: "Their story (CV) 📚",
    description: "The founder's current curriculum vitae",
    isRequired: true,
    placeholder: "Upload current CV in PDF format",
    validation: {
      file: {
        allowedTypes: ['pdf']
      }
    }
  },
  {
    id: 'email',
    type: 'email',
    question: "Email Address 📧",
    description: "The founder's primary email address",
    isRequired: true,
    placeholder: "Enter founder's email address"
  },
  {
    id: 'phone',
    type: 'phone',
    question: "Phone Number 📞",
    description: "The founder's contact phone number",
    isRequired: true,
    placeholder: "Enter founder's contact number"
  }
]

const budgetQuestions: QuestionConfig[] = [
  {
    id: 'amount',
    type: 'number',
    question: "How much funding are you asking for? (max 250,000 shekels) 💸",
    description: "The amount of funding you're requesting",
    isRequired: true,
    placeholder: "Enter amount in shekels (maximum 250,000)",
    validation: {
      min: 0,
      max: 250000
    }
  },
  {
    id: 'desiredDate',
    type: 'date',
    question: "When would you like to receive the funding? 📅",
    description: "Your preferred funding date",
    isRequired: true,
    placeholder: "Enter your preferred date to receive funding",
    validation: {
      future_only: true
    }
  }
]

const teamQuestions: QuestionConfig[] = [
  {
    id: 'memberName',
    type: 'text',
    question: "Team Member Name (your world-changers) 🌟",
    description: "Full name of the team member",
    isRequired: true,
    placeholder: "Enter team member's full name",
    validation: {
      min_length: 2,
      max_length: 100
    }
  },
  {
    id: 'linkedin',
    type: 'url',
    question: "Their LinkedIn Profile (let's connect!) 🔗",
    description: "LinkedIn profile URL of the team member",
    isRequired: true,
    placeholder: "Enter team member's LinkedIn profile URL",
    validation: {
      pattern: "^https?://([a-z]{2,3}\\.)?linkedin\\.com/.*$"
    }
  }
]

const academicIpQuestions: QuestionConfig[] = [
  {
    id: 'academicInquiry',
    type: 'single-choice-multi',
    question: "Any academic / research / medical personal on board? 🔬",
    description: "Indicate if any team members are connected to academic institutions",
    isRequired: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'ipRightsVerification',
    type: 'single-choice-multi',
    question: "Does your company violate any IP rights? ⚖️",
    description: "Confirm your IP compliance status",
    isRequired: true,
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    id: 'ipRightsProtection',
    type: 'text',
    question: "How do you protect your brilliant ideas? 💡",
    description: "Describe your IP protection process",
    isRequired: true,
    placeholder: "Describe your process for verifying IP rights and avoiding infringement",
    validation: {
      minLength: 10,
      maxLength: 1000
    }
  },
  {
    id: 'openSourceDetails',
    type: 'text',
    question: "Are you using / developing any open-source code? 🔧",
    description: "Detail any open-source components in your project",
    isRequired: true,
    placeholder: "List any open-source code components used in your project",
    validation: {
      minLength: 10,
      maxLength: 1000
    }
  }
]


const pitchDeckQuestions: QuestionConfig[] = [
  {
    id: 'pitchDeck',
    type: 'file', 
    question: "Time to show off your vision! 📊",
    description: "Upload your pitch deck presentation",
    isRequired: true,
    validation: {
      file: {
        allowedTypes: ['pdf', 'ppt', 'pptx', 'doc', 'docx']
      }
    }
  }
]



const pitchRecordingQuestions: QuestionConfig[] = [

  {
    id: 'pitchRecording',
    type: 'audio',
    question: "Lights, Camera, Innovation! 🎥",
    description: "Record a 5-7 minute pitch that'll blow our minds!",
    isRequired: false,
    validation: {
      media: {
        maxDuration: 420 // 7 minutes
      }
    }
  },
  {
    id: 'pitchVideoUpload',
    type: 'file',
    question: "You can also upload your pitch recording 🎥",
    description: "Upload a 5-7 minute pitch that'll blow our minds!",
    isRequired: false,
    validation: {
      file: {
        allowedTypes: ['mp4', 'mp3', 'wav']
      }
    }
  }
]

const additionalInfoQuestions: QuestionConfig[] = [
  {
    id: 'otherText',
    type: 'text',
    question: "Got something else to share? 💭",
    description: "Share any additional information",
    isRequired: false,
    placeholder: "Anything else to add?",
    validation: {
      maxLength: 2000
    }
  },
  {
    id: 'otherFiles',
    type: 'file',
    question: "Any other documents to show us? 📎",
    description: "Upload any additional relevant documents",
    isRequired: false,
    validation: {
      file: {}
    }
  }
]

const steps: StepConfig[] = [
  // Step 1: Basic Personal Info
  {
    id: 'basic_personal_info',
    title: 'Basic Personal Information 👤',
    description: "Time for the official stuff! Let's make sure we've got all your details right. 📝",
    questions: basicPersonalInfoQuestions
  },
  // Step 2: Basic Company Info
  {
    id: 'basic_company_info',
    title: 'Company Information 🏢',
    description: "Let's get to know your venture better! Every great company has a story. 🚀",
    questions: companyProfileQuestions
  },
  // Step 3: Founders
  {
    id: 'founders_info',
    title: 'Founders Information 👥',
    description: "Every superhero team needs its origin story! Tell us about your founders. ⭐",
    questions: [
      {
        id: 'founders',
        type: 'question-group',
        question: 'Who is your dream team? 🌟',
        description: 'Please provide information about all your founders. ',
        isRequired: true,
        groupConfig: {
          questions: foundersQuestions,
          maxEntries: 5,
          minEntries: 1
        }
      }
    ]
  },
  // Step 4: Budget
  {
    id: 'budget_info',
    title: 'Budget Information 💰',
    description: "Let's talk numbers! We can help with up to 250,000 shekels to power your vision. 🚀",
    questions: budgetQuestions
  },
  // Step 5: Team
  {
    id: 'team_info',
    title: 'Team Information 👥',
    description: "Who's helping you change the world? Tell us about your amazing team! ✨",
    questions: [
      {
        id: 'team',
        type: 'question-group',
        question: 'Team Members (your world-changers) 🌟',
        description: 'List of team members',
        isRequired: true,
        groupConfig: {
          questions: teamQuestions,
          maxEntries: 20,
          minEntries: 1
        }
      }
    ]
  },
  // Step 6: Academic & IP
  {
    id: 'academic_ip',
    title: 'Academic & IP Information 🎓',
    description: "Let's protect those brilliant ideas of yours! 💡",
    questions: academicIpQuestions
  },
  // Step 7: Pitch Materials
  {
    id: 'pitch_materials',
    title: 'Pitch Materials 🎯',
    description: "Upload Your Pitch Deck Presentation ✨",
    questions: pitchDeckQuestions
  },
  // Step 8: Pitch Recording Guide
  {
    id: 'pitch_recording_guide',
    title: 'The next step in this form is to record your pitch, please follow the guide below 🎯',
    description: `📍 The Problem
💡 Uniqueness & Innovation
🔧 Technology Details
👥 Team – Skills, Employees, Advisors, Contractors
✅ Validation Process – Process Details, Feedback Received
💼 Business Model – Product, Product-Market Fit, Offering Details
🛣️ Roadmap – R&D Status, Non-R&D Roadmap, Business Roadmap
📊 Current Status – R&D Progress, Venture Status, Traction, LOIs, Customers, Revenue, Partnerships
🌍 Market Analysis (TAM/SAM/SOM)
⚔️ Competitive Landscape
🛡️ IP Status – Personal/Institutional IP Issues, Research for Legal Coverage, Existing IP, Open-Source Code Status`,
    questions: []
  },
  // Step 9: Pitch Recording 
  {
    id: 'pitch_recording',
    title: 'Pitch Recording 🎯',
    description: "Give your ultimate pitch! 🎯 Don`t forget to include all the details!",
    questions: pitchRecordingQuestions
  },
  // Step 8: Additional Information
  {
    id: 'additional_info',
    title: 'Additional Information ➕',
    description: "Anything else that makes your venture unique? We're all ears! 👂",
    questions: additionalInfoQuestions
  },
  {
    id: 'none',
    title: 'None Information ➕',
    description: "Anything else that makes your venture unique? We're all ears! 👂",
    questions: additionalInfoQuestions
  }
]

export const INNOVATOR_INTRODUCTION_FORM: FormConfig = {
  id: 'innovator_introduction',
  title: 'Tell Us About Your Venture',
  description: 'Help us understand your startup better! 🚀',
  steps: steps,
  introStep: introStep,
  successStep: successStep,
};
