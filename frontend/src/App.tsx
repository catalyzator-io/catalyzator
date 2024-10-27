import React from 'react';
import HomePage from './pages/HomePage';
import GrantForm from './pages/GrantForm';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (

    <Router>
      <Routes>
     
        <Route path="/" element={<HomePage />} />
        <Route path="/onboarding" element={<GrantForm />} />
        <Route path="/about" element={<About />} />

      </Routes>
  </Router>
  ) 
}

export default App;
