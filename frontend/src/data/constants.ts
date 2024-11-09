import type { ProtectedRouteConfig } from '../types/routing';

export const PUBLIC_ROUTES = {
  SIGN_IN: '/signin',
  ABOUT: '/about',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  LANDING: '/'
} as const;

export const PROTECTED_ROUTES = {
  PROFILE: '/profile',
  SETTINGS: '/settings',
  WAITLIST: '/waitlist',
  ENTITY_ONBOARDING: '/entity-onboarding',
  PITCH_TO_GRANT: '/pitch-to-grant',
  PITCH_TO_GRANT_ONBOARDING: '/pitch-to-grant-onboarding',
} as const;

// Define the state machine configuration
export const ROUTE_STATE_CONFIG: Record<string, ProtectedRouteConfig> = {
  PROFILE: {
    path: PROTECTED_ROUTES.PROFILE,
    requireAuth: true,
    stateName: 'profile',
    allowedPreviousStates: ['*'], // Can be accessed from anywhere if authenticated
  },
  ENTITY_ONBOARDING: {
    path: PROTECTED_ROUTES.ENTITY_ONBOARDING,
    requireAuth: true,
    stateName: 'entity_onboarding',
    allowedPreviousStates: ['profile', 'signin'],
  },
  PITCH_TO_GRANT: {
    path: PROTECTED_ROUTES.PITCH_TO_GRANT,
    requireAuth: true,
    stateName: 'pitch_to_grant',
    allowedPreviousStates: ['profile', 'pitch_to_grant_onboarding'],
  },
  PITCH_TO_GRANT_ONBOARDING: {
    path: PROTECTED_ROUTES.PITCH_TO_GRANT_ONBOARDING,
    requireAuth: true,
    stateName: 'pitch_to_grant_onboarding',
    allowedPreviousStates: ['entity_onboarding', 'profile'],
  },
  WAITLIST: {
    path: PROTECTED_ROUTES.WAITLIST,
    requireAuth: true,
    stateName: 'waitlist',
    allowedPreviousStates: ['*'],
  },
} as const;