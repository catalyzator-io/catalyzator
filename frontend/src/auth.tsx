import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBEXG_ARKLxxlV51_KcNi5kxViRaww9PM4",
  authDomain: "catalyzator.firebaseapp.com",
  projectId: "catalyzator",
  storageBucket: "catalyzator.appspot.com",
  messagingSenderId: "187372078624",
  appId: "1:187372078624:web:6361a707a3e8e9fac7de45",
  measurementId: "G-LC58QSJE8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign up function
export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update the user's profile with display name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in function
export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Google sign in
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    // Clear any local state/storage if needed
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Custom hook to get the current user
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { 
    currentUser, 
    loading,
    signOutUser
  };
};
