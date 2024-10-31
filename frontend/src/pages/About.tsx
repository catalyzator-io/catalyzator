import React from 'react';
import { Mic, Target, Brain, Clock, FileText } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-purple-200">
        <h1 className="text-6xl font-bold text-purple-900 mb-8">
          Bridging Dreams to Reality: The Catalyzator.io Story
        </h1>
        <p className="text-2xl text-cool-purple leading-relaxed">
          At Catalyzator.io, we're revolutionizing how innovation finds its wings. Through our pioneering AI technology, we're creating a comprehensive ecosystem where groundbreaking ideas meet the resources they need to soar, starting with our flagship product: Pitch-to-Grant.
        </p>
      </section>

      {/* Current Innovation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-purple-200 bg-gradient-to-br from-white to-purple-50">
        <h2 className="text-5xl font-bold text-purple-900 mb-8">Our Current Innovation: Pitch-to-Grant</h2>
        <p className="text-2xl text-cool-purple mb-12 leading-relaxed">
          We understand that great ideas deserve strong backing. Our AI-powered Pitch-to-Grant platform transforms the complex world of grant applications into an effortless journey, making funding accessibility a reality through:
        </p>
        <ul className="space-y-8 mb-12">
          {[
            { icon: <Mic className="text-soft-orange h-8 w-8" />, text: "Voice-First Interaction: Share your story through natural conversations, and watch as our AI transforms your words into compelling grant narratives" },
            { icon: <Target className="text-soft-orange h-8 w-8" />, text: "Intelligent Grant Matching: Find the perfect funding opportunities aligned with your venture's unique characteristics" },
            { icon: <Brain className="text-soft-orange h-8 w-8" />, text: "AI-Powered Content Optimization: Create strategic, well-articulated applications that highlight your potential while ensuring compliance" },
            { icon: <Clock className="text-soft-orange h-8 w-8" />, text: "Real-Time Tracking: Stay informed with comprehensive application monitoring and timely updates" },
            { icon: <FileText className="text-soft-orange h-8 w-8" />, text: "Smart Document Management: Keep all your grant-related documentation organized and accessible" }
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-6 group">
              <div className="mt-1 transform transition-transform group-hover:scale-110">{item.icon}</div>
              <p className="text-xl text-cool-purple leading-relaxed">{item.text}</p>
            </li>
          ))}
        </ul>
        <p className="text-xl text-cool-purple leading-relaxed italic">
          We're beginning our journey with the Israeli Innovation Authority's Tnufa grant program, proving our concept where it matters most.
        </p>
      </section>

      {/* Future Ecosystem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-purple-200">
        <h2 className="text-5xl font-bold text-purple-900 mb-8">Coming Soon: A Complete Innovation Ecosystem</h2>
        <p className="text-2xl text-cool-purple mb-12 leading-relaxed">
          We're building towards a comprehensive suite of solutions for both ventures and catalysts:
        </p>
        
        <div className="space-y-20">
          {/* For Ventures */}
          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-8">For Ventures:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { 
                  icon: <Target className="h-10 w-10" />, 
                  title: "Navigator",
                  description: "Chart your course through the funding landscape with precision"
                },
                { 
                  icon: <FileText className="h-10 w-10" />, 
                  title: "LaunchSuite",
                  description: "Access a complete toolkit for startup success, from pitch deck creation to documentation management"
                },
                { 
                  icon: <Brain className="h-10 w-10" />, 
                  title: "MarketRadar",
                  description: "Stay ahead with real-time market intelligence and competitive analysis"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-8 border-2 border-purple-200 rounded-xl hover:border-soft-orange hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-soft-orange mb-6">{item.icon}</div>
                  <h4 className="text-2xl font-semibold text-purple-900 mb-4">{item.title}</h4>
                  <p className="text-lg text-cool-purple leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* For Catalysts */}
          <div>
            <h3 className="text-3xl font-bold text-purple-900 mb-8">For Catalysts:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { 
                  icon: <FileText className="h-10 w-10" />, 
                  title: "CatalyzatorOS",
                  description: "A comprehensive operating system streamlining your entire workflow"
                },
                { 
                  icon: <Target className="h-10 w-10" />, 
                  title: "ImpactView",
                  description: "Generate deep insights into your portfolio's performance"
                },
                { 
                  icon: <Brain className="h-10 w-10" />, 
                  title: "GrantMatch",
                  description: "Connect with promising ventures through intelligent matching"
                },
                { 
                  icon: <Clock className="h-10 w-10" />, 
                  title: "InsightsConnect",
                  description: "Access powerful data analytics for informed decision-making"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-8 border-2 border-purple-200 rounded-xl hover:border-soft-orange hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-soft-orange mb-6">{item.icon}</div>
                  <h4 className="text-2xl font-semibold text-purple-900 mb-4">{item.title}</h4>
                  <p className="text-lg text-cool-purple leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Catalyzator Difference Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-purple-200 bg-gradient-to-br from-white to-purple-50">
        <h2 className="text-5xl font-bold text-purple-900 mb-12">The Catalyzator Difference</h2>
        <ul className="grid md:grid-cols-2 gap-8">
          {[
            "Intuitive AI-powered interfaces that understand your unique story",
            "Comprehensive ecosystem supporting both ventures and catalysts",
            "Real-time tracking and analytics for informed decision-making",
            "Voice-first, conversation-driven processes that feel natural",
            "End-to-end support from ideation to implementation"
          ].map((item, index) => (
            <li key={index} className="flex items-start space-x-4 group">
              <span className="inline-block w-3 h-3 mt-2 rounded-full bg-soft-orange transform transition-transform group-hover:scale-125"></span>
              <span className="flex-1 text-xl text-cool-purple leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold text-purple-900 mb-8">Let's Catalyze Change Together</h2>
        <div className="space-y-8">
          <p className="text-2xl text-cool-purple leading-relaxed">
            Whether you're a venture seeking funding or a catalyst looking to revolutionize how you support innovation, we invite you to be part of our journey. Our current focus on Pitch-to-Grant is just the beginning – we're building a future where funding accessibility knows no bounds.
          </p>
          <p className="text-2xl text-cool-purple leading-relaxed">
            Ready to transform the funding landscape together? Contact us at{' '}
            <a href="mailto:partners@catalyzator.io" className="text-soft-orange hover:underline font-semibold">
              partners@catalyzator.io
            </a>
            {' '}to explore collaboration opportunities or visit our website to learn more about our current offerings and future roadmap.
          </p>
          <p className="text-2xl font-semibold text-purple-900 leading-relaxed">
            Together, let's make the future of innovation funding more efficient, transparent, and accessible – one breakthrough at a time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
