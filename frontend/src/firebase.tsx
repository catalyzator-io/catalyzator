// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

export default db ;