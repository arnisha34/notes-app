import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBwQOULv4wwBJVm2YhP8RWSADudZz2NfdQ",
  authDomain: "note-app-48b33.firebaseapp.com",
  projectId: "note-app-48b33",
  storageBucket: "note-app-48b33.firebasestorage.app",
  messagingSenderId: "164085625216",
  appId: "1:164085625216:web:14f23befa9e3efea585165"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)