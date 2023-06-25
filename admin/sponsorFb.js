"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getDatabase,
  get,
  set,
  child,
  ref,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
  uploadBytes,
  listAll,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
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

const submit = document.querySelector(".sponsor-submit");
const img = document.querySelector(".sponsor-file");
const header = document.querySelector(".sponsor-header");
const removeDiv = document.querySelector(".sponsor-remove-div");

const storage = getStorage();
submit.addEventListener("click", () => {
  const file = img.files[0];
  const name = header.value;

  const storageRef = sRef(storage, "sponsorImages/" + name);

  const metadata = {
    contentType: file.type,
    name: name,
  };

  const uploadTask = uploadBytes(storageRef, file, metadata)
    .then((snapshot) => {
      //   console.log("success");
      location.reload();
    })
    .catch((error) => {
      //   console.error("Hata:", error);
    });
});

// getDownloadURL(sRef(storage,"sponsorImages/"));
const listRef = sRef(storage, "sponsorImages/");
listAll(listRef)
  .then((res) => {
    res.items.forEach((itemRef) => {
      //   console.log(itemRef.name);
      removeDiv.insertAdjacentHTML(
        "afterbegin",
        `<div data-name="${itemRef.name}">${itemRef.name}<button class="sponsor-remove-btn"> sponsoru sil</button></div>`
      );
    });
  })
  .catch((error) => {
    console.error(error);
  });

removeDiv.addEventListener("click", function (e) {
  if (e.target.closest(".sponsor-remove-btn")) {
    let name = e.target.parentNode.dataset.name;
    // console.log(e.target.parentNode.dataset.name);
    if (confirm(name + "adlı sponsor silinsin mi?")) {
      deleteObject(sRef(storage, "sponsorImages/" + name))
        .then(() => {
          // console.log("sildim");
          location.reload();
        })
        .catch((error) => {
          // console.error(error);
        });
    }
  }
});
