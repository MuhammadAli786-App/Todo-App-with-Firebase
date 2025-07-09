// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2NSrNgqLO7ESyDJmp683oUFGwGr1rLbg",
  authDomain: "todo-app-f9d6f.firebaseapp.com",
  projectId: "todo-app-f9d6f",
  storageBucket: "todo-app-f9d6f.firebasestorage.app",
  messagingSenderId: "726064628163",
  appId: "1:726064628163:web:066389d14b65bb809ebd76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {
  app,
  db,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  collection,
  addDoc,
  getDocs,
  onAuthStateChanged,
  query,
  where,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  setDoc,
};
