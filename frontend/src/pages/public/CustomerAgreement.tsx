import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { WaveBackground } from '../../components/visuals/WaveBackground';

const CustomerAgreement: React.FC = () => {
  return (
    <PublicLayout>
      <WaveBackground />
      <div>
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Customer Agreement</h1>
      
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Terms of Service</h2>
            <p>[Outline general terms and conditions]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. User Responsibilities</h2>
            <p>[Detail user obligations and responsibilities]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Service Usage</h2>
            <p>[Explain service usage terms and limitations]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
            <p>[Describe payment policies and procedures]</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">5. Termination</h2>
            <p>[Explain termination conditions and process]</p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default CustomerAgreement;