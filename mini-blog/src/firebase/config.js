// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOyanQsQ3IYtGn2S-Yrs1Tz5c6vqxdurc",
  authDomain: "miniblog-1679e.firebaseapp.com",
  projectId: "miniblog-1679e",
  storageBucket: "miniblog-1679e.appspot.com",
  messagingSenderId: "997915644582",
  appId: "1:997915644582:web:def4159417fa23cf365a67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore(app)

export { db, auth };