// src/routes/constants.js
export const transaction_stage_mapping = {
    0: '/onboarding',
    1: '/grant',
    2: '/profile',
  };
  
  export const PUBLIC_ROUTES = {
    SIGN_IN: '/signin',
    ABOUT: '/about',
    TERMS: '/terms',
    PRIVACY: '/privacy',
    LANDING: '/'
  };
  
  export const PROTECTED_ROUTES = {
    PROFILE: '/profile',
    SETTINGS: '/settings',
    ...transaction_stage_mapping
  };