// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIzFzZA34doboMKHQB9a0K2shX5VSVZfU",
  authDomain: "reactprojecttest-40501.firebaseapp.com",
  projectId: "reactprojecttest-40501",
  storageBucket: "reactprojecttest-40501.appspot.com",
  messagingSenderId: "590473238333",
  appId: "1:590473238333:web:340f73ab0d2930e74e1754"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
