"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, set, ref, child, } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getStorage, ref as sRef, uploadBytes } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIQyW2X33YimVFujydd3ycfrmuC-oLYzo",
  authDomain: "asimov-website.firebaseapp.com",
  databaseURL: "https://asimov-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "asimov-website",
  storageBucket: "asimov-website.appspot.com",
  messagingSenderId: "693182885740",
  appId: "1:693182885740:web:a8450b8b14a41579778d49",
  measurementId: "G-HS93FSYNKF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();
const storage = getStorage();

const login = document.querySelector(".login");
const edit = document.querySelector(".edit");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");

const NotificationSil = document.querySelector(".Notification-delete");

const signedInHandler = function () {
  login.style.opacity = "0%";
  login.style.display = "none";
  edit.style.opacity = "100%";
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
    });
  // login.style.display = "none";
  // edit.style.display = "initial";
});
const NotificationPictureAdmin = document.querySelector(".NotificationPictureAdmin");
const NotificationHeaderAdmin = document.querySelector(".NotificationHeaderAdmin");
const NotificationParagraphAdmin = document.querySelector(".NotificationParagraphAdmin");

const NotificationSubmit = document.querySelector(".Notification-submit");
function writeNotificationData() {
  const db = getDatabase();
  if (NotificationPictureAdmin.value && NotificationHeaderAdmin.value && NotificationParagraphAdmin.value) {
    set(ref(db, 'bildirim/' + NotificationHeaderAdmin.value.slice(0, 10)), {
      başlık: NotificationHeaderAdmin.value,
      açıklama: NotificationParagraphAdmin.value
    });

    const storageRef = sRef(storage, 'bildirim/' + NotificationHeaderAdmin.value.slice(0, 10));
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, NotificationPictureAdmin.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      NotificationPictureAdmin.value = "";
      NotificationHeaderAdmin.value = "";
      NotificationParagraphAdmin.value = "";
    });
  }

}

NotificationSubmit.addEventListener("click", function () {
  writeNotificationData();
})