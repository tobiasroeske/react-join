import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./environment.firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const firestore = getFirestore(app);

export default auth;