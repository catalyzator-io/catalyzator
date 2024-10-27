import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-primary-pale-pink/30 rounded-full h-2 backdrop-blur-lg">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-crazy-orange to-primary-cool-purple rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default ProgressBar;