import React from 'react';
import CallToAction from '../components/CallToAction';

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      {/* TODO: Replace with actual privacy policy content */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p>[Describe the types of information collected]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>[Explain data usage practices]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
          <p>[Detail sharing policies]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p>[Explain security measures]</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
          <p>[List user rights regarding their data]</p>
        </section>
      </div>
    </div>
    <CallToAction />
    </div>
  );
};

export default PrivacyPolicy;