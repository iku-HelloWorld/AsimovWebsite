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
  deleteObject,
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
const storage = getStorage();

const anasayfagalerisubmit = document.querySelector(".anasayfa-galeri-submit");
const anasayfagaleriresim = document.querySelector(".anasayfa-galeri-resim");
const anasayfagaleriacıklama = document.querySelector(
  ".anasayfa-galeri-acıklama"
);
const anasayfagalerisil = document.querySelector(".anasayfa-galeri-sil");

anasayfagalerisubmit.addEventListener("click", function () {
  const resim = anasayfagaleriresim.files[0];
  const acıklama = anasayfagaleriacıklama.value;
  const dt = new Date();

  const makeItTwo = (num) => {
    if (num < 10) return "0" + num;
    else {
      num > 10;
    }
    return num;
  };
  const day = makeItTwo(dt.getDate());
  const month = makeItTwo(dt.getMonth());
  const year = dt.getFullYear();
  // console.log(makeItTwo(5));
  const date = day + "/" + month + "/" + year;
  // console.log(date);

  if (resim && acıklama) {
    const nick =
      acıklama.slice(0, 10).replace(/ /g, "") + dt.getHours() + dt.getMinutes();
    const imageRef = sRef(storage, "galeriResim/" + nick);
    const metadata = { contentType: resim.type, name: nick };

    const uploadTask = uploadBytes(imageRef, resim, metadata).then(
      (snapshot) => {
        console.log("success");
      }
    );
    set(ref(db, "galeriResim/" + nick), {
      acıklama: acıklama,
      date: date,
      nick: nick,
    }).then(() => {
      console.log("success");
      anasayfagaleriresim.value = "";
      anasayfagaleriacıklama.value = "";
    });
  } else {
    alertify.alert("Tüm boşlukları doldurunuz!");
  }
});
//sil
const closeImg = function () {
  console.log("x");
};

get(child(ref(db), "galeriResim/")).then((snapshot) => {
  if (snapshot.val()) {
    Object.values(snapshot.val()).forEach((value) => {
      console.log(value.nick);
      getDownloadURL(sRef(storage, "galeriResim/" + value.nick)).then((url) => {
        anasayfagalerisil.insertAdjacentHTML(
          "afterbegin",
          `<div>
          <button class="closeImg">
            Resmi sil
          </button>
          <img data-nick="${value.nick}" style="width:80px"; src="${url}"/>
        </div>`
        );
      });
    });
  }
});

anasayfagalerisil.addEventListener("click", function (e) {
  const close = e.target.closest(".closeImg");
  if (close) {
    //console.log(close.parentElement.childNodes[3].data);
    const url = close.parentElement.childNodes[3].src;
    const nick = close.parentElement.childNodes[3].dataset.nick;
    alertify.confirm(
      "fotoğraf silme",
      "Fotoğraf silinsin mi?",
      function () {
        deleteObject(sRef(storage, `galeriResim/${nick}`))
          .then(() => {
            // console.log("success");
            alertify.succes("fotoğraf silindi");
            location.reload();
          })
          .catch((error) => {
            console.error(error);
          });
        remove(ref(db, "galeriResim/" + nick)).then(() => {
          location.reload();
        });
      },
      function () {
        alertify.error("fotoğraf silinemedi");
      }
    );
  }
});
