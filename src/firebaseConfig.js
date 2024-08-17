// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0UI0BKQRM3Guhw7EefNREem_0WrNybfc",
  authDomain: "fir-test-3034d.firebaseapp.com",
  projectId: "fir-test-3034d",
  storageBucket: "fir-test-3034d.appspot.com",
  messagingSenderId: "358238395310",
  appId: "1:358238395310:web:ad0748a147d82d3be0c63f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = new getFirestore(app);

export { auth, googleProvider, db };