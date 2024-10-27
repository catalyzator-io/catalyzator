import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import DynamicFormStep from '../components/DynamicFormStep';
import ProgressBar from '../components/ProgressBar';
import { questions } from '../data/questions';
import type { FormResponse } from '../types/form';
import '../form_index.css';

interface FormData {
  [key: string]: FormResponse;
}

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // New state for welcome page

  const handleStartForm = () => setShowWelcome(false); // Handler for starting the form

  const handleNext = (response: FormResponse) => {
    setFormData(prev => ({
      ...prev,
      [questions[step].id]: response
    }));
    
    if (step === questions.length - 1) {
      setIsComplete(true);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const containerClass = showWelcome || isComplete ? 'max-w-sm' : 'max-w-md-new'; // Adjust width based on the page

  return (
    <div className="min-h-screen bg-primary-cool-purple flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full p-4 z-10">
        <ProgressBar progress={(step / questions.length) * 100} />
      </div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen flex items-center justify-center px-4 ${containerClass}`}
          >
            <div className="bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full flex flex-col items-center">
              <div className="flex justify-center mb-6">
                {/* Placeholder for logo */}
                <Sparkles className="w-20 h-20 text-primary-crazy-orange animate-pulse" />
              </div>
              <h1 className="text-4xl font-bold text-center mb-4 text-primary-cool-purple">
                Welcome to Catalyztor
              </h1>
              <p className="text-lg text-gray-700 text-center mb-6">
                Complete this fun form, and you'll be on your way to receiving grant funding in no time!
              </p>
              <button
                className="w-full bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleStartForm}
              >
                <Send className="w-5 h-5" />
                Catalyze My Venture!
              </button>
            </div>
          </motion.div>
        ) : !isComplete ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen pt-16 flex items-center justify-center px-4 ${containerClass}`}
          >
            <DynamicFormStep
              question={questions[step]}
              onNext={handleNext}
              onBack={handleBack}
              showBack={step > 0}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-h-screen pt-16 flex items-center justify-center px-4 ${containerClass}`}
          >
            <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-12 h-12 text-primary-crazy-orange" />
              </div>
              <h2 className="text-3xl font-bold text-center mb-6 text-primary-cool-purple">
                Thank you for your submission!
              </h2>
              <p className="text-gray-700 text-center mb-6">
                We've received your application and will review it shortly.
              </p>
              <button 
                className="w-full bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={() => {
                  setStep(0);
                  setIsComplete(false);
                  setFormData({});
                  setShowWelcome(true); // Return to welcome page
                }}
              >
                <Send className="w-5 h-5" />
                Start New Application
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
