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

// sil
const anasayfaGaleriSil = document.querySelector(".anasayfa-galeri-sil");
get(child(dbRef, `anasayfaGaleri/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log(Object.entries(snapshot.val()));

      Object.entries(snapshot.val()).forEach((e) => {
        const ad = e[1].ad;
        const nick = e[1].nick;
        anasayfaGaleriSil.insertAdjacentHTML(
          "afterbegin",
          `<div>
          <!--${nick}-->
            ${ad}
            <span class="resmi-sil">resmi sil</span>
          </div>`
        );
      });
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("resim yüklenemedi");
  });
yönetimKuruluÜyeSil.addEventListener("click", function (e) {
  if (e.target.closest(".resmi-sil")) {
    const chosenName = e.target.parentElement.childNodes[2];
    const chosenNick = e.target.parentElement.childNodes[1].data;
    console.log();
    remove(child(dbRef, `anasayfaGaleri/` + chosenNick))
      .then(() => {
        console.log("fotoğraf silindi");
      })
      .catch((error) => {
        console.log("fotoğraf silinemedi");
      });
  }
});
// sil

//ekle

const anasayfaGaleriResim = document.querySelector(".anasayfa-galeri-resim");
const anasayfaGaleriSubmit = document.querySelector(".anasayfa-galeri-submit");
const anasayfaGaleriAcıklama = document.querySelector(
  ".anasayfa-galeri-acıklama"
);

anasayfaGaleriSubmit.addEventListener("click", function () {
  const resim = anasayfaGaleriResim.files[0];
  const acıklama = anasayfaGaleriAcıklama.value;

  if (resim && acıklama) {
    if (!acıklama.split(" ")[1]) {
      alert("Lütfen açıklama giriniz!");
    }
    const nick =
      acıklama.split(" ")[0].slice(0, 2) +
      ad.split(" ")[1].slice(0, 2) +
      acıklama.length;

    const imageRef = sRef(storage, "anasayfaGaleri/" + nick);
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
        anasayfaGaleriResim.value = "";
        anasayfaGaleriAcıklama.value = "";
      }
    );
    console.log(acıklama, nick);
    set(ref(db, "anasayfaGaleri/" + nick), {
      acıklama: acıklama,
      nick: nick,
    });
  } else {
    alert("Tüm boşlukları doldurunuz");
  }
});
//ekle
