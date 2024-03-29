"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIQyW2X33YimVFujydd3ycfrmuC-oLYzo",
  authDomain: "asimov-website.firebaseapp.com",
  databaseURL:
    "https://asimov-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "asimov-website",
  storageBucket: "asimov-website.appspot.com",
  messagingSenderId: "693182885740",
  appId: "1:693182885740:web:a8450b8b14a41579778d49",
  measurementId: "G-HS93FSYNKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const storage = getStorage();
// login
const body = document.getElementsByTagName("body");
const login = document.querySelector(".login");
const edit = document.querySelector(".edit");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");

const bildirimSil = document.querySelector(".bildirim-sil");

// body[0].style.height = "100vh";
// body[0].style.overflow = "hidden";

// console.log(body[0]);
const signedInHandler = function () {
  // body[0].style.height = "initial";
  // body[0].style.overflow = "initial";

  login.style.opacity = "0%";
  login.style.display = "none";
  edit.style.opacity = "100%";
  edit.style.display = "initial";
};

submit.addEventListener("click", function () {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      if (userCredential) {
        signedInHandler();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alertify.alert(errorCode, errorMessage);
    });
  // login.style.display = "none";
  // edit.style.display = "initial";
});
// login
// üyeler
