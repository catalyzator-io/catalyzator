
import { 
    doc, 
    increment,
    getDoc,
    updateDoc
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import {db, storage} from '../utils/firebase/firebase';
  


export const checkUserExists = async (uid: string) => {
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


  
export const getEntityForUser = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists() && userDoc.data().entity_ids && userDoc.data().entity_ids.length > 0) {
        return userDoc.data().entity_ids[userDoc.data().entity_ids.length - 1];
      } else {
        console.warn('No entity IDs found for user:', userId);
        return null;
      }
    } catch (error) {
      console.error('Error retrieving first entity ID for user:', error);
      throw error;
    }
  };
  
  export const getEntityNameById = async (entityId: string) => {
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
  
  
export const uploadFile = async (file: File, storage_path: string) => {
    try {
        const storageRef = ref(storage, storage_path);
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