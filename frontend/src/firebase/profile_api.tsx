import { collection, getDocs, query, where, doc, updateDoc, getDoc, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { uploadFile } from "./common_api";
import db from './firebase';
import { Entity, Application } from '../types/entity';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  description?: string;
  photoURL?: string;
}

interface FirestoreEntity {
  entity_id: string;
  created_by: string;
  created_at: string;
  updated_at?: string;
  basicInfo?: {
    companyName?: string;
    companyNameEn?: string;
    companyUrl?: string;
  };
  type?: string;
  story?: string;
  role?: string;
  team?: {
    founders: string[];
    employeeCount: number;
  };
  status?: string;
  transaction_stage?: string;
}

interface FirestoreApplication {
  userId: string;
  createdAt: Timestamp;
  duration: number;
  sectionsFilled: number;
  totalSections: number;
  allSectionsComplete: boolean;
  currentSection?: string;
  status?: 'draft' | 'in_progress' | 'completed' | 'rejected' | 'approved';
  entityId: string;
  providerId?: string;
  grantId?: string;
  formData?: any;
}

const convertFirestoreToApplication = async (
  applicationId: string,
  applicationData: FirestoreApplication,
  entityId: string
): Promise<Application> => {
  const formData: Record<string, any> = {};
  
  // Helper function to recursively fetch all collections
  const fetchCollectionRecursively = async (path: string[], isCollection: boolean) => {
    if (!isCollection) {
      const docRef = doc(db, path.join('/'));
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const docData = docSnapshot.data();
        
        // Create path segments starting after the application ID
        const pathSegments = path.slice(4); // Skip entities/entityId/grant_onboarding/applicationId
        
        // Build the nested structure
        let current = formData;
        for (let i = 0; i < pathSegments.length - 1; i++) {
          const segment = pathSegments[i];
          if (!(segment in current)) {
            current[segment] = {};
          }
          current = current[segment];
        }
        
        // Add the document data at the final level
        const lastSegment = pathSegments[pathSegments.length - 1];
        current[lastSegment] = {
          ...docData,
          _path: path.join('/'), // Store the full path for reference
          _id: lastSegment
        };
      }
    }

    // Get subcollections
    const knownSubcollections = ['sections', 'fields', 'responses'];
    for (const subcollName of knownSubcollections) {
      const subcollectionPath = [...path, subcollName];
      const subcollectionRef = collection(db, subcollectionPath.join('/'));
      try {
        const subcollectionSnapshot = await getDocs(subcollectionRef);
        if (!subcollectionSnapshot.empty) {
          for (const doc of subcollectionSnapshot.docs) {
            await fetchCollectionRecursively([...subcollectionPath, doc.id], false);
          }
        }
      } catch (error) {
        console.log(`No subcollection found at ${subcollectionPath.join('/')}`);
      }
    }
  };

  // Start fetching from the application document
  const initialPath = ['entities', entityId, 'grant_onboarding', applicationId];
  await fetchCollectionRecursively(initialPath, false);

  console.log('Fetched form data:', formData);

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
};

const convertFirestoreToEntity = async (
  entityDoc: DocumentSnapshot
): Promise<Entity> => {
  const data = entityDoc.data();
  const firestoreEntity: FirestoreEntity = {
    entity_id: data?.entity_id,
    created_by: data?.created_by,
    created_at: data?.created_at,
    updated_at: data?.updated_at,
    type: data?.entityType?.text,
    story: data?.entityStory?.text,
    basicInfo: {
      companyName: data?.entityName?.text
    }
  };
  
  // Base entity conversion
  const entity: Entity = {
    id: entityDoc.id,
    basicInfo: firestoreEntity.basicInfo,
    type: firestoreEntity.type,
    story: firestoreEntity.story,
    role: firestoreEntity.role,
    team: firestoreEntity.team,
    status: firestoreEntity.status,
    transactionStage: firestoreEntity.transaction_stage,
    created_at: firestoreEntity.created_at,
    created_by: firestoreEntity.created_by,
    updated_at: firestoreEntity.updated_at,
    products: {
      grants: {},
    },
  };

  // Fetch and convert grant applications
  const applicationsSnapshot = await getDocs(
    collection(db, 'entities', entityDoc.id, 'grant_onboarding')
  );

  if (!applicationsSnapshot.empty) {
    const applicationPromises = applicationsSnapshot.docs.map(appDoc => 
      convertFirestoreToApplication(
        appDoc.id, 
        appDoc.data() as FirestoreApplication,
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
};

export const fetchUserProfile = async (userId: string) => {
  try {
    // Fetch user profile
    const userDoc = await getDoc(doc(db, "users", userId));
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
      return convertFirestoreToEntity(entityDoc);
    });

    const entities = (await Promise.all(entityPromises)).filter((entity): entity is Entity => entity !== null);

    return {
      profile: userProfile,
      entities
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const auth = getAuth();
    const userRef = doc(db, 'users', userId);

    // Update Firebase Auth profile if name or photo changed
    if (updates.full_name || updates.photoURL) {
      await updateProfile(auth.currentUser!, {
        displayName: updates.full_name,
        photoURL: updates.photoURL,
      });
    }

    // Update Firestore user document
    await updateDoc(userRef, updates);

    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const uploadProfilePhoto = async (userId: string, file: File) => {
  try {
    const photoURL = await uploadFile(file, `users/${userId}/profile/${file.name}`);
    await updateUserProfile(userId, { photoURL });
    return photoURL;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw error;
  }
};

export type { Entity as EntityType };