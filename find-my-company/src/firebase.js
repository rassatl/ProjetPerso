// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB90Q5hbE3a5QWo510CCJI0Wm21sczeIaQ",
  authDomain: "find-my-company-30652.firebaseapp.com",
  projectId: "find-my-company-30652",
  storageBucket: "find-my-company-30652.firebasestorage.app",
  messagingSenderId: "563118719650",
  appId: "1:563118719650:web:ebaaf3d949d66323168dfb",
  measurementId: "G-LYWPQXCMYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
console.log("Firebase connecté. DB initialisé :", db)
export { db }
