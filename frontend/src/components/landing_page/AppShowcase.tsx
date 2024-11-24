import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    title: "Skip The Forms.",
    subtitle: "Just Talk with Catalyzator",
    image: "/PitchToGrant.png",
  },
  {
    title: "For Founders, by Founders.",
    subtitle: "Tools to Take You from Zero to Launch",
    image: "/LaunchSuite.png",
  },
  {
    title: "Connecting Startups to Catalysts.",
    subtitle: "Find the Right Funding, Instantly",
    image: "/GrantMatch.png",
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
    <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent"></div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="relative rounded-3xl bg-gradient-to-br from-orange-100 to-orange-200/80 border border-orange-200 shadow-xl overflow-hidden backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]"></div>
          
          <div className="relative p-8 sm:p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-4xl sm:text-5xl font-bold">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-crazy-orange to-orange-500">
                        {slides[currentSlide].title}
                      </span>
                    </h2>
                    <p className="text-2xl sm:text-3xl text-purple-900/80 font-light">
                      {slides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full md:w-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/80 to-orange-100/80 p-2 shadow-lg">
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-[400px] object-contain rounded-lg"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-crazy-orange w-6'
                      : 'bg-orange-300 hover:bg-orange-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <div className="absolute -z-10 inset-y-0 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-300/30 to-purple-300/30 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 inset-y-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/30 to-orange-300/30 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white"></div>
    </section>
  );
};

export default AppShowcase;
