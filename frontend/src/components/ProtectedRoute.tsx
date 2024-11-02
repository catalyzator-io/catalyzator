import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { transaction_stage_mapping, PUBLIC_ROUTES } from '../data/constants';
import toast from 'react-hot-toast';

export const ProtectedRoute = ({ children, requireStage }: { children: React.ReactNode, requireStage: number }) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast.error('Please sign in to access this page', {
          position: 'top-center',
        });
        navigate(PUBLIC_ROUTES.SIGN_IN);
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        const userStage: number = userData?.transaction_stage ?? 0;
        
        if (requireStage !== undefined) {
          if (userStage !== requireStage) {
            const correctRoute = transaction_stage_mapping[userStage as keyof typeof transaction_stage_mapping];
            toast.error('You need to complete the previous steps before accessing this page', {
              position: 'top-center',
              icon: '🔒',
            });
            navigate(correctRoute);
            return;
          }
        }

        setAuthorized(true);
      } catch (error) {
        console.error('Error checking user stage:', error);
        toast.error('There was a problem verifying your access', {
          position: 'top-center',
        });
        navigate(PUBLIC_ROUTES.SIGN_IN);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, requireStage]);

  if (loading) return <div>Loading...</div>;
  return authorized ? children : null;
};

export default ProtectedRoute;
