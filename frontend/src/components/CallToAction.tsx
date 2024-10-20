import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-4">Ready to Catalyze Your Success?</h2>
        <p className="text-xl mb-8">Join the ranks of fast-growing companies that have accelerated their journey with Catalyzator.io</p>
        <a
          href="#"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Get Started Now
          <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default CallToAction;