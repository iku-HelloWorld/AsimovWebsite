"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
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
const storage = getStorage();

const login = document.querySelector(".login");
const edit = document.querySelector(".edit");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");

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
// üyeler
const yönetimKuruluÜyeResmi = document.querySelector(
  ".yönetim-kurulu-üye-resim"
);
const yönetimKuruluÜyeSubmit = document.querySelector(
  ".yönetim-kurulu-üye-submit"
);
const yönetimKuruluÜyeAd = document.querySelector(".yönetim-kurulu-üye-ad");
const yönetimKuruluÜyeÜnvan = document.querySelector(
  ".yönetim-kurulu-üye-ünvan"
);
const yönetimKuruluÜyeBölüm = document.querySelector(
  ".yönetim-kurulu-üye-bölüm"
);

yönetimKuruluÜyeSubmit.addEventListener("click", function () {
  const ad = yönetimKuruluÜyeAd.value;
  const ünvan = yönetimKuruluÜyeÜnvan.value;
  const bölüm = yönetimKuruluÜyeBölüm.value;
  const resim = yönetimKuruluÜyeResmi.files[0];

  if (ad && ünvan && bölüm && resim) {
    if (!ad.split(" ")[1]) {
      alert("İsim ve soyad olarak en az 2 kelime girilmeli!");
    }
    const nick =
      ad.split(" ")[0].slice(0, 2) + ad.split(" ")[1].slice(0, 2) + ad.length;

    const imageRef = sRef(storage, "yönetimKuruluÜye/" + nick);
    const metadata = {
      contentType: resim.type,
      name: nick,
    };
    const uploadTask = uploadBytes(imageRef, resim, metadata).then(
      (snapshot) => {
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log("File available at", downloadURL);
        // });
        console.log("success");
        yönetimKuruluÜyeAd.value = "";
        yönetimKuruluÜyeÜnvan.value = "";
        yönetimKuruluÜyeBölüm.value = "";
        yönetimKuruluÜyeResmi.value = "";
      }
    );

    console.log(ad, ünvan, bölüm, nick);
    set(ref(db, "yönetimKuruluÜye/" + nick), {
      ad: ad,
      ünvan: ünvan,
      bölüm: bölüm,
      nick: nick,
    });
  } else {
    alert("Tüm boşlukları doldurunuz");
  }
});
