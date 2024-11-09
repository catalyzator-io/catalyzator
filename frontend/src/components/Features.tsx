import { motion } from 'framer-motion';
import { ProductCard } from './products/ProductCard';
import { PRODUCTS } from '../constants/products';
import { Mic } from 'lucide-react';

const Features: React.FC = () => {
  const catalyzateeProducts = PRODUCTS.filter(p => p.category === 'catalyzatee');
  const catalyzatorProducts = PRODUCTS.filter(p => p.category === 'catalyzator');
  const pitchToGrantProduct = PRODUCTS.find(p => p.id === 'pitch-to-grant');

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
                  {pitchToGrantProduct && (
                    <ProductCard 
                      product={pitchToGrantProduct}
                      variant="landing"
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catalyzatee Section */}
        <section className="py-12 sm:py-24 bg-gradient-to-br from-white to-purple-300">
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
                    Fund Your Venture Effortlessly Through AI
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700">
                    Powerful tools to accelerate your success
                  </p>
                </motion.div>
              </div>
            

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full md:w-2/3">
              {catalyzateeProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <ProductCard 
                    product={product}
                    variant="landing"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Catalyzator Section */}
        <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-300 to-white">
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
                    Catalyze Your Catalyzator
                  </h2>
                  <p className="text-lg sm:text-xl text-purple-700">
                    Streamline your operations with advanced tools
                  </p>
                </motion.div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  {catalyzatorProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <ProductCard 
                        product={product}
                        variant="landing"
                      />
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