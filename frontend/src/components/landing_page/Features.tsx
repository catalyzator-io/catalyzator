import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PitchToGrantVisual, CompassVisual, FundMatchVisual } from '../visuals/FeatureVisuals';
import { FORM_CONFIGS } from '../../constants/forms';

const Features: React.FC = () => {
  const { currentUser } = useAuth();

  // Helper function to get the correct form URL based on feature
  const getFeatureFormUrl = (feature: string) => {
    if (!currentUser) return '/signin';
    
    switch (feature) {
      case 'pitch':
        // For Pitch-to-Grant, we'll use innovator_introduction form
        return FORM_CONFIGS.innovator_introduction.url;
      case 'compass':
        // For Compass, we'll use past_applications form
        return FORM_CONFIGS.past_applications.url;
      case 'fundmatch':
        // For FundMatch, we'll use angel_investor_interest form
        return FORM_CONFIGS.angel_investor_interest.url;
      default:
        return '/';
    }
  };

  return (
    <section className="pt-8 sm:pt-16 pb-12 sm:pb-24 px-4 sm:px-6 lg:px-8" id="features">
      <div className="max-w-8xl mx-auto rounded-xl sm:rounded-3xl border border-purple-200 overflow-hidden">
        {/* Pitch-to-Grant Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-br from-purple-300 to-white">
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
                  <PitchToGrantVisual />
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
                  <p className="text-lg sm:text-xl text-crazy-orange mb-6">
                    Transform your spoken pitch into professional grant applications instantly
                  </p>
                  <Link
                    to={getFeatureFormUrl('pitch')}
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
                  className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-purple-200"
                >
                  <CompassVisual />
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
                  <p className="text-lg sm:text-xl text-crazy-orange mb-6">
                    Smart grant recommendation engine for past Tnufa applicants
                  </p>
                  <Link
                    to={getFeatureFormUrl('compass')}
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
                  className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl border border-purple-200"
                >
                  <FundMatchVisual />
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
                    FundMatch for <span className="text-purple-600">Angel Investors</span>
                  </h2>
                  <p className="text-lg sm:text-xl text-crazy-orange mb-6">
                    Access a curated pipeline of grant-approved startups and promising applicants
                  </p>
                  <Link
                    to={getFeatureFormUrl('fundmatch')}
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