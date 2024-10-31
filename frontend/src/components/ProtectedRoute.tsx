import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { transaction_stage_mapping, PUBLIC_ROUTES } from '../data/constants';

export const ProtectedRoute = ({ children, requireStage }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If the user is not authenticated, redirect to sign-in
        navigate(PUBLIC_ROUTES.SIGN_IN);
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const userStage = userData?.transaction_stage ?? 0;
        
        // If this route requires a specific stage
        if (requireStage !== undefined) {
          if (userStage !== requireStage) {
            const correctRoute = transaction_stage_mapping[userStage];
            navigate(correctRoute);
            return;
          }
        }

        setAuthorized(true); // User is authorized to access the route
      } catch (error) {
        console.error('Error checking user stage:', error);
        navigate(PUBLIC_ROUTES.SIGN_IN);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth, navigate, requireStage]);

  if (loading) return <div>Loading...</div>;
  return authorized ? children : null; // Render children if authorized
};

export default ProtectedRoute;
