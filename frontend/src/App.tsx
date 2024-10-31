import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import GrantForm from './pages/GrantForm';
import ChatPage from './pages/ChatPage';
import About from './pages/About';
import Profile from './pages/Profile';
import AuthPage from './pages/AuthPage';
import EntityOnboarding from './pages/EntityOnboarding';
import AppRouter
 from './AppRouter';
const App: React.FC = () => {
  return (
    <AppRouter />
  );
};

export default App;
