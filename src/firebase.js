import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAdaqhCeYH-bSvGqplIsTSdjjSmVvLSCc",
  authDomain: "daily-tracker-6f236.firebaseapp.com",
  projectId: "daily-tracker-6f236",
  storageBucket: "daily-tracker-6f236.firebasestorage.app",
  messagingSenderId: "419173094825",
  appId: "1:419173094825:web:622bdba9f64a06d12a20b8",
  measurementId: "G-QN926JKLNK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
