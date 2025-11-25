// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIza8yC1NfBn3acyiR7vz0s_FMp-hoAMQ4ZqQclY",
  authDomain: "d-study-lab.firebaseapp.com",
  projectId: "d-study-lab",
  storageBucket: "d-study-lab.firebasestorage.app",
  messagingSenderId: "788560603186",
  appId: "1:788560603186:web:1b76e3eabf1acca931742b",
  measurementId: "G-GRY24CYF65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage (画像アップロード用)
export const storage = getStorage(app);

export default app;
