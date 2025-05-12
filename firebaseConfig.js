// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF9BiTR_3WI-9VK_UPKtFc6M9Nikj5cp8",
  authDomain: "chat-ece56.firebaseapp.com",
  projectId: "chat-ece56",
  storageBucket: "chat-ece56.firebasestorage.app",
  messagingSenderId: "773080627670",
  appId: "1:773080627670:web:f2007b45a6e9c8ac920c77",
  measurementId: "G-2F20X6KH9K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };