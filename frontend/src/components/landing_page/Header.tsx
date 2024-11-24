import { Zap, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { scrollToSection } from '../../utils/scroll';
import { WaveBackground } from '../visuals/WaveBackground';

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <header className="main-header min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Light background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-orange-50">
        <WaveBackground />

        {/* Very subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(124,58,237,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(124,58,237,0.2) 1px, transparent 1px)
            `,
            backgroundSize: '4rem 4rem',
            maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
          }}
        />

        {/* Subtle glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crazy-orange/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100">
              <Zap className="h-4 w-4 text-crazy-orange mr-2" />
              <span className="text-purple-900/80 text-sm">Powered by AI</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-purple-700">
              Catalyzator
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-crazy-orange to-yellow-500">
              .io
            </span>
          </motion.h1>

          <motion.p
            className="text-2xl sm:text-3xl mb-6 text-purple-900/70 font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Transform your startup's journey with AI-powered grant applications and investor matching
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {currentUser ? (
              <Link 
                to="/app"
                className="px-8 py-4 rounded-lg bg-crazy-orange text-white font-medium hover:bg-crazy-orange/90 transition-colors flex items-center group"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <>
                <a 
                  href="#features"
                  onClick={scrollToSection('features', 24)}
                  className="px-8 py-4 rounded-lg bg-crazy-orange text-white font-medium hover:bg-crazy-orange/90 transition-colors flex items-center group shadow-lg shadow-crazy-orange/20"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </>
            )}
          </motion.div>
        </div>
      </div>
      <Toaster />
    </header>
  );
}