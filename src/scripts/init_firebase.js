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

// Initialize the FirebaseUI Widget using Firebase.
// const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
    signInSuccessUrl: "http://localhost:8080/",
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    signInFlow: "popup",
};

export { db, auth }