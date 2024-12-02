import { FirebaseDAL } from '../base';
import { FirestorePaths, StoragePaths } from '../paths';
import { User, UserProfile, UserSettings, UserUpdateInput } from '../../../types/user';
import { ProductId, ProductFeatureId, ProductAccess } from '../../../types/product';
import { storageUtils } from '../../firebase/storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export interface CreateUserInput {
  id: string;  // Firebase Auth UID
  email: string;
  profile: {
    full_name: string;
    phone?: string;
    description?: string;
    primary_entity_type?: 'innovator' | 'catalyst';
    photo_url?: string;
  };
}

export class UserDAL {
  private dal: FirebaseDAL;

  constructor() {
    this.dal = new FirebaseDAL();
  }

  async createUser(input: CreateUserInput): Promise<User> {
    const timestamp = new Date();
    
    const userData: User = {
      id: input.id,
      profile: {
        full_name: input.profile.full_name,
        email: input.email,
        phone: input.profile.phone,
        description: input.profile.description,
        primary_entity_type: input.profile.primary_entity_type,
        entity_ids: [],
        photo_url: input.profile.photo_url
      },
      settings: {
        notifications: {
          application_update: { email: true, push: true, in_app: true },
          grant_match: { email: true, push: true, in_app: true },
          investor_match: { email: true, push: true, in_app: true },
          team_invite: { email: true, push: true, in_app: true },
          product_update: { email: true, push: true, in_app: true },
          system: { email: true, push: true, in_app: true }
        },
        theme: 'light',
        language: 'en',
        marketing_emails: false
      },
      product_access: {},
      hasAcceptedTerms: false,
      created_at: timestamp,
      updated_at: timestamp,
      transaction_stage: 0
    };

    await this.dal.set(FirestorePaths.userDoc(input.id), userData);
    return userData;
  }

  async getUser(userId: string): Promise<User | null> {
    return this.dal.get<User>(FirestorePaths.userDoc(userId));
  }

  async updateUser(userId: string, data: UserUpdateInput): Promise<void> {
    console.log(data, 'data');
    return this.dal.update(FirestorePaths.userDoc(userId), data);
  }

  async updateProfile(userId: string, profileUpdates: Partial<UserProfile>): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedProfile = {
      ...user.profile,
      ...profileUpdates
    };

    return this.updateUser(userId, { profile: updatedProfile });
  }

  async updateSettings(userId: string, settingsUpdates: Partial<UserSettings>): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedSettings = {
      ...user.settings,
      ...settingsUpdates
    };

    return this.updateUser(userId, { settings: updatedSettings });
  }

  async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    const photoURL = await storageUtils.uploadFile(
      file,
      StoragePaths.userProfilePhoto(userId, file.name)
    );

    await this.updateProfile(userId, { photo_url: photoURL });
    
    return photoURL;
  }

  async addEntityToUser(userId: string, entityId: string): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedEntityIds = [...(user.profile.entity_ids || []), entityId];
    return this.updateProfile(userId, { entity_ids: updatedEntityIds });
  }

  async removeEntityFromUser(userId: string, entityId: string): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedEntityIds = user.profile.entity_ids.filter(id => id !== entityId);
    return this.updateProfile(userId, { entity_ids: updatedEntityIds });
  }

  /**
   * Update product access for a user
   */
  async updateProductAccess(
    userId: string, 
    productId: ProductId, 
    access: Partial<ProductAccess>
  ): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedProductAccess = {
      ...user.product_access,
      [productId]: {
        ...user.product_access[productId],
        ...access,
        updated_at: new Date()
      }
    };

    return this.updateUser(userId, { 
      product_access: updatedProductAccess 
    });
  }

  /**
   * Grant feature access to a user
   */
  async grantFeatureAccess(
    userId: string,
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const productAccess = user.product_access[productId] || {
      is_active: true,
      activated_at: new Date(),
      features_access: {}
    };

    const updatedProductAccess = {
      ...productAccess,
      features_access: {
        ...productAccess.features_access,
        [featureId]: {
          is_active: true,
          activated_at: new Date()
        }
      }
    };

    return this.updateProductAccess(userId, productId, updatedProductAccess);
  }

  /**
   * Check if user has access to a product feature
   */
  async hasFeatureAccess(
    userId: string,
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) {
      return false;
    }

    const productAccess = user.product_access[productId];
    if (!productAccess?.is_active) {
      return false;
    }

    return !!productAccess.features_access[featureId]?.is_active;
  }

  /**
   * Revoke feature access from a user
   */
  async revokeFeatureAccess(
    userId: string,
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const productAccess = user.product_access[productId];
    if (!productAccess) {
      return;
    }

    const { [featureId]: removed, ...remainingFeatures } = 
      productAccess.features_access;

    const updatedProductAccess = {
      ...productAccess,
      features_access: remainingFeatures
    };

    return this.updateProductAccess(userId, productId, updatedProductAccess);
  }

  async updateTermsAcceptance(userId: string): Promise<void> {
    console.log(userId, "here")
    return this.updateUser(userId, { 
      hasAcceptedTerms: true,
      updated_at: new Date()
    });
  }

  async getUserEntities(userId: string): Promise<string[]> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user.profile.entity_ids || [];
  }

  async getUserByEmail(email: string) {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    return querySnapshot.docs[0].data();
  }
}

// Export singleton instance
export const userDAL = new UserDAL(); 