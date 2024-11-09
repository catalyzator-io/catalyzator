export const PUBLIC_ROUTES = {
  LANDING: '/',
  SIGN_IN: '/auth?action=signin',
  SIGN_UP: '/auth?action=signup',
  ABOUT: '/about',
} as const;

export const PROTECTED_ROUTES = {
  APP_HOME: '/app',
  ONBOARDING: '/onboarding',
  PROFILE: '/app/profile',
  PITCH_TO_GRANT: '/pitch-to-grant',
  WAITLIST: '/waitlist/productId'
} as const;

export const ROUTE_STATE_CONFIG = {
  onboarding: {
    path: PROTECTED_ROUTES.ONBOARDING,
    allowedTransitions: ['home']
  },
  home: {
    path: PROTECTED_ROUTES.APP_HOME,
    allowedTransitions: ['profile', 'pitch_to_grant']
  },
  profile: {
    path: PROTECTED_ROUTES.PROFILE,
    allowedTransitions: ['home', 'pitch_to_grant']
  },
  pitch_to_grant: {
    path: PROTECTED_ROUTES.PITCH_TO_GRANT,
    allowedTransitions: ['home', 'profile']
  },
  waitlist: {
    path: PROTECTED_ROUTES.WAITLIST,
    allowedTransitions: ['home', 'profile']
  }
} as const; 
