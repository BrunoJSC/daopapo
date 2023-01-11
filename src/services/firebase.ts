import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQsnqwo5HXe2-v5o4qmQ6jwloHC7TvVpw",
  authDomain: "daopapo-e535e.firebaseapp.com",
  projectId: "daopapo-e535e",
  storageBucket: "daopapo-e535e.appspot.com",
  messagingSenderId: "585754622925",
  appId: "1:585754622925:web:e3a670967a6372d19e6284",
  measurementId: "G-F1WJTC8J0C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const auth = getAuth(app);
