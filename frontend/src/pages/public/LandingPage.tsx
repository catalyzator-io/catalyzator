import React from 'react';
import Header from '../../components/Header';
import Features from '../../components/Features';
import AppShowcase from '../../components/AppShowcase';
// FIXME: Add testimonials when we have some
// import Testimonials from '../../components/Testimonials';
import { PublicLayout } from '../../components/layout/PublicLayout';

export const LandingPage: React.FC = () => {
  return (
    <PublicLayout>
      <Header />
      <AppShowcase />
      <Features />
      {/* FIXME: Add testimonials when we have some */}
      {/* <Testimonials /> */}
    </PublicLayout>
  );
}; 