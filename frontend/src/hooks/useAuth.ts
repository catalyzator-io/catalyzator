import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { dal } from '../utils/dal/dal';

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return dal.auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return {
    currentUser,
    loading,
    signOut: dal.auth.signOut
  };
} 