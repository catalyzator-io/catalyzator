import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const slides = [
  {
    title: "Skip The Forms.",
    subtitle: "Just Talk with Catalyzator",
    image: "/app-showcase.jpeg",
  },
  {
    title: "AI-Powered Insights",
    subtitle: "Get Smart Recommendations",
    image: "/app-showcase.jpeg",
  },
  {
    title: "Track Your Success",
    subtitle: "Monitor Your Applications",
    image: "/app-showcase.jpeg",
  },
];

const AppShowcase: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto rounded-3xl p-8 shadow-lg relative z-10 bg-gradient-to-r from-soft-orange to-crazy-orange">

        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-3/5 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-white">
              {slides[currentSlide].title}
            </h2>
            <h2 className="text-5xl font-bold mb-6 text-cool-purple">
              {slides[currentSlide].subtitle}
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
                src={slides[currentSlide].image}
                alt={`Catalyzator.io - ${slides[currentSlide].title}`}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index
                  ? 'bg-cool-purple'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
