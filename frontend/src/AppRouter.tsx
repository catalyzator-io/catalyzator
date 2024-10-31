// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RootRedirect } from './RootRedirect';
import { PUBLIC_ROUTES, PROTECTED_ROUTES } from './data/constants';

// Import your page components
import AuthPage from './pages/AuthPage';
import About from './pages/About';
// import TermsPage from '../pages/About';
// import PrivacyPage from '../pages/About';
import ProfilePage from './pages/Profile';
// import SettingsPage from '../pages/About';
import EntityOnboarding from './pages/EntityOnboarding';
import GrantForm from './pages/GrantForm';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path={PUBLIC_ROUTES.LANDING} element={<RootRedirect />} />

        {/* Public routes */}
        <Route path={PUBLIC_ROUTES.SIGN_IN} element={<AuthPage />} />
        <Route path={PUBLIC_ROUTES.ABOUT} element={<About />} />
        <Route path={PUBLIC_ROUTES.TERMS} element={<TermsOfService />} /> 
        <Route path={PUBLIC_ROUTES.PRIVACY} element={<PrivacyPolicy />} />

        {/* Protected routes that don't require specific stages */}
        <Route
          path={PROTECTED_ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path={PROTECTED_ROUTES.SETTINGS}
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        /> */}

        {/* Stage-specific protected routes */}
        <Route
          path={PROTECTED_ROUTES[0]}
          element={
            <ProtectedRoute requireStage={0}>
              <EntityOnboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROTECTED_ROUTES[1]}
          element={
            <ProtectedRoute requireStage={1}>
              <GrantForm />
            </ProtectedRoute>
          }
        />
        <Route
          path={PROTECTED_ROUTES[2]}
          element={
            <ProtectedRoute requireStage={2}>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;