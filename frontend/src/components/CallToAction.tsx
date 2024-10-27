import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-900 rounded-t-xl shadow-lg">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">Ready to Catalyze Your Success?</h1>
        <h2 className="text-xl mb-8 text-soft-orange">Join the ranks of fast-growing companies that have accelerated their journey with Catalyzator.io</h2>
        <a
          href="#"
          className="btn bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
        >
          Get Started Now →
        </a>
      </div>
    </section>
  );
};

export default CallToAction;