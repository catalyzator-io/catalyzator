import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-purple-900 mb-8">About Us</h1>
      
      <p className="mb-6 text-cool-purple">
        Welcome to Catalyzator (Grant) OS, the platform where ventures and their catalysts meet. We're not just a tool; we're the connective tissue of today's funding landscape, bridging innovative ventures with the organizations that fuel their success. Catalyzator OS redefines the funding journey, creating a streamlined and intelligent ecosystem that empowers both sides of the equation.
      </p>

      <div className="border-t border-b border-purple-200 py-8 my-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Transforming the Funding Experience</h2>
        
        <p className="mb-6 text-cool-purple">
          For ambitious ventures, securing funding shouldn't be complex or intimidating. Catalyzator OS simplifies the grant application process through conversational AI, enabling entrepreneurs to create compelling applications with natural, voice-first interactions. Our platform takes the guesswork out of funding, matching ventures with the right opportunities and helping them transform vision into reality.
        </p>
        
        <p className="mb-6 text-cool-purple">
          For Catalyzators—the grant programs, venture funds, VCs, and accelerators who support these ventures—Catalyzator OS provides a robust operating system that powers everything from application processing to portfolio management. By equipping Catalyzators with advanced assessment tools, automated analytics, and custom workflow management, we're helping them operate at their highest potential and amplify their impact on the innovation economy.
        </p>
      </div>

      <div className="border-b border-purple-200 py-8 mb-8">
        <h2 className="text-2xl font-bold text-purple-900 mb-4">Empowering Innovation and Connection</h2>
        
        <h3 className="text-xl font-semibold text-purple-900 mb-2">For Catalyzators (Funding Enablers):</h3>
        <p className="mb-4 text-cool-purple">
          Catalyzator OS is designed to serve the needs of those driving innovation forward. From AI-powered venture evaluation to impact analytics, our platform brings a new level of intelligence and efficiency to every stage of the funding process.
        </p>
        <ul className="list-disc list-inside mb-6 text-cool-purple">
          <li>Catalyzator OS: All-in-one grant application and management system</li>
          <li>Smart Venture Evaluation: AI-driven assessment and risk analysis</li>
          <li>Hidden Gems Detector: Intelligent recommendations for high-potential ventures</li>
          <li>Impact Analytics: Automated insights and real-time performance tracking</li>
          <li>Grant Application Filter: Smart screening and risk assessment</li>
          <li>Full-Suite CRM/ERP: Built specifically for funding organization workflows</li>
        </ul>

        <h3 className="text-xl font-semibold text-purple-900 mb-2">For Ventures (Fund Seekers):</h3>
        <p className="mb-4 text-cool-purple">
          We're dedicated to helping ventures navigate the funding process with ease and confidence. Catalyzator OS empowers founders to craft compelling applications, find ideal funding partners, and build the resources they need to succeed.
        </p>
        <ul className="list-disc list-inside mb-6 text-cool-purple">
          <li>Voice-to-Grant: Conversational AI that brings applications to life</li>
          <li>Grant Matchmaker: Smart engine for matching with funding opportunities</li>
          <li>VC Connect: Intelligent matching with venture capital partners</li>
          <li>Story Builder: AI-assisted pitch materials, from one-pagers to pitch decks</li>
          <li>Budget Builder: A powerful tool for structured grant budget planning</li>
          <li>Market Intelligence: Real-time competitive landscape insights</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold text-purple-900 mb-4">Catalyzator OS: The Backbone of the Innovation Economy</h2>
      
      <p className="mb-6 text-cool-purple">
        Through Catalyzator, we're creating a funding ecosystem that's efficient, transparent, and accessible. We believe that groundbreaking ideas deserve strong backing, and we're here to provide the tools that make that possible. Whether you're a venture seeking support or a Catalyzator driving success, Catalyzator OS is here to power your journey and amplify your impact.
      </p>

      <p className="font-semibold text-crazy-orange">
        Join us in transforming how innovation finds its catalyst. Together, we're building the future of funding.
      </p>
    </div>
  );
};

export default About;