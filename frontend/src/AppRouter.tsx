// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProfilePage } from './pages/app/ProfilePage';
import { ScrollToTop } from './components/utils/ScrollToTop';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import AuthPage from './pages/AuthPage';
import { AboutPage } from './pages/public/AboutPage';
import TermsPage from './pages/public/TermsOfService';
import PrivacyPage from './pages/public/PrivacyPolicy';
import CustomerAgreementPage from './pages/public/CustomerAgreement';
// App pages

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
        <Route path="/profile" element={<ProfilePage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;