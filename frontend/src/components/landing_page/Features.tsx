import { motion } from 'framer-motion';
import { Mic, Compass, HandshakeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Features: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <section className="pt-8 sm:pt-16 pb-12 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto rounded-xl sm:rounded-3xl border border-purple-200 overflow-hidden">
        {/* Pitch-to-Grant Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-br from-white to-purple-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 sm:gap-12"
            >
              <div className="w-full md:w-1/2 order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-purple-200"
                >
                  {/* Voice Interface Visualization */}
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="w-full sm:w-3/4 h-full sm:h-3/4 bg-white rounded-lg shadow-lg p-3 sm:p-4">
                        <div className="h-2 w-16 sm:w-24 bg-purple-200 rounded mb-2 sm:mb-3"></div>
                        <div className="h-2 w-20 sm:w-32 bg-purple-100 rounded mb-2 sm:mb-3"></div>
                        <div className="h-2 w-14 sm:w-20 bg-purple-100 rounded"></div>
                        <div className="mt-3 sm:mt-4 flex items-center space-x-2">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-soft-orange flex items-center justify-center">
                            <Mic className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                          </div>
                          <div className="flex-1 h-2 bg-purple-100 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 leading-tight">
                    Pitch-to-Grant
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700 mb-6">
                    Transform your spoken pitch into professional grant applications instantly
                  </p>
                  <Link
                    to={currentUser ? "/app/pitch" : "/auth?action=signup"}
                    className="btn btn-primary"
                  >
                    Start Your Application →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compass Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-br from-white to-purple-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse items-center gap-8 sm:gap-12"
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200"
                >
                  <div className="flex justify-center">
                    <Compass className="w-24 h-24 text-purple-600" />
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 leading-tight">
                    Compass
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700 mb-6">
                    Smart grant recommendation engine powered by Tnufa data
                  </p>
                  <Link
                    to={currentUser ? "/app/compass" : "/auth?action=signup"}
                    className="btn btn-primary"
                  >
                    Discover Grants →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FundMatch Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-300 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 sm:gap-12"
            >
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200"
                >
                  <div className="flex justify-center">
                    <HandshakeIcon className="w-24 h-24 text-purple-600" />
                  </div>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 leading-tight">
                    FundMatch for Angels
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700 mb-6">
                    Access a curated pipeline of grant-approved startups and promising applicants
                  </p>
                  <Link
                    to={currentUser ? "/app/fundmatch" : "/auth?action=signup"}
                    className="btn btn-primary"
                  >
                    Access Deal Flow →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Features;