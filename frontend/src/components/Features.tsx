import React from 'react';
import { Mic, Brain, Target, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Mic className="h-8 w-8 text-soft-orange" />,
    title: 'Voice-First Application Builder',
    description: 'Simply speak your vision and watch as AI transforms your words into professional grant applications in real-time.',
  },
  {
    icon: <Brain className="h-8 w-8 text-soft-orange" />,
    title: 'Smart Narrative Optimization',
    description: 'Our AI understands your unique story and automatically crafts compelling narratives that align perfectly with grant requirements.',
  },
  {
    icon: <Target className="h-8 w-8 text-soft-orange" />,
    title: 'Precision Grant Matching',
    description: 'Get matched with the perfect funding opportunities through our AI that analyzes your business profile against thousands of grant criteria.',
  },
  {
    icon: <Clock className="h-8 w-8 text-soft-orange" />,
    title: 'From Days to Minutes',
    description: 'Complete comprehensive grant applications in under 5 minutes through simple voice conversations with our AI assistant.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
      </motion.div>
      <div className="max-w-8xl mx-auto bg-gradient-to-r from-pale-pink to-purple-900 rounded-3xl p-8 shadow-lg">
      <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start p-6 rounded-lg shadow-md bg-cool-purple hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex-shrink-0 mr-4">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.h2
                className="text-5xl font-bold text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              Fund Your Venture <span className="text-soft-orange">Effortlessly</span> Through AI
            </motion.h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
