// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-booking-system-24558.firebaseapp.com",
  projectId: "movie-booking-system-24558",
  storageBucket: "movie-booking-system-24558.firebasestorage.app",
  messagingSenderId: "426378585973",
  appId: "1:426378585973:web:a8d729f4a327fa2391153c",
  measurementId: "G-SRQJ9WX2DS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
