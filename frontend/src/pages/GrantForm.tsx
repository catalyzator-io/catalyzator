import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';
import DynamicFormStep from '../components/DynamicFormStep';
import ProgressBar from '../components/ProgressBar';
import { questions } from '../data/questions';
import type { GrantFormResponse } from '../types/form';
import { loadSavedForm, startApplication, insertSectionData, insertMultipleEntries, updateApplicationMetadata } from '../utils/dal/grant_form_api'; // Adjust import path as needed
import { uploadFile, getEntityForUser, getEntityNameById, incrementTransactionStage } from '../utils/dal/common_api'

import NavBar from '../components/layout/NavBar';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase/firebase';

const getGrantFileStoragePath = ({ userId, entityId, applicationId, section, fileName }: { userId: string, entityId: string, applicationId: string, section: string, fileName: string }) => 
  `applications/${userId}/${entityId}/${applicationId}/${section}/${fileName}`;


interface FormData {
    [key: string]: GrantFormResponse;
  }
  
export const questionToCollectionMap: { [key: string]: string } = {
      basicPersonalInfo: 'basicPersonalInfo',
      basicCompanyInfo: 'basicCompanyInfo',
      founders: 'founders',
      budget: 'budget',
      team: 'team',
      academicInquiry: 'academicInquiry',
      ipRightsVerification: 'ipRightsVerification',
      ipRightsProtection: 'ipRightsProtection',
      openSourceDetails: 'openSourceDetails',
      pitchDeck: 'pitchDeck',
      pitchRecording: 'pitchRecording',
      otherText: 'otherText',
      otherFiles: 'otherFiles'
  };
  
  
function GrantForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [entityId, setEntityId] = useState<string | null>(null);
  const [entityName, setEntityName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Fetch entity data
  useEffect(() => {
    const fetchEntityData = async () => {
      if (currentUser?.uid) {
        try {
          const fetchedEntityId = await getEntityForUser(currentUser.uid);
          setEntityId(fetchedEntityId);
          
          if (fetchedEntityId) {
            const fetchedEntityName = await getEntityNameById(fetchedEntityId);
            setEntityName(fetchedEntityName);
          }
          console.log(entityId, entityName, "l")
        } catch (error) {
          console.error('Error fetching entity data:', error);
        }
      }
    };

    fetchEntityData();
  }, [currentUser]);

  // Load saved form data
  useEffect(() => {
    const loadSavedState = async () => {
      if (!currentUser?.uid) return;
      
      setIsLoading(true);
      try {
        const fetchedEntityId = await getEntityForUser(currentUser.uid);
        setEntityId(fetchedEntityId);
        
        if (!fetchedEntityId) {
          setIsLoading(false);
          return;
        }

        const result = await loadSavedForm({
          db,
          userId: currentUser.uid,
          entityId: fetchedEntityId,
          questionToCollectionMap,
          questions
        });

        if (!result.success) {
          toast.error('There was an error loading your previous progress.');
          return;
        }

        if (result.hasIncompleteApplication) {
          const { applicationId, formData, currentStep, startTime } = result.data ?? {};
          
          setApplicationId(applicationId ?? null);
          setFormData(formData ?? {});
          setStep(currentStep ?? 0);
          setShowWelcome(false);
          setStartTime(startTime ?? 0);

          toast.info("Welcome back! Continuing from where you left off.");
        } else {
          console.log('No incomplete applications found');
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
        toast.error('There was an error loading your previous progress.');
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedState();
  }, [currentUser]);


  const handleStartForm = async () => {
    setIsLoading(true);
    try {
      setShowWelcome(false);
      const newAppId = await startApplication(currentUser?.uid ?? '', entityId ?? '', 'basicPersonalInfo');
      setApplicationId(newAppId);
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error starting application:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleEndForm = () => {
    setStep(0);
    setIsComplete(false);
    setFormData({});
    incrementTransactionStage(currentUser?.uid ?? '');
    // setShowWelcome(true);
    setApplicationId(null);
    navigate("/app/profile");
  }
  const handleNext = async (response: GrantFormResponse) => {
    if (!applicationId) return;

    setIsLoading(true);
    try {
        const currentQuestion = questions[step];
        const collectionName = questionToCollectionMap[currentQuestion.id];

        // Process multiple entries if available
        if (response.dynamicEntries && Array.isArray(response.dynamicEntries)) {
            const fileUploadPromises: Promise<void>[] = [];

            for (const entry of response.dynamicEntries) {
                if (entry.values && typeof entry.values === 'object') {
                    const entryPromises = Object.keys(entry.values).map(async (key) => {
                        const value = entry.values[key];
                        if (value instanceof File) {
                            const url = await handleFileUpload(value, collectionName);
                            entry.values[key] = url as string;
                        }
                    });
                    fileUploadPromises.push(...entryPromises);
                }
            }

            await Promise.all(fileUploadPromises);
            console.log(response, "updated response with file URLs");

            await insertMultipleEntries(
                applicationId,
                collectionName,
                response.dynamicEntries.map(entry => entry.values),
                entityId ?? ''
            );
        } 
        else {
            // Prepare data object for single entry
            let dataToStore: Record<string, any> = {};

            // Process text
            if (response.text !== undefined) {
                dataToStore.text = response.text;
            }

            // Process selectedOptions
            if (response.selectedOptions !== undefined) {
                dataToStore.selectedOptions = response.selectedOptions;
                dataToStore.selectedOptionsString = response.selectedOptions.join(', ');
            }

            // Process audioUrl
            if (response.audioUrl !== undefined) {
                dataToStore.audioUrl = response.audioUrl;
            }

            // Process fields
            if (response.fields) {
                const fieldPromises = Object.entries(response.fields).map(async ([key, value]) => {
                    if (value instanceof File) {
                        const url = await handleFileUpload(value, collectionName);
                        dataToStore[key] = url;
                    } else {
                        dataToStore[key] = value;
                    }
                });
                await Promise.all(fieldPromises);
            }

            // Process single file
            if (response.file) {
                const fileUrl = await handleFileUpload(response.file, collectionName);
                dataToStore.fileUrl = fileUrl;
            }

            // Process values if they exist (backward compatibility)
            if (response.values) {
                const valuePromises = Object.entries(response.values).map(async ([key, value]) => {
                    if (value instanceof File) {
                        const url = await handleFileUpload(value, collectionName);
                        dataToStore[key] = url;
                    } else {
                        dataToStore[key] = value;
                    }
                });
                await Promise.all(valuePromises);
            }

            console.log('Data being stored:', dataToStore);

            // Only insert if we have data to store
            if (Object.keys(dataToStore).length > 0) {
                await insertSectionData(applicationId ?? '', collectionName, dataToStore, entityId ?? '');
            }
        }

        // Update form data state
        const updatedFormData = { ...formData, [currentQuestion.id]: response };
        setFormData(updatedFormData);

        // Update application metadata
        await updateApplicationMetadata(
            applicationId,
            (Date.now() - startTime) / 1000,
            step === questions.length - 1,
            entityId ?? '',
            collectionName
        );

        // Move to the next step or complete the form
        if (step === questions.length - 1) {
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

  const handleFileUpload = async (file: File, section: string) => {
    if (!applicationId) return;
  
    try {
        const userId = currentUser?.uid ?? '';
      const storagePath = getGrantFileStoragePath({userId, entityId: entityId ?? '', applicationId, section, fileName: file.name} )
      const fileUrl = await uploadFile(file, storagePath);
      return fileUrl;
    } catch (error) {
      console.error('File upload failed:', error);
      throw error;
    }
  };
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-cool-purple flex items-center justify-center">
        <Loader className="w-12 h-12 text-white animate-spin" />
      </div>
    );
  }

  const containerClass = showWelcome || isComplete ? 'max-w-sm' : 'max-w-md-new';

  return (
    <div className="min-h-screen bg-primary-cool-purple flex items-center justify-center">
      <NavBar />
      <div className="fixed top-20 left-0 w-full p-4 z-10">
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
                <Sparkles className="w-20 h-20 text-primary-crazy-orange animate-pulse" />
              </div>
              <h1 className="text-3xl font-bold text-center mb-4 text-primary-cool-purple">
                Hey, {currentUser?.displayName}!
              </h1>
              <h1 className="text-2xl font-bold text-center mb-4 text-crazy-orange">
                We are excited to take <span className='text-primary-cool-purple'>{entityName}</span> to the next level!
              </h1>
              <button
                className="w-full bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleStartForm}
              >
                Catalyze {entityName}
                <Send className="w-5 h-5" />
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
            className={`min-h-screen max-form-height pt-16 flex items-center justify-center px-4 ${containerClass}`}
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
                Thank you for your submission!
              </h2>
              <p className="text-gray-700 text-center mb-6">
                We've received your application and will review it shortly.
              </p>
              <button 
                className="w-full bg-primary-cool-purple text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                onClick={handleEndForm}
              >
                <Send className="w-5 h-5" />
                View Your Grant Application!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default GrantForm;