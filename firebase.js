import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBDYC-vwA4v1PPTG_ug1JhZ4v6k4rwtIOQ",
  authDomain: "obvi-e359e.firebaseapp.com",
  databaseURL: "https://obvi-e359e.firebaseio.com",
  projectId: "obvi-e359e",
  storageBucket: "obvi-e359e.appspot.com",
  messagingSenderId: "603972346989",
  appId: "1:603972346989:web:d3b00ab5bd204cfb9dcb64",
  measurementId: "G-FRNZD05MER",
};
// Initialize Firebase if it's not already created. We have hot-reload and there for the app is going to try and initialize firebase each time we save
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();
