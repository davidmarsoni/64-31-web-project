// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATM5CdhhgVOKRQeCbEAgn9Exgb010aA5Q",
    authDomain: "testfirebase-ed228.firebaseapp.com",
    databaseURL: "https://testfirebase-ed228-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "testfirebase-ed228",
    storageBucket: "testfirebase-ed228.appspot.com",
    messagingSenderId: "888520509044",
    appId: "1:888520509044:web:a7dc04859915c12caab321"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app);