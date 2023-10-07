"use strict";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
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
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

const submit = document.querySelector(".video-link-submit");
const inputs = document.querySelectorAll(".video-link-input");
const yk = document.querySelector("#yk-link");
const hw = document.querySelector("#hw-link");
const oto = document.querySelector("#oto-link");
const roket = document.querySelector("#roket-link");
const core = document.querySelector("#core-link");
const ai = document.querySelector("#ai-link");

const getLinks = function () {
  get(child(dbRef, `videoLinks/links`)).then((res) => {
    const val = [res.val()];
    const arr = val[0];
    yk.value = arr.find((obj) => obj.name === "yönetimKurulu").url;
    hw.value = arr.find((obj) => obj.name === "helloWorld").url;
    oto.value = arr.find((obj) => obj.name === "otonom").url;
    roket.value = arr.find((obj) => obj.name === "roket").url;
    core.value = arr.find((obj) => obj.name === "core").url;
    ai.value = arr.find((obj) => obj.name === "dataAI").url;

    // const found = arr.find((obj) => obj.name === "yönetimKurulu");
    // console.log(arr, found);
  });
};

window.addEventListener("load", function () {
  getLinks();
});
// console.log(inputs);
submit.addEventListener("click", function () {
  alertify.confirm(
    "linkleri değiştirmek istediğinizden emin misiniz?",
    function () {
      const ykVal = yk.value;
      const hwVal = hw.value;
      const otoVal = oto.value;
      const roketVal = roket.value;
      const coreVal = core.value;
      const aiVal = ai.value;

      const links = [
        { name: "yönetimKurulu", url: ykVal },
        { name: "helloWorld", url: hwVal },
        { name: "otonom", url: otoVal },
        { name: "roket", url: roketVal },
        { name: "core", url: coreVal },
        { name: "dataAI", url: aiVal },
      ];
      //   const readyToSet = Object.values(links);
      //   console.log(Object.values(links));
      set(ref(db, "videoLinks/"), {
        links,
      })
        .then(() => {
          alertify.alert("Video linkleri güncellendi");
          getLinks();
        })
        .catch(() => {
          alertify.alert("bir hata oluştu");
          getLinks();
        });
    },
    function () {
      getLinks();
    }
  );
});
