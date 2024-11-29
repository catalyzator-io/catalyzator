import { FirebaseDAL } from '../base';
import { FirestorePaths, StoragePaths } from '../paths';
import { Entity, EntityType, InnovatorEntity, CatalystEntity, EntityUpdateInput } from '../../../types/entity';
import { storageUtils } from '../../firebase/storage';
import { userDAL } from '../user/UserDAL';
import { ProductId, ProductFeatureId, ProductAccess } from '../../../types/product';

export interface CreateEntityInput {
  name: string;
  name_en?: string;
  description?: string;
  website?: string;
  type: EntityType;
  created_by: string;
  logo?: File;
}

export class EntityDAL {
  private dal: FirebaseDAL;

  constructor() {
    this.dal = new FirebaseDAL();
  }

  /**
   * Create a new entity
   */
  async createEntity(input: CreateEntityInput): Promise<Entity> {
    try {
      const timestamp = new Date();
      const entityId = crypto.randomUUID();

      // Upload logo if provided
      let logoUrl: string | undefined;
      if (input.logo) {
        logoUrl = await storageUtils.uploadFile(
          input.logo,
          StoragePaths.entityLogo(entityId, input.logo.name)
        );
      }

      const baseEntityData = {
        id: entityId,
        name: input.name,
        name_en: input.name_en,
        description: input.description,
        website: input.website,
        type: input.type,
        logo: logoUrl ? { 
          url: logoUrl,
          name: input.logo?.name,
          type: input.logo?.type,
          size: input.logo?.size,
          uploaded_at: timestamp
        } : undefined,
        members: [input.created_by],
        created_at: timestamp,
        updated_at: timestamp,
        created_by: input.created_by
      };

      // Create type-specific entity data
      const entityData: Entity = input.type === 'innovator' 
        ? {
            ...baseEntityData,
            type: 'innovator',
            industry: [],
            product_access: {},
            applications: {}
          } as InnovatorEntity
        : {
            ...baseEntityData,
            type: 'catalyst',
            active_grants: []
          } as CatalystEntity;
      // Save to Firestore
      await this.dal.set(FirestorePaths.entityDoc(entityId), entityData);

      // Add entity to user's entities
      await userDAL.addEntityToUser(input.created_by, entityId);

      return entityData;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw error;
    }
  }

  /**
   * Get entity by ID
   */
  async getEntity(entityId: string): Promise<Entity | null> {
    return this.dal.get<Entity>(FirestorePaths.entityDoc(entityId));
  }

