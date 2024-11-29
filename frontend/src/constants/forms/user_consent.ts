import { StepConfig, FormConfig, QuestionConfig } from '../../types/form';

const platformTermsQuestions: QuestionConfig[] = [
  {
    id: 'platformTerms',
    question: "I have read and agree to Catalyzator's Terms & Conditions",
    description: 'Please review our platform terms and conditions carefully',
    type: 'checkbox',
    isRequired: true,
  }
]

const privacyPolicyQuestions: QuestionConfig[] = [
  {
    id: 'privacyPolicy',
    question: "I have read and agree to Catalyzator's Privacy Policy",
    description: 'Your privacy and data protection are our priority',
    type: 'checkbox',
    isRequired: true,
  },
  {
    id: 'dataProcessing',
    question: "I agree to Catalyzator processing my data as described in the privacy policy",
    description: 'How we process and protect your data across our platform',
    type: 'checkbox',
    isRequired: true,
  }
]

const customerAgreementQuestions: QuestionConfig[] = [
  {
    id: 'customerAgreement',
    question: "I have read and agree to Catalyzator's Customer Agreement",
    description: 'Terms specific to our customer agreement',
    type: 'checkbox',
    isRequired: true,
  }
]

const USER_CONSENT_FORM_STEPS: StepConfig[] = [
  {
    id: 'platform_terms',
    title: 'Platform Terms & Conditions 📜',
    description: "Let's make sure we're on the same page about how Catalyzator works",
    questions: platformTermsQuestions
  },
  {
    id: 'privacy_policy',
    title: 'Privacy Policy Consent 🔒',
    description: 'Your privacy and data protection are our priority',
    questions: privacyPolicyQuestions
  },
  {
    id: 'customer_agreement',
    title: 'Customer Agreement 📄',
    description: "Each of our products has specific terms you should know about",
    questions: customerAgreementQuestions
  }
]

export const USER_CONSENT_FORM: FormConfig = {
  id: 'user_consent',
  title: 'Welcome to Catalyzator! 🎉',
  description: 'Before we begin your innovation journey, please review and accept our terms',
  steps: USER_CONSENT_FORM_STEPS,
  introStep: {
    title: 'Welcome to Catalyzator! 🎉',
    message: 'Before we begin your innovation journey, please review and accept our terms',
    buttonText: 'Continue'
  },
  successStep: {
    title: 'Terms Accepted! 🎉',
    message: 'You have successfully accepted our terms and can now access all features.',
    buttonText: 'Continue'
  },
}; 
