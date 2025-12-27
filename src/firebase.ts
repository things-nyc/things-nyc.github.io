// firebase.ts
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBheaqjY3FH1xu0-O3LzOtRtkdSce0_EAI",
  authDomain: "the-things-b49d9.firebaseapp.com",
  projectId: "the-things-b49d9",
  storageBucket: "the-things-b49d9.firebasestorage.app",
  messagingSenderId: "406106444274",
  appId: "1:406106444274:web:dfe84f235b34fe38bb9b6b",
  measurementId: "G-BKG63H3Y9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Firestore instance
export const db = getFirestore(app)
