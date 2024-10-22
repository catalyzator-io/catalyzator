import React from 'react';
import { ArrowRight } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-cool-gray">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 sub-title">Ready to Catalyze Your Success?</h2>
        <p className="text-xl mb-8 text-gray-600">Join the ranks of fast-growing companies that have accelerated their journey with Catalyzator.io</p>
        <a
          href="#"
          className="btn btn-primary inline-flex items-center text-lg"
        >
          Get Started Now
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </section>
  );
};

export default CallToAction;