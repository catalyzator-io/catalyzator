import { 
  doc, 
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';


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
  