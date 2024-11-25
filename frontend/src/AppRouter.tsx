// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfilePage } from './pages/app/ProfilePage';
import { ScrollToTop } from './components/utils/ScrollToTop';
import formRoutes from './routes/form-routes';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import AuthPage from './pages/AuthPage';
import { AboutPage } from './pages/public/AboutPage';
import TermsPage from './pages/public/TermsOfService';
import PrivacyPage from './pages/public/PrivacyPolicy';
import CustomerAgreementPage from './pages/public/CustomerAgreement';
// App pages
import { HomePage } from './pages/app/HomePage';
import PitchToGrant from './pages/app/PitchToGrant';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/customers" element={<CustomerAgreementPage />} />

        {/* Protected routes */}
        <Route path="/app" element={<HomePage />} />
        <Route path="/pitch-to-grant/*" element={<PitchToGrant />} />
        <Route path="/profile" element={<ProfilePage />} />

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
    </BrowserRouter>
  );
};

export default AppRouter;