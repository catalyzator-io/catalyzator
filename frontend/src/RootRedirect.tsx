// src/RootRedirect.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { transaction_stage_mapping, PUBLIC_ROUTES } from './data/constants';

import HomePage from './pages/HomePage';

export const RootRedirect = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          const userStage = userData?.transaction_stage ?? 0;
          const correctRoute = transaction_stage_mapping[userStage];
          navigate(correctRoute);
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate(PUBLIC_ROUTES.SIGN_IN);
        }
      } else {
        navigate(PUBLIC_ROUTES.LANDING);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  return <HomePage />;
};
