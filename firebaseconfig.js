// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBWhdSZwIY2yxZbG-3KGf1on7-BP2bnl4",
  authDomain: "tlunch-1e267.firebaseapp.com",
  projectId: "tlunch-1e267",
  storageBucket: "tlunch-1e267.appspot.com",
  messagingSenderId: "2045234796",
  appId: "1:2045234796:web:4fd1971752a0e7250e9249"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
