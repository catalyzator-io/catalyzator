import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Features from './components/Features';
import AppShowcase from './components/AppShowcase';
import CallToAction from './components/CallToAction';
import Testimonials from './components/Testimonials';
import About from './components/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cool-black text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <AppShowcase />
              <Features />
              <Testimonials />
              <CallToAction />
            </>
          } />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
