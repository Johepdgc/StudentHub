// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constant from 'expo-constants';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constant.extra.firebaseConfig.apiKey,
  authDomain: Constant.extra.firebaseConfig.authDomain,
  projectId: Constant.extra.firebaseConfig.projectId,
  storageBucket: Constant.extra.firebaseConfig.storageBucket,
  messagingSenderId: Constant.extra.firebaseConfig.messagingSenderId,
  appId: Constant.extra.firebaseConfig.appId,
  measurementId: Constant.extra.firebaseConfig.measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();