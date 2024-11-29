import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentReference,
  CollectionReference,
  DocumentData,
  QueryConstraint,
  Firestore
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface QueryOptions {
  where?: [string, "==" | "!=" | ">" | ">=" | "<" | "<=", any][];
  orderBy?: [string, "asc" | "desc"][];
  limit?: number;
}

export class FirebaseDAL {
  private db: Firestore;

  constructor(customDb?: Firestore) {
    this.db = customDb || db;
  }

  /**
   * Get a document by its full path
   */
  async get<T>(path: string): Promise<T | null> {
    try {
      const docRef = doc(this.db, path);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as T;
    } catch (error) {
      console.error(`Error getting document at path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Create or update a document at the specified path
   */
  async set<T extends DocumentData>(path: string, data: T, merge: boolean = true): Promise<void> {
    try {
      const docRef = doc(this.db, path);
      await setDoc(docRef, {
        ...data,
        updated_at: new Date(),
        created_at: data.created_at || new Date()
      }, { merge });
    } catch (error) {
      console.error(`Error setting document at path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Update specific fields of a document
   */
  async update(path: string, data: Partial<DocumentData>): Promise<void> {
    try {
      const docRef = doc(this.db, path);
      await updateDoc(docRef, {
        ...data,
        updated_at: new Date()
      });
    } catch (error) {
      console.error(`Error updating document at path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document at the specified path
   */
  async delete(path: string): Promise<void> {
    try {
      const docRef = doc(this.db, path);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document at path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Query documents in a collection
   */
  async query<T>(
    collectionPath: string, 
    options: QueryOptions = {}
  ): Promise<T[]> {
    try {
      const collectionRef = collection(this.db, collectionPath);
      const constraints: QueryConstraint[] = [];

      // Add where clauses
      if (options.where) {
        options.where.forEach(([field, operator, value]) => {
          constraints.push(where(field, operator, value));
        });
      }

      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error(`Error querying collection at path ${collectionPath}:`, error);
      throw error;
    }
  }

  /**
   * Get a document reference
   */
  getDocRef(path: string): DocumentReference {
    return doc(this.db, path);
  }

  /**
   * Get a collection reference
   */
  getCollectionRef(path: string): CollectionReference {
    return collection(this.db, path);
  }

  /**
   * Check if a document exists
   */
  async exists(path: string): Promise<boolean> {
    try {
      const docRef = doc(this.db, path);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error(`Error checking document existence at path ${path}:`, error);
      throw error;
    }
  }

  /**
   * Batch get multiple documents by their paths
   */
  async batchGet<T>(paths: string[]): Promise<(T | null)[]> {
    try {
      const promises = paths.map(path => this.get<T>(path));
      return Promise.all(promises);
    } catch (error) {
      console.error('Error in batch get:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const firebaseDAL = new FirebaseDAL();

// Example usage:
/*
// Get a user
const user = await firebaseDAL.get(FirestorePaths.userDoc('user123'));

// Update user profile
await firebaseDAL.update(FirestorePaths.userDoc('user123'), {
  'profile.name': 'New Name'
});

// Query entities
const entities = await firebaseDAL.query(FirestorePaths.ENTITIES, {
  where: [
    ['type', '==', 'innovator'],
    ['status', '==', 'active']
  ]
});
*/ 