import React from 'react';

const CallToAction: React.FC = () => (
  <section className="py-12 px-4 sm:px-6 lg:px-8 bg-purple-900 rounded-t-xl shadow-lg">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-3 text-white">Ready to Catalyze Your Success?</h1>
      <h2 className="text-lg mb-6 text-soft-orange">Join the ranks of fast-growing companies that have accelerated their journey with Catalyzator.io</h2>
      <a href="#" className="btn bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors">Get Started Now →</a>
      
      <div className="mt-8 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
          <p className="text-soft-orange mb-2">Our team is here to answer your questions</p>
          <a href="mailto:contact@catalyzator.io" className="text-orange-400 hover:text-orange-300 underline">Contact Us</a>
        </div>
        <div className="text-sm text-gray-300">
          <a href="/privacy-policy" className="hover:text-white mx-2">Privacy Policy</a>
          <span>•</span>
          <a href="/terms-of-service" className="hover:text-white mx-2">Terms of Service</a>
          <span>•</span>
          <a href="/customer-agreement" className="hover:text-white mx-2">Customer Agreement</a>
        </div>
      </div>
    </div>
  </section>
);

export default CallToAction;