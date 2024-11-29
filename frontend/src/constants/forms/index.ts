import { FormConfig } from '../../types/form';
import { ANGEL_INVESTOR_INTEREST_FORM } from './angel_investor_interest';
import { ENTITY_REGISTRATION_FORM } from './entity_registration';
import { FUNDMATCH_INNOVATOR_FORM } from './fundmatch_innovator';
import { INNOVATOR_INTRODUCTION_FORM } from './innovator_introduction';
import { PAST_APPLICATIONS_FORM } from './past_applications';
import { USER_CONSENT_FORM } from './user_consent';

export const FORM_CONFIGS: Record<string, { conf: FormConfig, url: string }> = {
  'angel_investor_interest': { conf: ANGEL_INVESTOR_INTEREST_FORM, url: '/form/angel' },
  'entity_registration': { conf: ENTITY_REGISTRATION_FORM, url: '/form/registration' },
  'fundmatch_innovator': { conf: FUNDMATCH_INNOVATOR_FORM, url: '/form/fundmatch-innovator' },
  'innovator_introduction': { conf: INNOVATOR_INTRODUCTION_FORM, url: '/form/innovator' },
  'past_applications': { conf: PAST_APPLICATIONS_FORM, url: '/form/compass' },
  'user_consent': { conf: USER_CONSENT_FORM, url: '/form/consent' },
}; 

