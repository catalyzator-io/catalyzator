import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export interface WaitlistEntry {
  userId: string;
  userEmail: string;
  productId: string;
  productName: string;
  registeredAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export async function registerForWaitlist(productId: string, productName: string): Promise<void> {
  const auth = getAuth();
  const db = getFirestore();
  
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to join waitlist');
  }

  // Check if user is already registered for this product
  const existingEntry = await getDocs(
    query(
      collection(db, 'waitlist'),
      where('userId', '==', auth.currentUser.uid),
      where('productId', '==', productId)
    )
  );

  if (!existingEntry.empty) {
    throw new Error('Already registered for this product waitlist');
  }

  const waitlistEntry: Omit<WaitlistEntry, 'id'> = {
    userId: auth.currentUser.uid,
    userEmail: auth.currentUser.email || '',
    productId,
    productName,
    registeredAt: new Date(),
    status: 'pending'
  };

  await addDoc(collection(db, 'waitlist'), waitlistEntry);
}

export async function checkWaitlistStatus(productId: string): Promise<WaitlistEntry | null> {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) return null;

  const snapshot = await getDocs(
    query(
      collection(db, 'waitlist'),
      where('userId', '==', auth.currentUser.uid),
      where('productId', '==', productId)
    )
  );

  return snapshot.empty ? null : snapshot.docs[0].data() as WaitlistEntry;
} 