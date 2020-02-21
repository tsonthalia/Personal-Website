import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAWQu2q19HNCuU851qtGe9VrgzYZBr_jmM",
  authDomain: "personal-website-781b7.firebaseapp.com",
  databaseURL: "https://personal-website-781b7.firebaseio.com",
  projectId: "personal-website-781b7",
  storageBucket: "personal-website-781b7.appspot.com",
  messagingSenderId: "797977236399",
  appId: "1:797977236399:web:98e79cc07e6fcc46",
  measurementId: "G-FJ2SXB6RPL"
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase;
