// Import the functions you need from the SDKs you need

import {getStorage} from "firebase/storage"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-52d58.firebaseapp.com",
  projectId: "ai-course-52d58",
  storageBucket: "ai-course-52d58.appspot.com",
  messagingSenderId: "966564530680",
  appId: "1:966564530680:web:e7263bb40b6545dc5fee0d",
  measurementId: "G-2YG73YRJGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);