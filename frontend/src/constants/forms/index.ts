import { FormConfig } from '../../types/form';
import { ANGEL_INVESTOR_INTEREST_FORM } from './angel_investor_interest';
import { ENTITY_REGISTRATION_FORM } from './entity_registration';
import { FUNDMATCH_INNOVATOR_FORM } from './fundmatch_innovator';
import { INNOVATOR_INTRODUCTION_FORM } from './innovator_introduction';
import { PAST_APPLICATIONS_FORM } from './past_applications';
import { USER_CONSENT_FORM } from './user_consent';

export const FORM_CONFIGS: Record<string, FormConfig> = {
  'angel_investor_interest': ANGEL_INVESTOR_INTEREST_FORM,
  'entity_registration': ENTITY_REGISTRATION_FORM,
  'fundmatch_innovator': FUNDMATCH_INNOVATOR_FORM,
  'innovator_introduction': INNOVATOR_INTRODUCTION_FORM,
  'past_applications': PAST_APPLICATIONS_FORM,
  'user_consent': USER_CONSENT_FORM,
}; 