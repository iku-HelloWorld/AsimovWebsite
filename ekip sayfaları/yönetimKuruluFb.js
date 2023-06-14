"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

const üyeler = document.querySelector(".TeamPageMembersMain");

// üyeler.innerHTML = `<section class="TeamPageMembersCards">
// <div class="TeamPageMembersCardsImg">
//   <img loading="lazy" src="Asimov_Logolar\Asimov_Logo_DüzRenk.png" />
// </div>
// <div class="TeamPageMembersCardsText">
//   <p class="TeamPageMembersCardsTextHeader">Sudenur Tilla</p>
//   <p class="TeamPageMembersCardsTextMajor">
//     Yazılım Geliştirici<br />Bilgisayar Mühendisi
//   </p>
// </div>
// </section>
// `

const getMembers = function () {
  get(child(ref(db), `yönetimKuruluÜye/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        üyeler.innerHTML = "";
        Object.entries(snapshot.val()).forEach((e) => {
          const ad = e[1].ad;
          const ünvan = e[1].ünvan;
          const bölüm = e[1].bölüm;
          const nick = e[1].nick;
          let url;
          getDownloadURL(sRef(storage, "yönetimKuruluÜye/" + nick)).then(
            (imgurl) => {
              console.log(imgurl);
              url = imgurl;
              üyeler.insertAdjacentHTML(
                "afterbegin",
                `<section class="TeamPageMembersCards">
          <div class="TeamPageMembersCardsImg">
            <img loading="lazy" src="${url}" />
          </div>
          <div class="TeamPageMembersCardsText">
            <p class="TeamPageMembersCardsTextHeader">${ad}</p>
            <p class="TeamPageMembersCardsTextMajor">
              ${ünvan}<br>${bölüm}
            </p>
          </div>
        </section>
        `
              );
            }
          );
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

getMembers();
