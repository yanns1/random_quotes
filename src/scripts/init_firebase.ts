// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPDinYl7bKhrvyLlNqMUiaK7p0UtIU-h8",
    authDomain: "random-quotes-dbabe.firebaseapp.com",
    databaseURL: "https://random-quotes-dbabe.firebaseio.com",
    projectId: "random-quotes-dbabe",
    storageBucket: "random-quotes-dbabe.appspot.com",
    messagingSenderId: "989685128130",
    appId: "1:989685128130:web:b597368dd6bf1bf0e3545b",
    measurementId: "G-5BHY69TG8H",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

db.enablePersistence()
    .catch((err: any) => {
        if (err.code === 'failed-precondition') {
            // probably multiple tabs open at once
            console.log('persistence failed')
        } else if (err.code === 'unimplemented') {
            // lack of browser support
            console.log('persistence is not available')
        }
    })

export { firebase, db, auth }