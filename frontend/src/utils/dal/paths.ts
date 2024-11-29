import { EntityType } from '../../types/entity';
import { ProductId } from '../../types/product';

export class StoragePaths {
  static readonly ROOT = 'catalyzator';
  
  // User related paths
  static userRoot(userId: string) {
    return `${this.ROOT}/users/${userId}`;
  }
  
  static userProfile(userId: string) {
    return `${this.userRoot(userId)}/profile`;
  }

  static userProfilePhoto(userId: string, fileName: string) {
    return `${this.userProfile(userId)}/photos/${fileName}`;
  }

  // Entity related paths
  static entityRoot(entityId: string) {
    return `${this.ROOT}/entities/${entityId}`;
  }

  static entityLogo(entityId: string, fileName: string) {
    return `${this.entityRoot(entityId)}/logo/${fileName}`;
  }

  static entityDocuments(entityId: string) {
    return `${this.entityRoot(entityId)}/documents`;
  }

  // Product related paths
  static productRoot(entityId: string, productId: ProductId) {
    return `${this.entityRoot(entityId)}/products/${productId}`;
  }

  static pitchRecording(entityId: string, fileName: string) {
    return `${this.productRoot(entityId, 'pitch-to-grant')}/recordings/${fileName}`;
  }

  // Grant application related paths
  static grantApplicationRoot(entityId: string, applicationId: string) {
    return `${this.entityRoot(entityId)}/grant_applications/${applicationId}`;
  }

  static formsRoot(entityId: string) {
    return `${this.entityRoot(entityId)}/forms`;
  }

  static formDoc(entityId: string, formId: string, fileName: string, questionId: string) {
    return `${this.formsRoot(entityId)}/${formId}/${questionId}/${fileName}`;
  }

  static grantApplicationFile(
    entityId: string, 
    applicationId: string, 
    section: string,
    fileName: string
  ) {
    return `${this.grantApplicationRoot(entityId, applicationId)}/files/${section}/${fileName}`;
  }
}

export class FirestorePaths {
  // Collection names
  static readonly USERS = 'users';
  static readonly ENTITIES = 'entities';
  static readonly APPLICATIONS = 'applications';
  static readonly GRANTS = 'grants';
  static readonly MATCHES = 'matches';
  static readonly FORMS = 'forms';

  // User paths
  static userDoc(userId: string) {
    return `${this.USERS}/${userId}`;
  }

  static userMetadata(userId: string) {
    return `${this.userDoc(userId)}/metadata`;
  }

  // Entity paths
  static entityDoc(entityId: string) {
    return `${this.ENTITIES}/${entityId}`;
  }

  static entityMembers(entityId: string) {
    return `${this.entityDoc(entityId)}/members`;
  }

  // Application paths
  static applicationDoc(entityId: string, applicationId: string) {
    return `${this.entityDoc(entityId)}/applications/${applicationId}`;
  }

  static applicationSections(entityId: string, applicationId: string) {
    return `${this.applicationDoc(entityId, applicationId)}/sections`;
  }

  // Grant paths
  static grantDoc(grantId: string) {
    return `${this.GRANTS}/${grantId}`;
  }

  // Match paths
  static matchDoc(matchId: string) {
    return `${this.MATCHES}/${matchId}`;
  }

  static matchesByEntity(entityId: string, type: EntityType) {
    return type === 'innovator' 
      ? `${this.MATCHES}?innovatorId=${entityId}`
      : `${this.MATCHES}?catalystId=${entityId}`;
  }

  static formsRoot(entityId: string) {
    return `${this.FORMS}/${entityId}`;
  }

  static formDoc(entityId: string, formId: string) {
    return `${this.formsRoot(entityId)}/${formId}`;
  }
} 