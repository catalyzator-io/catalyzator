import { useState, useEffect } from 'react';
import { Grant } from '../types/grant';
import { useAuth } from './useAuth';
import { db } from '../utils/firebase/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore';

// FIXME: figure out if it is need to be used for now
export function useGrants() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchGrants() {
      if (!currentUser) {
        setGrants([]);
        setLoading(false);
        return;
      }

      try {
        const grantsRef = collection(db, 'grants');
        const q = query(grantsRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const grantsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Grant[];

        setGrants(grantsData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch grants'));
      } finally {
        setLoading(false);
      }
    }

    fetchGrants();
  }, [currentUser]);

  return { grants, loading, error };
} 