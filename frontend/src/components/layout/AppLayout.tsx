import React from 'react';
import NavBar from '../NavBar';
import { AppSidebar } from './AppSidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col">
        <div className="flex flex-1 pt-16">
          {showSidebar && <AppSidebar />}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}; 