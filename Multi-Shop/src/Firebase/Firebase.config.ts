// Firebase.config.tsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDw_i8dKcuQ_6x5ExEAuZ56OoZAqsDg_B8",
  authDomain: "e-commerce-shroyash.firebaseapp.com",
  projectId: "e-commerce-shroyash",
  storageBucket: "e-commerce-shroyash.appspot.com",
  messagingSenderId: "839307353648",
  appId: "1:839307353648:web:46d1bf3eea85a58dfb17f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
