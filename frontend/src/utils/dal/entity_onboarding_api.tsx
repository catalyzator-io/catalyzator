import { 
    doc, 
    setDoc, 
    arrayUnion,
    getDoc,
    updateDoc,
  } from 'firebase/firestore';
  import { db } from '../firebase/firebase';
  import { incrementTransactionStage } from './common_api';

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
  