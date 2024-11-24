import { motion } from 'framer-motion';

export const WaveBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Smooth flowing waves */}
            <motion.path
              d="M0 35 Q 25 45, 50 35 T 100 35 V 100 H 0 Z"
              fill="url(#gradient1)"
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -5, 0],
                scaleY: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.path
              d="M0 45 Q 25 35, 50 45 T 100 45 V 100 H 0 Z"
              fill="url(#gradient2)"
              initial={{ y: 0 }}
              animate={{ 
                y: [0, 5, 0],
                scaleY: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#FF7E32', stopOpacity: 0.05 }} />
                <stop offset="50%" style={{ stopColor: '#7C3AED', stopOpacity: 0.07 }} />
                <stop offset="100%" style={{ stopColor: '#FF7E32', stopOpacity: 0.05 }} />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#7C3AED', stopOpacity: 0.05 }} />
                <stop offset="50%" style={{ stopColor: '#FF7E32', stopOpacity: 0.07 }} />
                <stop offset="100%" style={{ stopColor: '#7C3AED', stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
    );
  }; 