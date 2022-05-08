// import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  /*signInWithRedirect,*/
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-IwIoi875IuqTtF-J_NSuB5D71Mo9xPU",
  authDomain: "wyndham-shop-db.firebaseapp.com",
  projectId: "wyndham-shop-db",
  storageBucket: "wyndham-shop-db.appspot.com",
  messagingSenderId: "225525998468",
  appId: "1:225525998468:web:8a23f3ca752f709276b3d1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp.name);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  //if user doesn't exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating user ", err.message);
    }
    return userDocRef;
  }
  //if user exists
};