import React from 'react';
import { Rocket, PieChart, Users, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-yellow-400" />,
    title: 'Accelerated Growth',
    description: 'Boost your company\'s trajectory with our proven scaling strategies.',
  },
  {
    icon: <PieChart className="h-8 w-8 text-green-400" />,
    title: 'Funding Optimization',
    description: 'Maximize your funding potential with AI-driven pitch perfection.',
  },
  {
    icon: <Users className="h-8 w-8 text-blue-400" />,
    title: 'Strategic Partnerships',
    description: 'Connect with the right partners to amplify your market presence.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-purple-400" />,
    title: 'AI-Powered Insights',
    description: 'Leverage cutting-edge AI to make data-driven decisions for your business.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 bg-opacity-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Supercharge Your Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-700 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-filter backdrop-blur-lg"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-2 text-blue-300">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;