// src/assets/Firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxvpTmVdKfyA3xM5kCjQLJtCSAuWwiy3s",
  authDomain: "voyage-vistaa.firebaseapp.com",
  projectId: "voyage-vistaa",
  storageBucket: "voyage-vistaa.appspot.com",
  messagingSenderId: "254513196443",
  appId: "1:254513196443:web:dcbf77c9c7d41a95a5453e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
