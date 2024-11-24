import { FormConfig } from '../../types/form';

export const USER_CONSENT_FORM: FormConfig = {
  id: 'user_consent',
  title: 'Welcome to Catalyzator! 🎉',
  description: 'Before we begin your innovation journey, please review and accept our terms',
  steps: [
    {
      id: 'platform_terms',
      title: 'Platform Terms & Conditions 📜',
      description: "Let's make sure we're on the same page about how Catalyzator works",
      questions: [
        {
          id: 'platformTerms',
          type: 'checkbox',
          title: 'Platform Terms & Conditions Agreement 📋',
          description: 'Please review our platform terms and conditions carefully',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I have read and agree to Catalyzator's Terms & Conditions"
        },
        {
          id: 'privacyPolicy',
          type: 'checkbox',
          title: 'Privacy Policy Consent 🔒',
          description: 'Your privacy and data protection are our priority',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I have read and agree to Catalyzator's Privacy Policy"
        }
      ]
    },
    {
      id: 'product_terms',
      title: 'Product Terms 🛠️',
      description: "Each of our products has specific terms you should know about",
      questions: [
        {
          id: 'fundmatchTerms',
          type: 'checkbox',
          title: 'FundMatch Terms 💰',
          description: 'Terms specific to our funding matching service',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I understand and agree to FundMatch's specific terms and success fees"
        },
        {
          id: 'compassTerms',
          type: 'checkbox',
          title: 'Compass Terms 🧭',
          description: 'Terms specific to our grant recommendation service',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I understand and agree to Compass's specific terms and conditions"
        },
        {
          id: 'pitchToGrantTerms',
          type: 'checkbox',
          title: 'Pitch-to-Grant Terms 🎯',
          description: 'Terms specific to our grant application service',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I understand and agree to Pitch-to-Grant's specific terms and conditions"
        }
      ]
    },
    {
      id: 'data_and_communications',
      title: 'Data Usage & Communications 📊',
      description: "Help us serve you better by managing your data and communication preferences",
      questions: [
        {
          id: 'dataProcessing',
          type: 'checkbox',
          title: 'Data Processing Agreement 💾',
          description: 'How we process and protect your data across our platform',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I agree to Catalyzator processing my data as described in the privacy policy"
        },
        {
          id: 'dataSharing',
          type: 'checkbox',
          title: 'Data Sharing Consent 🤝',
          description: 'Allow us to share your data between our products for better service',
          value_type: 'checkbox',
          required: true,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I agree to my data being shared between Catalyzator's products"
        },
        {
          id: 'marketing',
          type: 'checkbox',
          title: 'Marketing Communications 📧',
          description: 'Stay updated with our latest products, features, and opportunities',
          value_type: 'checkbox',
          required: false,
          multiple_entries: false,
          validation: {
            options: ['accepted']
          },
          placeholder: "I would like to receive marketing communications from Catalyzator"
        }
      ]
    }
  ],
  metadata: {
    product_id: 'platform',
    entity_type: 'user',
    version: '1.0'
  }
}; 