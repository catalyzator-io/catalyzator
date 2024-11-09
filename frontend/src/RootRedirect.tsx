// src/RootRedirect.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './constants/routes';
import { RouteStateManager } from './firebase/route_state_api';
import { LoadingSpinner } from './components/ui/loading-spinner';

export const RootRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, loading } = useAuth();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        if (currentUser) {
          const routeStateManager = new RouteStateManager(currentUser.uid);
          const currentState = await routeStateManager.getCurrentState();

          if (!currentState) {
            // First time user - send to onboarding
            navigate(PROTECTED_ROUTES.ONBOARDING);
          } else {
            // Return user - send to app home
            navigate(PROTECTED_ROUTES.APP_HOME);
          }
        } else {
          // Not authenticated - send to landing
          navigate(PUBLIC_ROUTES.LANDING);
        }
      } catch (error) {
        console.error('Error in root redirect:', error);
        navigate(PUBLIC_ROUTES.LANDING);
      }
    };

    if (!loading) {
      redirectUser();
    }
  }, [currentUser, loading, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return null;
};

export default RootRedirect;
