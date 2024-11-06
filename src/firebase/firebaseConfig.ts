/** @format */
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCgVZBKIsZldUg7AXcifzZ4k7xISgDikBM",
    authDomain: "project-8592240410215207885.firebaseapp.com",
    projectId: "project-8592240410215207885",
    storageBucket: "project-8592240410215207885.appspot.com",
    messagingSenderId: "1081954926351",
    appId: "1:1081954926351:web:d639d070b7957ab878087a",
    measurementId: "G-1825JTBYBV"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();

auth.languageCode = 'vi';