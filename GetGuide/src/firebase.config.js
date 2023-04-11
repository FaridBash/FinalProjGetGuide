

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRSTXv9e1YYSQAplGu350AObndylOPJWM",
  authDomain: "finalprojgetguide.firebaseapp.com",
  projectId: "finalprojgetguide",
  storageBucket: "finalprojgetguide.appspot.com",
  messagingSenderId: "4847984335",
  appId: "1:4847984335:web:1214922bf6e3e8b25c61ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);