import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCuMRJ2uScE1KSQcBguQFKZDOKy3JbgwU",
  authDomain: "react-join-2116f.firebaseapp.com",
  databaseURL: "https://react-join-2116f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-join-2116f",
  storageBucket: "react-join-2116f.appspot.com",
  messagingSenderId: "713407193340",
  appId: "1:713407193340:web:596f9bb907122a104a7779"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

export default auth;