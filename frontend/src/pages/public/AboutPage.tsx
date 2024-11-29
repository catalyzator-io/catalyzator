import React from 'react';
import { PublicLayout } from '../../components/layout/PublicLayout';
import { motion } from 'framer-motion';
import { FOUNDERS } from '../../constants/founders';
import { WaveBackground } from '../../components/visuals/WaveBackground';
import { Linkedin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
        <div className="relative">
          <WaveBackground />
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 mb-4">
                About Catalyzator.io
              </h1>
              <p className="text-xl text-purple-700">
                Connecting promising startups with grants and angel investors through AI
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-purple max-w-none"
              >
                <h2 className="text-3xl font-bold text-purple-900 mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700">
                  We envision a future where every innovative idea has the opportunity 
                  to secure the funding it deserves. Our platform bridges the gap between 
                  visionary entrepreneurs and grant providers, creating a more dynamic 
                  and efficient funding ecosystem.
                </p>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="prose prose-purple max-w-none"
              >
                <h2 className="text-3xl font-bold text-purple-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700">
                  Our mission is to revolutionize how startups and organizations 
                  access funding opportunities. By leveraging cutting-edge AI technology, 
                  we're able to streamline the grant application process, making it more 
                  efficient and effective.
                </p>
              </motion.section>
            </div>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            >
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  For Innovators
                </h3>
                <p className="text-gray-700">
                  Whether you're a startup, non-profit, or research organization, 
                  we're here to help bring your vision to life. Transform your spoken 
                  pitches into professional grant applications with our Pitch-to-Grant 
                  technology, discover perfect opportunities through our Compass engine, 
                  and connect with relevant angels via FundMatch after grant approval.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  For Catalysts
                </h3>
                <p className="text-gray-700">
                  Access quality deal flow with grant-approved startups and promising 
                  applicants. Our pre-approval system allows early commitment to startups 
                  during their application phase, ensuring you don't miss out on the next 
                  big innovation.
                </p>
              </div>
            </motion.section>
          </div>
        </div>

        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
            <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {FOUNDERS.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  className="bg-white rounded-xl shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                >
                  <img
                    src={founder.profilePicture}
                    alt={founder.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-purple-900 text-center mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-crazy-orange text-center mb-3">{founder.title}</p>
                  <div className="flex justify-center gap-4">
                    {founder.linkedin && (
                      <a
                        href={founder.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-purple-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div> */}
      </div>
    </PublicLayout>
  );
}; 