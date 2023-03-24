// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuhXS45lizE3HHjUBh5g3R-ngt_nRnz08",
    authDomain: "only4adventure-doc.firebaseapp.com",
    databaseURL: "https://only4adventure-doc-default-rtdb.firebaseio.com",
    projectId: "only4adventure-doc",
    storageBucket: "only4adventure-doc.appspot.com",
    messagingSenderId: "453593058347",
    appId: "1:453593058347:web:3fe31fd5abba6ddc1cee6e",
    measurementId: "G-9KMPR7RJ8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);