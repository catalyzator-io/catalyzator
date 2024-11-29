// src/routes/Router.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { useAuth } from  './hooks/useAuth';
import { FORM_CONFIGS } from './constants/forms';
import formRoutes from './routes/form-routes';
import { dal } from './utils/dal/dal';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import AuthPage from './pages/AuthPage';
import { AboutPage } from './pages/public/AboutPage';
import TermsPage from './pages/public/TermsOfService';
import PrivacyPage from './pages/public/PrivacyPolicy';
import CustomerAgreementPage from './pages/public/CustomerAgreement';

function ConsentMiddleware() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasCheckedConsent, setHasCheckedConsent] = useState(false);
  
  React.useEffect(() => {
    const checkUserConsent = async () => {
      if (!currentUser?.uid) return;

      try {
        const userData = await dal.user.getUser(currentUser.uid);
        const hasAcceptedTerms = userData?.hasAcceptedTerms ?? false;
        const hasEntity = userData?.profile.entity_ids?.length > 0;
        
        const publicPaths = ['/signin', '/about', '/terms', '/privacy', '/customers'];
        const isPublicPath = publicPaths.includes(location.pathname);
        const isConsentPath = location.pathname === FORM_CONFIGS.user_consent.url;
        const isRegistrationPath = location.pathname === FORM_CONFIGS.entity_registration.url;

        // If user hasn't accepted terms and isn't on a public/consent path
        if (!hasAcceptedTerms && !isPublicPath && !isConsentPath) {
          navigate(FORM_CONFIGS.user_consent.url);
        }
        // If user has accepted terms but has no entity and isn't on registration path
        else if (hasAcceptedTerms && !hasEntity && !isPublicPath && !isRegistrationPath) {
          navigate(FORM_CONFIGS.entity_registration.url);
        }

        setHasCheckedConsent(true);
      } catch (error) {
        console.error('Error checking user consent:', error);
      }
    };

    checkUserConsent();
  }, [currentUser?.uid, location.pathname, navigate]);

  // Don't render routes until we've checked consent
  if (!hasCheckedConsent && currentUser) {
    return null;
  }

  return null;
}

function AppRoutes() {
  return (
    <>
      <ConsentMiddleware />
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/customers" element={<CustomerAgreementPage />} />

        {/* Form routes */}
        {formRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default AppRouter;