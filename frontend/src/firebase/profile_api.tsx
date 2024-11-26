import { collection, getDocs, doc, updateDoc, getDoc, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { uploadFile } from "./common_api";
import { db } from '../utils/firebase/firebase';
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
  
  // Fetch data for each known collection
  for (const collectionName of Object.values(questionToCollectionMap)) {
    try {
      // Get the collection reference
      console.log(`Fetching collection ${collectionName}`);
      const section_data = doc(db, 'entities', entityId, 'grant_onboarding', applicationId, 'sections', collectionName);
      const snapshot = await getDoc(section_data);

      console.log(snapshot.data());
      if (snapshot.exists()) {
        // For collections that might have multiple documents
        if (['founders', 'team'].includes(collectionName)) {
          formData[collectionName] = snapshot.data().map((doc: any) => ({
            ...doc,
            _id: doc.id,
            _path: doc.ref.path
          }));
        } else {
          // For collections that typically have a single document
          formData[collectionName] = {
            ...snapshot.data(),
            _id: snapshot.id,
            _path: snapshot.ref.path
          };
        }
      }
    } catch (error) {
      console.log(`No data found for collection ${collectionName}`);
    }
  }

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