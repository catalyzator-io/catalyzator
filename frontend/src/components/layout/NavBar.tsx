import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { DesktopNavbar } from './navbar/DesktopNavbar';
import { NavbarMobileMenu } from './navbar/NavbarMobileMenu';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const NavBar: React.FC = () => {
  const { currentUser, signOut, loading } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("See you next time!")
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        const protectedPaths = ['/app/profile', '/onboarding'];
        if (protectedPaths.some(path => location.pathname.startsWith(path))) {
          navigate('/signin', { 
            replace: true,
            state: { from: location.pathname }
          });
        }
      }
    }
  }, [currentUser, loading, navigate, location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {isMobile ? (
        <NavbarMobileMenu 
          isAuthenticated={!!currentUser} 
          onSignOut={handleSignOut}
          isLandingPage={isLandingPage}
        />
      ) : (
        <DesktopNavbar 
          currentUser={currentUser}
          loading={loading}
          onSignOut={handleSignOut}
          isLandingPage={isLandingPage}
        />
      )}
    </nav>
  );
};

export default NavBar;