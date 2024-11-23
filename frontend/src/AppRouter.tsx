// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PROTECTED_ROUTES } from './constants/routes';
import { ProfilePage } from './pages/app/ProfilePage';

// Public pages
import { LandingPage } from './pages/public/LandingPage';
import AuthPage from './pages/AuthPage';
import { AboutPage } from './pages/public/AboutPage';

// App pages
import { HomePage } from './pages/app/HomePage';
import { WaitlistPage } from './pages/app/WaitlistPage';
import PitchToGrant from './pages/app/PitchToGrant';
import { WaitlistCatalog } from './pages/app/WaitlistCatalog';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Protected routes */}
        <Route path="/app" element={<HomePage />} />
        <Route path="/waitlist/:productId" element={<WaitlistPage />} />
        <Route path="/waitlist" element={<WaitlistCatalog />} />
        <Route path="/pitch-to-grant/*" element={<PitchToGrant />} />
        <Route path={PROTECTED_ROUTES.PROFILE} element={<ProfilePage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;