import React from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Features from '../components/Features';
import AppShowcase from '../components/AppShowcase';
import CallToAction from '../components/CallToAction';
import Testimonials from '../components/Testimonials';


function HomePage() {
  return (

    <div className="min-h-screen bg-cool-black text-white">


      <NavBar />
      <Header />
      <AppShowcase />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

export default HomePage;
