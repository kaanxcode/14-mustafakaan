// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGuCzN7nh9LF_Z6DNuW-Kwca7oUpnRYiw",
  authDomain: "hopidatabase.firebaseapp.com",
  projectId: "hopidatabase",
  storageBucket: "hopidatabase.appspot.com",
  messagingSenderId: "1008275997997",
  appId: "1:1008275997997:web:9cf6924211056fc21e7fa4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});