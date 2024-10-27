import { Question } from '../types/form';

export const questions: Question[] = [
  {
    id: 'basic_info',
    question: "Let's get to know you and your venture! 🚀",
    multiple_entries: false,
    type: 'dynamic',
    fields: [
      { id: 'fullName', type: 'text', label: "What's your full name?", placeholder: "Enter your legal full name", required: true },
      { id: 'nationalId', type: 'text', label: "National ID Number (promise we'll keep it safe)", placeholder: "Enter your official ID number", required: true },
      { id: 'companyName', type: 'text', label: "Your company's name (the one that'll be in headlines)", placeholder: "Enter your registered company name", required: true },
      { id: 'companyNameEn', type: 'text', label: "Company Name in English", placeholder: "Enter your company name in English", required: true },
      { id: 'companyUrl', type: 'url', label: "Your company's home on the web", placeholder: "Enter your company's website URL", required: true },
      { id: 'foundingYear', type: 'text', label: "When did the magic begin?", placeholder: "Enter the year your company was established", required: true },
      { id: 'address', type: 'text', label: "Where do you make innovation happen?", placeholder: "Enter your company's registered address", required: true },
      { id: 'phone', type: 'tel', label: "Best number to reach you", placeholder: "Enter your contact phone number", required: true },
      { id: 'email', type: 'email', label: "Your inbox for good news ✉️", placeholder: "Enter your business email address", required: true },
    ],
    guidelines: "Time for the official stuff! We need accurate information to help your venture grow.",
  },
  {
    id: 'founders',
    question: "Introduce us to your dream team! 👥",
    type: 'dynamic',
    maxEntries: 10,
    multiple_entries: true,

    fields: [
      { id: 'founderName', type: 'text', label: "Founder's name (the one on their coffee mug)", placeholder: "Enter founder's legal full name", required: true },
      { id: 'shareholding', type: 'number', label: "Their slice of the pie", placeholder: "Enter percentage of shares owned", required: true },
      { id: 'nationalId', type: 'upload', label: "National ID Document", placeholder: "Upload a clear scan of the ID document", required: true },
      { id: 'cv', type: 'upload', label: "Their story (CV)", placeholder: "Upload current CV in PDF format", required: true },
      { id: 'email', type: 'email', label: "Email Address", placeholder: "Enter founder's email address", required: true },
      { id: 'phone', type: 'tel', label: "Phone Number", placeholder: "Enter founder's contact number", required: true },
    ],
    guidelines: "Add details for each founder - every superhero team needs its origin story! (Up to 10 founders)",
  },
  {
    id: 'budget',
    question: "Let's talk numbers! 💰",
    type: 'dynamic',
    multiple_entries: false,

    fields: [
      {
        id: 'amount',
        type: 'number',
        label: "How much fuel does your rocket need?",
        placeholder: "Enter amount in shekels (maximum 250,000)",
        required: true,
      },
      {
        id: 'desiredDate',
        type: 'text',
        label: "When would you like the launch countdown to begin?",
        placeholder: "Enter your preferred date to receive funding",
        required: true,
      },
    ],
    validation: {
      max: 250000,
    },
    guidelines: "Let's be clear about the budget - we can help with up to 250,000 shekels to power your vision.",
  },
  {
    id: 'team',
    question: "Who's helping you change the world? 🌟",
    type: 'dynamic',
    multiple_entries: true,

    maxEntries: 20,
    fields: [
      { id: 'memberName', type: 'text', label: "Team Member Name", placeholder: "Enter team member's full name", required: true },
      { id: 'linkedin', type: 'url', label: "Their LinkedIn Profile", placeholder: "Enter team member's LinkedIn profile URL", required: true },
    ],
    guidelines: "Tell us about the talented people who make the magic happen (up to 20 team members).",
  },
  {
    id: 'academic',
    question: "Any academic wizards on board? 🎓",
    type: 'radio',
    multiple_entries: false,

    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    guidelines: "Let us know if any of your team members are connected to academic or research institutions.",
  },
  {
    id: 'ip_verify',
    question: "Does your company violate any IP rights?",
    multiple_entries: false,

    type: 'radio',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
    guidelines: "Confirm whether your company's activities might affect existing intellectual property rights.",
  },
  {
    id: 'ip_rights',
    question: "How do you protect your brilliant ideas? 💡",
    multiple_entries: false,

    type: 'text',
    placeholder: "Describe your process for verifying IP rights and avoiding infringement",
    guidelines: "Explain how you ensure your innovations don't overlap with existing intellectual property.",
  },
  {
    id: 'openSourceDetails',
    question: "Are you using / developing any open-source code? 🔧",
    multiple_entries: false,

    placeholder: "List any open-source code components used in your project, or indicate if none are used",
    type: 'text',
    guidelines: "Tell us about any open-source components that help power your project.",
  },
  {
    id: 'pitch_deck',
    question: "Time to show off your vision! 📊",
    multiple_entries: false,

    type: 'upload',
    placeholder: "Upload your pitch deck slides (PDF format preferred)",
    guidelines: "Share your pitch deck - make it shine, but keep it real.",
  },
  {
    id: 'pitch_recording',
    question: "Lights, Camera, Innovation! 🎥",
    type: 'record',
    multiple_entries: false,

    allowUpload: true,
    guidelines: `Help us understand your vision better! Please cover these key points:

• The Problem
• Uniqueness and Innovation
• Technology Details
• Team
  - Skills
  - Employees, advisors, contractors
• Validation Process
  - Process details
  - Feedback received
• Business Model
  - Product
  - Product-Market Fit
  - Offering details
• Roadmap
  - R&D roadmap status
  - Non-R&D roadmap
  - Business roadmap
• Current Status
  - R&D progress
  - Venture status
  - Traction
  - LOIs
  - Customers
  - Revenue
  - Partnerships
• Market Analysis (TAM/SAM/SOM)
• Competitive Landscape
• IP Status
  - Personal/institutional IP issues
  - Research for legal coverage
  - Existing IP
  - Open-source code status`,
  },
];

export default questions;