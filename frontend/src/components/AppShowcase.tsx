import React from 'react';
import { motion } from 'framer-motion';

const AppShowcase: React.FC = () => {
  return (
    <section className="pt-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
      </motion.div>
      <div className="max-w-8xl mx-auto bg-gradient-to-r from-soft-orange to-crazy-orange rounded-3xl p-8 shadow-lg relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-3/5 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-white">
              Skip The Forms.
            </h2>
            <h2 className="text-5xl font-bold mb-6 text-cool-purple">
              Just Talk with <span className="text-white">Catalyzator</span>
            </h2>
          </motion.div>
          <motion.div
            className="md:w-2/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="rounded-lg overflow-hidden shadow-md bg-cool-purple hover:shadow-lg transition-all duration-300">
              <img
                src="/app-showcase.jpeg"
                alt="Catalyzator.io app showcase"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