  /**
   * Update entity
   */
  async updateEntity(
    entityId: string, 
    data: EntityUpdateInput,
    updatedBy: string
  ): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(updatedBy)) {
      throw new Error('User does not have permission to update this entity');
    }

    return this.dal.update(FirestorePaths.entityDoc(entityId), {
      ...data,
      updated_at: new Date()
    });
  }

  /**
   * Add member to entity and sync permissions
   */
  async addMember(entityId: string, userId: string, addedBy: string): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(addedBy)) {
      throw new Error('User does not have permission to add members');
    }

    // Add member to entity
    const updatedMembers = [...new Set([...entity.members, userId])];
    await this.dal.update(FirestorePaths.entityDoc(entityId), {
      members: updatedMembers,
      updated_at: new Date()
    });

    // Add entity to user's entities
    await userDAL.addEntityToUser(userId, entityId);

    // Sync product access for new member
    if (entity.type === 'innovator' && Object.keys(entity.product_access).length > 0) {
      for (const [productId, access] of Object.entries(entity.product_access)) {
        await userDAL.updateProductAccess(userId, productId as ProductId, access);
      }
    }
  }

  /**
   * Remove member from entity
   */
  async removeMember(entityId: string, userId: string, removedBy: string): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(removedBy)) {
      throw new Error('User does not have permission to remove members');
    }

    // Cannot remove the last member
    if (entity.members.length === 1) {
      throw new Error('Cannot remove the last member from an entity');
    }

    // Remove member from entity
    const updatedMembers = entity.members.filter(id => id !== userId);
    await this.dal.update(FirestorePaths.entityDoc(entityId), {
      members: updatedMembers,
      updated_at: new Date()
    });

    // Remove entity from user's entities
    await userDAL.removeEntityFromUser(userId, entityId);
  }

  /**
   * Update entity logo
   */
  async updateLogo(entityId: string, file: File, updatedBy: string): Promise<string> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(updatedBy)) {
      throw new Error('User does not have permission to update logo');
    }

    // Delete old logo if exists
    if (entity.logo) {
      await storageUtils.deleteFile(entity.logo.url);
    }

    // Upload new logo
    const logoUrl = await storageUtils.uploadFile(
      file,
      StoragePaths.entityLogo(entityId, file.name)
    );

    // Update entity
    await this.dal.update(FirestorePaths.entityDoc(entityId), {
      logo: {
        url: logoUrl,
        name: file.name,
        type: file.type,
        size: file.size,
        uploaded_at: new Date()
      },
      updated_at: new Date()
    });

    return logoUrl;
  }

  /**
   * Add or update form for entity
   */
  async updateFormStatus(
    entityId: string, 
    formId: string,
    status: 'draft' | 'submitted' | 'approved' | 'rejected',
    updatedBy: string
  ): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(updatedBy)) {
      throw new Error('User does not have permission to update forms');
    }

    const formUpdate = {
      status,
      updated_at: new Date(),
      ...(status === 'submitted' ? { submitted_at: new Date() } : {})
    };

    await this.dal.update(FirestorePaths.entityDoc(entityId), {
      forms: {
        ...(entity.forms || {}),
        [formId]: formUpdate
      },
      updated_at: new Date()
    });
  }

  /**
   * Get form status
   */
  async getFormStatus(entityId: string, formId: string): Promise<{
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    submitted_at?: Date;
    updated_at: Date;
  } | null> {
    const entity = await this.getEntity(entityId);
    return entity?.forms?.[formId] || null;
  }

  /**
   * Update product access for entity and its members
   */
  async updateProductAccess(
    entityId: string,
    productId: ProductId,
    access: Partial<ProductAccess>,
    updatedBy: string
  ): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(updatedBy)) {
      throw new Error('User does not have permission to update product access');
    }

    if (entity.type !== 'innovator') {
      throw new Error('Only innovator entities can have product access');
    }

    const updatedProductAccess = {
      ...entity.product_access,
      [productId]: {
        ...entity.product_access[productId],
        ...access,
        updated_at: new Date()
      }
    };

    // Update entity product access
    await this.dal.update(FirestorePaths.entityDoc(entityId), {
      product_access: updatedProductAccess,
      updated_at: new Date()
    });

    // Update product access for all entity members
    await Promise.all(entity.members.map(async (memberId) => {
      await userDAL.updateProductAccess(memberId, productId, access);
    }));
  }

  /**
   * Grant feature access to entity and its members
   */
  async grantFeatureAccess(
    entityId: string,
    productId: ProductId,
    featureId: ProductFeatureId,
    grantedBy: string
  ): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(grantedBy)) {
      throw new Error('User does not have permission to grant feature access');
    }

    if (entity.type !== 'innovator') {
      throw new Error('Only innovator entities can have feature access');
    }

    const productAccess = entity.product_access[productId] || {
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

    // Update entity access
    await this.updateProductAccess(entityId, productId, updatedProductAccess, grantedBy);

    // Grant feature access to all entity members
    await Promise.all(entity.members.map(async (memberId) => {
      await userDAL.grantFeatureAccess(memberId, productId, featureId);
    }));
  }

  /**
   * Check if entity has access to a product feature
   */
  async hasFeatureAccess(
    entityId: string,
    productId: ProductId,
    featureId: ProductFeatureId
  ): Promise<boolean> {
    const entity = await this.getEntity(entityId);
    if (!entity || entity.type !== 'innovator') {
      return false;
    }

    const productAccess = entity.product_access[productId];
    if (!productAccess?.is_active) {
      return false;
    }

    return !!productAccess.features_access[featureId]?.is_active;
  }

  /**
   * Revoke feature access from entity and its members
   */
  async revokeFeatureAccess(
    entityId: string,
    productId: ProductId,
    featureId: ProductFeatureId,
    revokedBy: string
  ): Promise<void> {
    const entity = await this.getEntity(entityId);
    if (!entity) {
      throw new Error('Entity not found');
    }

    // Verify user has permission
    if (!entity.members.includes(revokedBy)) {
      throw new Error('User does not have permission to revoke feature access');
    }

    if (entity.type !== 'innovator') {
      throw new Error('Only innovator entities can have feature access');
    }

    const productAccess = entity.product_access[productId];
    if (!productAccess) {
      return;
    }

    const { [featureId]: removed, ...remainingFeatures } = 
      productAccess.features_access;

    const updatedProductAccess = {
      ...productAccess,
      features_access: remainingFeatures
    };

    // Update entity access
    await this.updateProductAccess(entityId, productId, updatedProductAccess, revokedBy);

    // Revoke feature access from all entity members
    await Promise.all(entity.members.map(async (memberId) => {
      await userDAL.revokeFeatureAccess(memberId, productId, featureId);
    }));
  }
}

// Export singleton instance
export const entityDAL = new EntityDAL(); 