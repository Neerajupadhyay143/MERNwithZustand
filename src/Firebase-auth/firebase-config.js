// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCqeKRqat130VFILT4iJVSbUi8GqrfwQCE",
    authDomain: "anime-tour-f7ae3.firebaseapp.com",
    projectId: "anime-tour-f7ae3",
    storageBucket: "anime-tour-f7ae3.firebasestorage.app",
    messagingSenderId: "1066735537307",
    appId: "1:1066735537307:web:dcf080b39efe2d81ab4a3e",
    measurementId: "G-GPLXF0V4N5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const messaging = getMessaging(app);