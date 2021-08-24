//import firebase from "firebase";
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "master-menu-app.firebaseapp.com",
  databaseURL: "https://master-menu-app.firebaseio.com",
  projectId: "master-menu-app",
  storageBucket: "master-menu-app.appspot.com",
  messagingSenderId: "810888916080",
  appId: "1:810888916080:web:ba553ed38d9f3165c358b5",
  measurementId: "G-458V3N4HZJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();


