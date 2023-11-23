import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyf936mozDaTk79kdVB0ph3J7IRlKAub4",
  authDomain: "whatsapp-c708c.firebaseapp.com",
  projectId: "whatsapp-c708c",
  storageBucket: "whatsapp-c708c.appspot.com",
  messagingSenderId: "812770763855",
  appId: "1:812770763855:web:7273240ab73dcd8a5b363a",
  measurementId: "G-PWXPJBC4X0",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
