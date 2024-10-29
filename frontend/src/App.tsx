import React from 'react';
import HomePage from './pages/HomePage';
import GrantForm from './pages/GrantForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';


function App() {
  return (

    <Router>
      <Routes>
     
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<GrantForm />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
  </Router>
  ) 
}

export default App;
