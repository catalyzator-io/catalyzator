

import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs,
    query, 
    where, limit,
    orderBy,
    doc, 
    setDoc, 
    arrayUnion,
    increment,
    getDoc,
    updateDoc,
    serverTimestamp,
    collection as firestoreCollection
  } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import db from './firebase';
  import {storage} from './firebase';
  
  


  export const SCHEMA_PATHS = {
    ENTITY_COLLECTION: 'entities',
    GRANT_ONBOARDING: 'grant_onboarding',
    SECTIONS: 'sections',
    ENTRIES: 'entries',
};

// Helper function to format paths based on schema
const getEntityPath = (entityId) => [SCHEMA_PATHS.ENTITY_COLLECTION, entityId].join('/');
const getApplicationPath = (entityId, applicationId) => [getEntityPath(entityId), SCHEMA_PATHS.GRANT_ONBOARDING, applicationId].join('/');
const getSectionPath = (entityId, applicationId, section) => [getApplicationPath(entityId, applicationId), SCHEMA_PATHS.SECTIONS, section].join('/');
const getEntryPath = (entityId, applicationId, section, entryIndex) => [getSectionPath(entityId, applicationId, section), SCHEMA_PATHS.ENTRIES, `entry_${entryIndex}`].join('/');

export const loadSavedForm = async ({
    db,
    userId,
    entityId,
    questionToCollectionMap,
    questions
}) => {
    try {
        if (!entityId || !userId) {
            return {
                success: false,
                error: 'Missing entityId or userId'
            };
        }

        // Reference to the onboarding collection path
        const onboardingRef = collection(db, 'entities', entityId, 'grant_onboarding');

        // Retrieve the application documents (assuming there's only one or you're interested in the first one)
        const savedAppSnapshot = await getDocs(onboardingRef);
        
        if (savedAppSnapshot.empty) {
            console.log('No incomplete applications found for userId:', userId);
            return {
                success: true,
                hasIncompleteApplication: false
            };
        }

        // Get the first document from the onboarding collection
        const savedApp = savedAppSnapshot.docs[0].data();
        const applicationId = savedAppSnapshot.docs[0].id;
        console.log('Found application with ID:', applicationId);

        // Get the current section from application metadata
        const currentSection = savedApp.currentSection || null;
        const currentIndex = currentSection
            ? questions.findIndex(q => questionToCollectionMap[q.id] === currentSection)
            : -1;

        const nextIndex = currentIndex >= 0 && currentIndex + 1 < questions.length
            ? currentIndex + 1
            : currentIndex;

        // Gather data for each question's section
        const savedData = {};
        for (const question of questions) {
            const collectionName = questionToCollectionMap[question.id];
            if (!collectionName) {
                console.warn(`No collection mapping found for question: ${question.id}`);
                continue;
            }

            // Check for section document existence
            const sectionRef = doc(db, 'entities', entityId, 'grant_onboarding', applicationId, 'sections', collectionName);
            const sectionSnapshot = await getDoc(sectionRef);

            savedData[question.id] = {
                exists: sectionSnapshot.exists(),
                data: sectionSnapshot.data() || {}
            };
        }

        const createdAt = savedApp.createdAt;
        const startTime = createdAt instanceof Date ? createdAt.getTime() : createdAt.toMillis();

        console.log('Next section calculated:', nextIndex);
        console.log('Section existence status:', Object.entries(savedData).map(([id, data]) => ({
            questionId: id,
            exists: data.exists
        })));

        return {
            success: true,
            hasIncompleteApplication: true,
            data: {
                applicationId,
                formData: savedData,
                currentStep: nextIndex,
                nextSection: nextIndex >= 0 ? questions[nextIndex].id : null,
                startTime
            }
        };

    } catch (error) {
        console.error('Error loading saved form:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
    }
};

  // Function to start a new application
  export const startApplication = async (userId, entityId, currentSection) => {
      try {
          const applicationData = {
              userId,
              createdAt: new Date(),
              duration: 0,
              sectionsFilled: 0,
              totalSections: 9,
              allSectionsComplete: false,
              currentSection: currentSection
          };
  
          const applicationsRef = collection(db, getEntityPath(entityId), SCHEMA_PATHS.GRANT_ONBOARDING);
          const docRef = await addDoc(applicationsRef, applicationData);
          return docRef.id;
      } catch (error) {
          console.error('Error starting application:', error);
          throw error;
      }
  };
  
  // Enhanced function to insert multiple entries for a section
  export const insertMultipleEntries = async (applicationId, section, entries, entityId) => {
      try {
          const sectionRef = collection(db, getSectionPath(entityId, applicationId, section), SCHEMA_PATHS.ENTRIES);
  
          const insertPromises = entries.map(async (entryData, index) => {
              const entryDoc = doc(sectionRef, `entry_${index + 1}`);
              await setDoc(entryDoc, {
                  ...entryData,
                  entryIndex: index + 1,
                  createdAt: serverTimestamp()
              });
          });
  
          await Promise.all(insertPromises);
          console.log(`Multiple entries for section ${section} successfully written to Firestore!`);
      } catch (error) {
          console.error('Error writing multiple entries to Firestore:', error);
          throw error;
      }
  };
  
  // Function to insert single entry FormData into Firestore
  export const insertSectionData = async (applicationId, section, data, entityId) => {
      try {
          const sectionRef = doc(db, getSectionPath(entityId, applicationId, section));
          await setDoc(sectionRef, {
              ...data,
              entryIndex: 1,
              createdAt: serverTimestamp()
          }, { merge: true });
          console.log(`Section ${section} data successfully written to Firestore!`);
      } catch (error) {
          console.error('Error writing section data to Firestore:', error);
          throw error;
      }
  };
  
  // Function to update application metadata
  export const updateApplicationMetadata = async (applicationId, duration, allSectionsComplete, entityId, collectionName) => {
      try {
          const applicationRef = doc(db, getApplicationPath(entityId, applicationId));
          await updateDoc(applicationRef, {
              duration,
              allSectionsComplete,
              lastUpdated: serverTimestamp(),
              currentSection: collectionName
          });
          console.log('Application metadata updated successfully!');
      } catch (error) {
          console.error('Error updating application metadata:', error);
          throw error;
      }
  };
  