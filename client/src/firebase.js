import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tpd-project-aba9b.firebaseapp.com",
  projectId: "tpd-project-aba9b",
  storageBucket: "tpd-project-aba9b.firebasestorage.app",
  messagingSenderId: "258762320955",
  appId: "1:258762320955:web:e6a62ecb87808f69f9001e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);