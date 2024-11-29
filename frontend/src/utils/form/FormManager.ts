import { FormId, FORM_PRODUCT_ACCESS_MAP } from '../../types/form';
import { dal } from '../dal/dal';
import { useAuth } from '../../hooks/useAuth';

export class FormManager {
  /**
   * Handle form submission
   */
  static async handleSubmit(
    formId: FormId,
    entityId: string,
    submissionId: string,
    data: Record<string, any>
  ): Promise<void> {
    const { currentUser } = useAuth();
    try {
      
      // 1. Submit form data
      await dal.forms.updateSubmission(
        entityId,
        submissionId,
        {
          ...data,
          status: 'submitted',
          updated_at: new Date()
        },
        currentUser?.uid || ''
      );

      // 2. Update access permissions based on form type
      const accessGrant = FORM_PRODUCT_ACCESS_MAP[formId];
      if (accessGrant) {
        if (accessGrant.productId) {
          // Grant product-specific feature access
          await dal.user.grantFeatureAccess(
            entityId,
            accessGrant.productId,
            accessGrant.featureId
          );
        } else {
          // FIXME: there should be a default product for general features
          // Grant general feature access (like 'forms')
          await dal.user.grantFeatureAccess(
            entityId,
            'pitch-to-grant', // Default product for general features
            accessGrant.featureId
          );
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  }

  /**
   * Get redirect path based on form type and user access
   */
  static async getRedirectPath(
    formId: FormId,
    userId: string
  ): Promise<string> {
    const accessGrant = FORM_PRODUCT_ACCESS_MAP[formId];
    if (!accessGrant) return '/';

    // Check if user has the granted access
    const user = await dal.user.getUser(userId);
    if (!user) return '/';

    // Determine redirect based on granted access
    switch (accessGrant.featureId) {
      case 'match-approved-innovators':
        return '/app/fundmatch/matches';
      case 'find-investors':
        return '/app/fundmatch/investors';
      case 'pitch-to-grant':
        return '/app/pitch-to-grant/applications';
      case 'grant-recommendation':
        return '/app/compass/recommendations';
      case 'forms':
        return '/app/forms';
      default:
        return '/';
    }
  }

  /**
   * Initialize form and verify access
   */
  static async initializeForm(
    formId: FormId,
    entityId: string
  ): Promise<{ canAccess: boolean; submissionId: string | null }> {
    try {
      // 1. Check if entity already has a submission for this form
      const { currentUser } = useAuth();
      const submissions = await dal.forms.getEntitySubmissions(entityId);
      const existingSubmission = submissions.some(s => s.form_id === formId);

      // 2. Check if entity already has the access this form provides
      const accessGrant = FORM_PRODUCT_ACCESS_MAP[formId];
      let hasAccess = false;
      
      if (accessGrant) {
        // Check product-specific feature access
        hasAccess = await dal.user.hasFeatureAccess(
          entityId,
          accessGrant.productId || 'pitch-to-grant',
          accessGrant.featureId
        );
      }

      // 3. Verify form access permission
      const hasFormAccess = await dal.user.hasFeatureAccess(
        entityId,
        'pitch-to-grant',
        'forms'
      );
      const submission = await dal.forms.createSubmission({
        form_id: formId,
        entity_id: entityId,
        submitted_by: currentUser?.uid || '',
        data: {}
      });

      return {
        canAccess: hasFormAccess && !hasAccess && !existingSubmission,
        submissionId: submission.id
      };
    } catch (error) {
      console.error('Error initializing form:', error);
      throw error;
    }
  }

  /**
   * Update form step
   */
  static async updateFormStep(
    formId: FormId,
    entityId: string,
    submissionId: string,
    step: number,
    stepData: Record<string, any>
  ): Promise<void> {
    const { currentUser } = useAuth();
    try {
      await dal.forms.updateSubmission(
        entityId,
        submissionId,
        {
          current_step: step,
          [`step_${step}_data`]: stepData,
          updated_at: new Date()
        },
        currentUser?.uid || ''
      );
    } catch (error) {
      console.error('Error updating form step:', error);
      throw error;
    }
  }
} 