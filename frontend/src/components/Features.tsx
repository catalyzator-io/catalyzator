import { motion } from 'framer-motion';
import { 
  Target, 
  FileText, 
  Clock, 
  BarChart3, 
  Users, 
  Terminal, 
  Search, 
  Mic 
} from 'lucide-react';

const Features: React.FC = () => {
  const sections = [
    {
      title: 'Fund Your Venture Effortlessly Through AI',
      subtitle: 'Powerful tools to accelerate your success',
      items: [
        { 
          icon: <Target className="h-6 w-6" />, 
          title: "Navigator",
          description: "Find your perfect funding path"
        },
        { 
          icon: <FileText className="h-6 w-6" />, 
          title: "LaunchSuite",
          description: "Complete startup toolkit from pitch to documentation"
        },
        { 
          icon: <BarChart3 className="h-6 w-6" />, 
          title: "MarketRadar",
          description: "Real-time market intelligence and analysis"
        }
      ],
      isTextRight: false
    },
    {
      title: 'Catalyze Your Catalyzator',
      subtitle: 'Streamline your operations with advanced tools',
      items: [
        { 
          icon: <Terminal className="h-6 w-6" />, 
          title: "CatalyzatorOS",
          description: "Streamline your entire workflow"
        },
        { 
          icon: <Search className="h-6 w-6" />, 
          title: "ImpactView",
          description: "Track portfolio performance in real-time"
        },
        { 
          icon: <Users className="h-6 w-6" />, 
          title: "GrantMatch",
          description: "Connect with promising ventures instantly"
        },
        { 
          icon: <Clock className="h-6 w-6" />, 
          title: "InsightsConnect",
          description: "Data-driven decision making tools"
        }
      ],
      isTextRight: true
    }
  ];

  return (
    <section className="pt-8 sm:pt-16 pb-12 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto rounded-xl sm:rounded-3xl border border-purple-200 overflow-hidden">
        {/* Pitch-to-Grant Hero Section */}
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
                    From Voice to 
                    <span className="text-crazy-orange"> Grant Success</span>
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700 mb-6 sm:mb-8">
                    Let AI transform your spoken story into winning grant applications.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full sm:w-auto bg-crazy-orange text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg transition-shadow"
                    onClick={() => window.location.href = '/onboarding'}
                  >
                    Start Your Journey →
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Other Ventures Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-300 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start"
            >
              <div className="w-full md:w-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left mb-8 md:mb-0"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 leading-tight">
                    {sections[0].title}
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700">
                    {sections[0].subtitle}
                  </p>
                </motion.div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
                  {sections[0].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex flex-col p-4 sm:p-6 border border-purple-200 rounded-lg hover:border-soft-orange hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="text-soft-orange mb-3 sm:mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-cool-purple">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catalyzator Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-white to-purple-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row-reverse gap-8 sm:gap-12 items-start"
            >
              <div className="w-full md:w-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left mb-8 md:mb-0"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-purple-900 mb-3 sm:mb-4 leading-tight">
                    {sections[1].title}
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700">
                    {sections[1].subtitle}
                  </p>
                </motion.div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  {sections[1].items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="flex flex-col p-4 sm:p-6 border border-purple-200 rounded-lg hover:border-soft-orange hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                    >
                      <div className="text-soft-orange mb-3 sm:mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-purple-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-cool-purple">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Features;