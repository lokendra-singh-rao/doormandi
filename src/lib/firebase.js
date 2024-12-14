import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDKc8Q-pfousJiCi6OLgZfswHO91Z_qqto",
  authDomain: "ditansource.firebaseapp.com",
  projectId: "ditansource",
  messagingSenderId: "692034973116",
  appId: "1:692034973116:web:05b450289c38e659004fb9",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
