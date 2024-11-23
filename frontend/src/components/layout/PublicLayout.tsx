import React from 'react';
import NavBar from './navbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="flex-1 pt-16">
        <main>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}; 