import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  setDoc, 
  arrayUnion,
  increment,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection as firestoreCollection
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import db from './firebase';
import {storage} from './firebase';

// Function to start a new application
export const startApplication = async (userId, entityId) => {
  try {
      const applicationData = {
          userId,
          createdAt: new Date(),
          duration: 0,
          sectionsFilled: 0,
          totalSections: 9, 
          allSectionsComplete: false,
      };

      const applicationsRef = collection(db, 'entities', entityId, 'grant_onboarding');
      const docRef = await addDoc(applicationsRef, applicationData);
      return docRef.id;
  } catch (error) {
      console.error('Error starting application:', error);
      throw error;
  }
};

// Enhanced function to insert multiple entries for a section
export const insertMultipleEntries = async (applicationId, section, entries, entityId) => {
  try {
      const sectionRef = firestoreCollection(db, 'entities', entityId, 'grant_onboarding', applicationId, 'sections', section, 'entries');

      const insertPromises = entries.map(async (entryData, index) => {
          const entryDoc = doc(sectionRef, `entry_${index + 1}`);
          await setDoc(entryDoc, {
              ...entryData,
              entryIndex: index + 1,
              createdAt: serverTimestamp()
          });
      });

      await Promise.all(insertPromises);
      console.log(`Multiple entries for section ${section} successfully written to Firestore!`);
  } catch (error) {
      console.error('Error writing multiple entries to Firestore:', error);
      throw error;
  }
};

// Function to insert single entry FormData into Firestore
export const insertSectionData = async (applicationId, section, data, entityId) => {
  try {
      const sectionRef = doc(db, 'entities', entityId, 'grant_onboarding', applicationId, 'sections', section);
      await setDoc(sectionRef, {
          ...data,
          entryIndex: 1,
          createdAt: serverTimestamp()
      }, { merge: true });
      console.log(`Section ${section} data successfully written to Firestore!`);
  } catch (error) {
      console.error('Error writing section data to Firestore:', error);
      throw error;
  }
};


export const checkUserExists = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists();
  } catch (error) {
    console.error('Error checking if user exists:', error);
    throw error;
  }
};

export const incrementTransactionStage = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      transaction_stage: increment(1)
    });
    return true;
  } catch (error) {
    console.error('Error incrementing transaction stage:', error);
    throw error;
  }
};

/**
 * Generic function to add an entity ID to a user's entity_ids array
 */


export const getEntityForUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().entity_ids && userDoc.data().entity_ids.length > 0) {
      return userDoc.data().entity_ids[0];
    } else {
      console.warn('No entity IDs found for user:', userId);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving first entity ID for user:', error);
    throw error;
  }
};

export const getEntityNameById = async (entityId) => {
  try {
    const entityRef = doc(db, 'entities', entityId);
    const entityDoc = await getDoc(entityRef);
    
    if (entityDoc.exists()) {
      const entityData = entityDoc.data();
      const entityName = entityData?.entityName?.text;

      if (entityName) {
        return entityName;
      } else {
        console.warn('Entity name not found for entity ID:', entityId);
        return null;
      }
    } else {
      console.warn('Entity not found for ID:', entityId);
      return null;
    }
  } catch (error) {
    console.error('Error retrieving entity name:', error);
    throw error;
  }
};

export const addEntityToUser = async (userId: string, entityId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      await updateDoc(userRef, {
        entity_ids: arrayUnion(entityId)
      });
    } else {
      await setDoc(userRef, {
        entity_ids: [entityId]
      });
    }
    return true;
  } catch (error) {
    console.error('Error adding entity to user:', error);
    throw error;
  }
};


export const createEntity = async (entityData: {
  entityId: string;
  userId: string;
  [key: string]: any;
}) => {
  try {
    const { entityId, userId, ...formData } = entityData;
    const entityRef = doc(db, 'entities', entityId);
    
    await setDoc(entityRef, {
      entity_id: entityId,
      created_by: userId,
      created_at: new Date().toISOString(),
      ...formData
    });
    return true;
  } catch (error) {
    console.error('Error creating entity:', error);
    throw error;
  }
};


export const insertEntityField = async (entityId: string, fieldName: string, fieldValue: any) => {
  try {
    const entityRef = doc(db, 'entities', entityId);
    
    await updateDoc(entityRef, {
      [fieldName]: fieldValue,
      updated_at: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error updating entity field:', error);
    throw error;
  }
};


export const completeEntityOnboarding = async (userId: string, entityId: string) => {
  try {
    await addEntityToUser(userId, entityId);
    await incrementTransactionStage(userId);
    return true;
  } catch (error) {
    console.error('Error completing entity onboarding:', error);
    throw error;
  }
};

export const addNewUserToFirestore = async (userId: string, userData: {
  full_name: string;
  email: string;
}) => {
  try {
    const userRef = doc(db, 'users', userId);
    const timestamp = serverTimestamp();
    
    await setDoc(userRef, {
      full_name: userData.full_name,
      email: userData.email,
      signup_date: timestamp,
      last_login: timestamp,
      transaction_stage: 0
    });
    
    console.log('New user successfully added to Firestore!');
  } catch (error) {
    console.error('Error adding new user to Firestore:', error);
    throw error;
  }
};

export const updateLastLogin = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      last_login: serverTimestamp()
    });
    console.log('Last login timestamp updated successfully!');
  } catch (error) {
    console.error('Error updating last login timestamp:', error);
    throw error;
  }
};


export const updateApplicationMetadata = async (applicationId, duration, allSectionsComplete, entityId) => {
  try {
      const applicationRef = doc(db, 'entities', entityId, 'grant_onboarding', applicationId);
      await updateDoc(applicationRef, {
          duration,
          allSectionsComplete,
          lastUpdated: serverTimestamp(),
      });
      console.log('Application metadata updated successfully!');
  } catch (error) {
      console.error('Error updating application metadata:', error);
      throw error;
  }
};

// Enhanced file upload function to handle multiple files
export const uploadFile = async (applicationId, userId, file, section, entityId) => {
  try {
      const storageRef = ref(storage, `applications/${userId}/${entityId}/${applicationId}/${section}/${file.name}`);
      await uploadBytes(storageRef, file);
      console.log('File uploaded successfully!');

      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      
      return downloadURL;
  } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
  }
};