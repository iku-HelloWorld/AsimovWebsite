"use strict";
// etkinliklerimiz
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
const db = getDatabase();
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();

const removeDiv = document.querySelector(".activities-remove");
const submit = document.querySelector(".activities-submit");

submit.addEventListener("click", function () {
  let img = document.querySelector(".activities-img").value;
  let header = document.querySelector(".activities-header").value;
  let exp = document.querySelector(".activities-explanation").value;

  const nick = header.slice(0, 10) + hour + minute;
  console.log(header, exp, img);

  if (header && exp && img) {
    set(ref(db, "etkinlikler/" + nick), {
      başlık: header,
      açıklama: exp,
      nick: nick,
    });
    console.log("success");
    document.querySelector(".activities-img").value = "";
    document.querySelector(".activities-header").value = "";
    document.querySelector(".activities-explanation").value = "";
    location.reload();
  }
});

get(child(ref(db), `etkinlikler/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(snapshot.val());
      Object.values(snapshot.val()).forEach((v) => {
        removeDiv.insertAdjacentHTML(
          "afterbegin",
          `
        <div>
          ${v.başlık}
          <button data-h="${v.başlık}" data-n="${v.nick}" class="act-sil-btn">etkinliği sil</button>
        </div>`
        );
      });
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
///////

removeDiv.addEventListener("click", function (e) {
  if (e.target.closest(".act-sil-btn")) {
    const { h, n } = e.target.closest(".act-sil-btn").dataset;
    // console.log(h, n);
    if (confirm(h + "isimli etkinliği silmek istiyor musunuz?")) {
      remove(ref(db, "etkinlikler/" + n)).then(() => {
        console.log("success");
        location.reload();
      });
    }
  }
});