"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIQyW2X33YimVFujydd3ycfrmuC-oLYzo",
  authDomain: "asimov-website.firebaseapp.com",
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

const login = document.querySelector(".login");
const edit = document.querySelector(".edit");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");

const bildirimSil = document.querySelector(".bildirim-sil");

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


/* const kayit = document.querySelector(".sponsor-kayit");
const yükleme = document.querySelector("#sponsor-yükleme");
const aciklama = document.querySelector("#sponsor-aciklama");

kayit.addEventListener("click", () => {
  const file = kayit.files[0];
  const description = aciklama.value;

  const imageRes = sRef(storage, "Sponsor/" + isim);
  const metadatasponsor = {
    contentType: file.type,
    isim: description,
  };
  const uploadRes = uploadBytes(imageRes, file, metadatasponsor).then((snapshot) => {
    // Yükleme tamamlandığında yapılacak işlemler buraya gelebilir.
  });
}); */

const kayit = document.querySelector(".sponsor-kayit");
const yükleme = document.querySelector("#sponsor-yükleme");
const aciklama = document.querySelector("#sponsor-aciklama");

kayit.addEventListener("click", () => {
  const file = yükleme.files[0];
  const description = aciklama.value;

  const storage = firebase.storage();
  const storageRef = storage.ref("Sponsor/" + file.name);

  const metadata = {
    contentType: file.type,
    customMetadata: {
      isim: description,
    },
  };

  const uploadTask = storageRef.put(file, metadata);

  uploadTask
    .then((snapshot) => {
      // Yükleme tamamlandığında yapılacak işlemler buraya gelebilir.
      console.log("Resim başarıyla yüklendi.");
      return snapshot.ref.getDownloadURL();
    })
    .then((downloadURL) => {
      // Resim URL'sini veritabanına kaydedebilirsiniz
      firebase.database().ref("images").push({
        description: description,
        imageURL: downloadURL,
      });
    })
    .then(() => {
      console.log("Resim veritabanına kaydedildi.");
    })
    .catch((error) => {
      console.error("Hata:", error);
    });
});