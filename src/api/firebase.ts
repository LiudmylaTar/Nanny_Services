import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nanny-api.firebaseapp.com",
  databaseURL:
    "https://nanny-api-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nanny-api",
  storageBucket: "nanny-api.firebasestorage.app",
  messagingSenderId: "104130259336",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: "G-B748CVX06B",
};

// ініціалізація
const app = initializeApp(firebaseConfig);

// експорт бази
export const db = getDatabase(app);
export const auth = getAuth(app);
