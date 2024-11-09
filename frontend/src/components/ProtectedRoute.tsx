import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTE_STATE_CONFIG, PUBLIC_ROUTES } from '../constants/routes';
import { RouteStateManager } from '../utils/firebase/route_state';
import { toast } from 'react-hot-toast';
import { User } from 'firebase/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  stateName: keyof typeof ROUTE_STATE_CONFIG;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  stateName,
  requireAuth = true 
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async (user: User | null) => {
      try {
        if (requireAuth && !user) {
          toast.error('Please sign in to access this page');
          navigate(PUBLIC_ROUTES.SIGN_IN, { 
            state: { from: location.pathname }
          });
          return;
        }

        if (!requireAuth || user) {
          if (requireAuth && user) {
            const routeStateManager = new RouteStateManager(user.uid);
            const canTransition = await routeStateManager.canTransitionTo(stateName);

            if (!canTransition) {
              const currentState = await routeStateManager.getCurrentState();
              toast.error('You cannot access this page at this time');
              
              const currentConfig = currentState?.currentState 
                ? ROUTE_STATE_CONFIG[currentState.currentState as keyof typeof ROUTE_STATE_CONFIG]
                : null;
              
              navigate(currentConfig?.path || PUBLIC_ROUTES.LANDING);
              return;
            }

            await routeStateManager.transitionTo(stateName, {
              path: location.pathname,
              timestamp: new Date()
            });
          }

          setAuthorized(true);
        }
      } catch (error) {
        console.error('Error in route protection:', error);
        toast.error('There was a problem verifying your access');
        navigate(PUBLIC_ROUTES.SIGN_IN);
      } finally {
        setLoading(false);
      }
    };

    checkAuth(currentUser);
  }, [currentUser, navigate, stateName, requireAuth, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return authorized ? children : null;
}
