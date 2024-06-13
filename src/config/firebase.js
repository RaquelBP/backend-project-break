// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
//const firebase = require("firebase/compat/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "tb-backend-project-break.firebaseapp.com",
  projectId: "tb-backend-project-break",
  storageBucket: "tb-backend-project-break.appspot.com",
  messagingSenderId: "285302371045",
  appId: "1:285302371045:web:762d77baf3adfb8bfd9a0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//connectAuthEmulator(auth, "http:localhost:9099")

module.exports = {
    firebaseConfig, app, auth
};