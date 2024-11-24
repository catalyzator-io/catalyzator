import React from 'react';
import Header from '../../components/landing_page/Header';
import Features from '../../components/landing_page/Features';
import AppShowcase from '../../components/landing_page/AppShowcase';
// FIXME: Add testimonials when we have some
// import Testimonials from '../../components/Testimonials';
import { PublicLayout } from '../../components/layout/PublicLayout';

export const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      <Header />
      <div className="h-24"></div>
      <AppShowcase />
      <div className="h-24"></div>
      <Features />
      <div className="h-24"></div>
      {/* FIXME: Add testimonials when we have some */}
      {/* <Testimonials /> */}
    </PublicLayout>
  );
}; 