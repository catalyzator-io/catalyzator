import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { HelpAndLinks } from './HelpAndLinks';

export const Footer: React.FC = () => (
  <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-900 rounded-t-xl shadow-lg">
    <div className="max-w-3xl mx-auto text-center">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-3 text-white">Ready to Catalyze Your Success?</h2>
        <p className="text-lg mb-6 text-orange-200">Join the ranks of fast-growing companies that have accelerated their journey with Catalyzator.io</p>
        <Button
          asChild
          variant="default"
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <Link to="/auth?action=signup">Get Started Now →</Link>
        </Button>
      </div>
      <HelpAndLinks variant="footer" />
    </div>
  </footer>
); 