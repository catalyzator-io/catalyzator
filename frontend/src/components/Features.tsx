import React from 'react';
import { Rocket, PieChart, Users, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Rocket className="h-8 w-8 text-soft-orange" />,
    title: 'Automated Grant Applications',
    description: 'Streamline your funding process with our intelligent AI models. Go from pitch deck to grant form in a split second!',
  },
  {
    icon: <PieChart className="h-8 w-8 text-soft-orange" />,
    title: 'AI-Driven Partnership Opportunities',
    description: 'Discover valuable partnerships with like-minded founders and businesses. Collaborate and grow with access to an AI-enhanced network designed for success.',
  },
  {
    icon: <Users className="h-8 w-8 text-soft-orange" />,
    title: 'Tailored AI Grant Matching',
    description: 'Leverage our smart AI matching technology that identifies grants fitting your specific needs and goals, ensuring you maximize your funding potential.',
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-soft-orange" />,
    title: 'Expert Resources & AI Guidance',
    description: 'Access a wealth of knowledge, from funding strategies to pitch techniques, empowered by AI to help you navigate the venture landscape confidently.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-cyber-green rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 bg-vibrant-orange rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      </motion.div>
      <div className="max-w-8xl mx-auto bg-pale-pink rounded-3xl p-8 shadow-lg">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-cool-purple"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Supercharge Your Venture
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="max-w-4xl p-6 rounded-lg shadow-md bg-cool-purple hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-white ml-4 text-gray-800">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
