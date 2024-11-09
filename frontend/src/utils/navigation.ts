import { NavigateFunction } from 'react-router-dom';

export function navigateToProtectedRoute(
  navigate: NavigateFunction,
  route: string,
  isAuthenticated: boolean
) {
  if (!isAuthenticated) {
    navigate('/signin', {
      state: { from: route }
    });
    return;
  }
  
  navigate(route);
} 