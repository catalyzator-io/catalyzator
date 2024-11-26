import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection,
  getDocs,
  DocumentSnapshot,
  Timestamp 
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { uploadFile } from "../../firebase/common_api";
import { db } from "../firebase/firebase";
import { Entity, Application } from "../../types/entity";
import { UserProfile } from "../../types/user";

export interface ProfileData {
  profile: UserProfile;
  entities: Entity[];
}

export class ProfileDAL {
  private static getUserDoc(userId: string) {
    return doc(db, "users", userId);
  }

  static async fetchUserProfile(userId: string): Promise<ProfileData> {
    try {
      // Fetch user profile
      const userDoc = await getDoc(this.getUserDoc(userId));
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }

      const userProfile = {
        id: userId,
        ...userDoc.data()
      } as UserProfile;

      // Get entity IDs from user document
      const entityIds = userDoc.data()?.entity_ids || [];

      // Fetch entities and their applications
      const entityPromises = entityIds.map(async (entityId: string) => {
        const entityDoc = await getDoc(doc(db, "entities", entityId));
        if (!entityDoc.exists()) return null;
        return this.convertFirestoreToEntity(entityDoc);
      });

      const entities = (await Promise.all(entityPromises))
        .filter((entity): entity is Entity => entity !== null);

      return {
        profile: userProfile,
        entities
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  private static async convertFirestoreToEntity(
    entityDoc: DocumentSnapshot
  ): Promise<Entity> {
    const data = entityDoc.data();
    if (!data) throw new Error('Entity data is undefined');

    // Base entity conversion
    const entity: Entity = {
      id: entityDoc.id,
      basicInfo: {
        companyName: data.entityName?.text,
        companyNameEn: data.entityNameEn?.text,
        companyUrl: data.entityUrl?.text
      },
      type: data.entityType?.text,
      story: data.entityStory?.text,
      role: data.role,
      team: data.team,
      status: data.status,
      transactionStage: data.transaction_stage,
      created_at: data.created_at,
      created_by: data.created_by,
      updated_at: data.updated_at,
      products: {
        grants: {},
      },
    };

    // Fetch and convert grant applications
    const applicationsCollection = collection(db, 'entities', entityDoc.id, 'grant_onboarding');
    const applicationsSnapshot = await getDocs(applicationsCollection);

    if (!applicationsSnapshot.empty) {
      const applicationPromises = applicationsSnapshot.docs.map(appDoc => 
        this.convertFirestoreToApplication(
          appDoc.id, 
          appDoc.data(),
          entityDoc.id
        )
      );
      
      const applications = await Promise.all(applicationPromises);
      
      entity.products = {
        grants: applications.reduce((acc, app) => ({
          ...acc,
          [app.id]: app,
        }), {}),
      };
    }

    return entity;
  }

  private static async convertFirestoreToApplication(
    applicationId: string,
    applicationData: any,
    entityId: string
  ): Promise<Application> {
    const formData: Record<string, any> = {};
    
    // Fetch data for each known collection
    for (const collectionName of Object.values(questionToCollectionMap)) {
      try {
        const sectionCollection = collection(
          db, 
          'entities', 
          entityId, 
          'grant_onboarding',
          applicationId,
          'sections'
        );
        const sectionDocs = await getDocs(sectionCollection);

        if (!sectionDocs.empty) {
          formData[collectionName] = sectionDocs.docs.map(doc => ({
            ...doc.data(),
            _id: doc.id,
            _path: doc.ref.path
          }));
        }
      } catch (error) {
        console.warn(`No data found for collection ${collectionName}:`, error);
      }
    }

    return {
      id: applicationId,
      name: applicationData.currentSection || 'Grant Application',
      status: applicationData.status || 'draft',
      hasUpdates: false,
      lastUpdate: applicationData.createdAt.toDate().toISOString(),
      formData,
      entityId: applicationData.entityId || entityId,
      providerId: applicationData.providerId,
      grantId: applicationData.grantId,
      currentStep: applicationData.sectionsFilled || 0,
      startTime: applicationData.createdAt.toDate(),
      progress: {
        sectionsFilled: applicationData.sectionsFilled,
        totalSections: applicationData.totalSections,
        isComplete: applicationData.allSectionsComplete
      }
    };
  }

  static async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      const auth = getAuth();
      const userRef = this.getUserDoc(userId);

      // Update Firebase Auth profile if name or photo changed
      if (auth.currentUser && (updates.full_name || updates.photoURL)) {
        await updateProfile(auth.currentUser, {
          displayName: updates.full_name,
          photoURL: updates.photoURL,
        });
      }

      // Update Firestore user document
      await updateDoc(userRef, {
        ...updates,
        updated_at: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  static async uploadProfilePhoto(userId: string, file: File): Promise<string> {
    try {
      const photoURL = await uploadFile(file, `users/${userId}/profile/${file.name}`);
      await this.updateProfile(userId, { photoURL });
      return photoURL;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
    }
  }
} 