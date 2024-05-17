import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-8cf78.firebaseapp.com",
  projectId: "reactchat-8cf78",
  storageBucket: "reactchat-8cf78.appspot.com",
  messagingSenderId: "145772966480",
  appId: "1:145772966480:web:1fe771016094b6a2191755",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); //login or register
export const db = getFirestore(); //userinfo
export const storage = getStorage(); //images
