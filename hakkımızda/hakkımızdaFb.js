"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
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

const etkinlikler = document.querySelector(".etkinliklerimiz--slides");
const app = initializeApp(firebaseConfig);
const database = getDatabase();
get(child(ref(getDatabase()), "etkinlikler/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      etkinlikler.innerHTML = "";
      Object.entries(snapshot.val()).forEach((element) => {
        console.log(element[1]);
        etkinlikler.insertAdjacentHTML(
          "afterbegin",
          `
        <div class="etkinliklerimiz--slide">
            <img loading="lazy" src="Asimov_Logolar/HelloWorld_Normal.png" />
            <h1>${element[1].başlık}</h1>
            <p>
              ${element[1].açıklama}
            </p>
          </div>
        `
        );
      });
      displaySlides(etkinlikSlideIndex);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
const etkinlikSlider = document.querySelector(".etkinliklerimiz--slider");

// console.log(slides);
let etkinlikSlideIndex = 1;
let afterIndex, beforeIndex;

const displaySlides = function () {
  const etkinlikSlides = document.querySelectorAll(".etkinliklerimiz--slide");
  const etkinlikSlideArr = [...etkinlikSlides];
  afterIndex = etkinlikSlideIndex + 1;
  beforeIndex = etkinlikSlideIndex - 1;
  if (etkinlikSlideIndex === 1) beforeIndex = etkinlikSlides.length;
  if (etkinlikSlideIndex < 1) {
    beforeIndex = etkinlikSlides.length - 1;
    etkinlikSlideIndex = etkinlikSlides.length;
  }
  if (etkinlikSlideIndex === etkinlikSlides.length) afterIndex = 1;
  if (etkinlikSlideIndex > etkinlikSlides.length) {
    afterIndex = 2;
    etkinlikSlideIndex = 1;
  }
  etkinlikSlides.forEach((s) => s.classList.remove("active"));
  etkinlikSlides.forEach((s) => s.classList.remove("after"));
  etkinlikSlides.forEach((s) => s.classList.remove("before"));
  etkinlikSlides.forEach((s) => s.classList.remove("other"));
  if (etkinlikSlides.length == 1) {
    // console.log("here");
    etkinlikSlides.item(etkinlikSlideIndex - 1).classList.add("active");
  } else if (etkinlikSlides.length == 2) {
    etkinlikSlides.item(etkinlikSlideIndex - 1).classList.add("active");
    etkinlikSlides.item(afterIndex - 1).classList.add("other");
  } else {
    etkinlikSlides.item(etkinlikSlideIndex - 1).classList.add("active");
    etkinlikSlides.item(beforeIndex - 1).classList.add("before");
    etkinlikSlides.item(afterIndex - 1).classList.add("after");
  }
  // console.log(beforeIndex, etkinlikSlideIndex, afterIndex);

  //   etkinlikSlides.item(etkinlikSlideIndex - 1).classList.add("active");
  //   etkinlikSlides.item(beforeIndex - 1).classList.add("before");
  //   etkinlikSlides.item(afterIndex - 1).classList.add("after");
};

etkinlikSlider.addEventListener("click", function (e) {
  const etkinlikSlides = document.querySelectorAll(".etkinliklerimiz--slide");
  const etkinlikSlideArr = [...etkinlikSlides];
  const target = e.target.closest(".etkinliklerimiz--slide");
  if (!etkinlikSlideArr.includes(target)) return;
  const targetIndex = etkinlikSlideArr.indexOf(target);
  etkinlikSlideIndex = targetIndex + 1;
  displaySlides(etkinlikSlideIndex);
});

displaySlides(etkinlikSlideIndex);
