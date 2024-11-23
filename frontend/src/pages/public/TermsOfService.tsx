import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';

const TermsOfService: React.FC = () => {
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4  pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      {/* TODO: Replace with actual terms of service content */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>[Explain terms acceptance]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p>[Detail usage rights and restrictions]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
          <p>[Include service disclaimers]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
          <p>[Explain liability limitations]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Governing Law</h2>
          <p>[Specify applicable laws]</p>
        </section>
      </div>
      </div>
    </PublicLayout>
  );
};

export default TermsOfService;