import React from 'react';
import Header from './components/Header';
import Features from './components/Features';
import CallToAction from './components/CallToAction';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <Header />
      <Features />
      <CallToAction />
    </div>
  );
}

export default App;