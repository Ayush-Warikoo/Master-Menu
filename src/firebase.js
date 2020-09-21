import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEmUdPDsD0CbjEhpW5cUFZJm8yqWB9ZDo",
    authDomain: "master-menu-app.firebaseapp.com",
    databaseURL: "https://master-menu-app.firebaseio.com",
    projectId: "master-menu-app",
    storageBucket: "master-menu-app.appspot.com",
    messagingSenderId: "810888916080",
    appId: "1:810888916080:web:ba553ed38d9f3165c358b5",
    measurementId: "G-458V3N4HZJ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

