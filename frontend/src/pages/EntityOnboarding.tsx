import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader } from 'lucide-react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';
import DynamicFormStep from '../components/DynamicFormStep';
import ProgressBar from '../components/ProgressBar';
import NavBar from '../components/NavBar';
import { entity_questions } from '../data/entity_questions';
import { 
  createEntity, 
  insertEntityField, 
  completeEntityOnboarding 
} from '../firebase/entity_onboarding_api';
import '../form_index.css';

interface FormResponse {
  [key: string]: any;
}

interface FormData {
  [key: string]: FormResponse;
}

const EntityOnboarding = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [entityId, setEntityId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeEntity = async () => {
      if (currentUser && !entityId) {
        const newEntityId = `entity_${currentUser.uid}_${Date.now()}`;
        setEntityId(newEntityId);
        
        await createEntity({
          entityId: newEntityId,
          userId: currentUser.uid
        });
      }
    };

    initializeEntity();
  }, [currentUser]);

  const handleEndForm = async () => {
    if (currentUser && entityId) {
      try {
        setIsLoading(true);
        await completeEntityOnboarding(currentUser.uid, entityId);
        navigate("/");
      } catch (error) {
        console.error('Error completing onboarding:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleNext = async (response: FormResponse) => {
    if (!entityId) return;

    setIsLoading(true);
    try {
      const currentQuestion = entity_questions[step];
      
      // Directly update the field in the entity document
      await insertEntityField(entityId, currentQuestion.id, response);
      
      const updatedFormData = { ...formData, [currentQuestion.id]: response };
      setFormData(updatedFormData);

      if (step === entity_questions.length - 1) {
        setIsComplete(true);
      } else {
        setStep(step + 1);
      }
    } catch (error) {
      console.error('Error saving form data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const containerClass =  isComplete ? 'max-w-sm' : 'max-w-md-new';

  return (
    <div className="min-h-screen bg-primary-cool-purple flex items-center justify-center">
      <NavBar />
      <div className="fixed top-20 left-0 w-full p-4 z-10">
        <ProgressBar progress={(step / entity_questions.length) * 100} />
      </div>

      <AnimatePresence mode="wait">
       {!isComplete ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={`min-h-screen pt-16 flex items-center justify-center px-4 ${containerClass}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-12 h-12 text-white animate-spin" />
              </div>
            ) : (
              <div>
                 <h1 className="text-4xl font-bold text-center mb-4 text-primary-cool-purple">
                {currentUser?.displayName},
                Welcome to Catalyztor
              </h1>
              <DynamicFormStep
                question={entity_questions[step]}
                onNext={handleNext}
                onBack={handleBack}
                showBack={step > 0}
              />
              </div>
              
            )}
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`min-h-screen pt-16 flex items-center justify-center px-4 ${containerClass}`}
          >
            <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full">
              <div className="flex justify-center mb-6">
                <Sparkles className="w-12 h-12 text-primary-crazy-orange" />
              </div>
              <h2 className="text-3xl font-bold text-center mb-6 text-primary-cool-purple">
                Thank you for onboarding!
              </h2>
              <p className="text-gray-700 text-center mb-6">
                Now we can start catalyzing your venture!
              </p>
              <button 
                className="w-full bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleEndForm}
              >
                <Send className="w-5 h-5" />
                Lets Get Your Grant!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntityOnboarding;