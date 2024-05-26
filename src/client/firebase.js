// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "milpitashacks-project.firebaseapp.com",
  projectId: "milpitashacks-project",
  storageBucket: "milpitashacks-project.appspot.com",
  messagingSenderId: "176953040346",
  appId: "1:176953040346:web:d27c2dc9872c7c9a7ab4e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);