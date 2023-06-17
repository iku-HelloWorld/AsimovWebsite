"use strict";
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
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
const db = getDatabase();
const storage = getStorage();

const galericontent = document.querySelector(".galeri_content");
const getImages = function () {
  get(child(ref(db), "galeriResim/")).then((snapshot) => {
    if (snapshot.val()) {
      // Object.entries(snapshot.val()).forEach((e) => {
      //   console.log(e[1]);
      // });
      isEight(Object.entries(snapshot.val()));
    }
  });
};
getImages();

let index = 1;

const isEight = function (arr) {
  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  const chunks = sliceIntoChunks(arr, 8);
  // console.log(chunks);

  let galeriPage;
  chunks.forEach((arr) => {
    galeriPage = document.createElement("div");
    galeriPage.classList.add("galeri_page");
    galericontent.appendChild(galeriPage);
    arr.forEach(function (key, i) {
      // console.log(key);
      galeriPage.insertAdjacentHTML(
        "beforeend",
        `<div class="image">
      <img src="Asimov_Logolar/asimov.jpg" alt="" />

      <div class="image_div_content">
        <div class="image_blur"></div>
        <p>${(key[1].nick, i)}</p>
      </div>
    </div>`
      );
    });
  });
  displaySlider(index);
};
const galeriCont = document.querySelector(".galeri_content");
const prevBtn = document.querySelector(".arrow1");
const nextBtn = document.querySelector(".arrow2");
const newDiv = document.querySelector(".new_div");
const galeriPageCounter = document.querySelector(".galeri_page-counter");

const galeriPageCounterHandler = function (page, i) {
  galeriPageCounter.textContent = `${[...page].indexOf(page[i]) + 1}/${
    page.length
  }`;
  galeriPageCounter.style.opacity = "100%";
  galeriPageCounter.style.transform = "translate(-50%,50px)";
  setTimeout(function () {
    galeriPageCounter.style.transform = "translate(-50%,0px)";
    galeriPageCounter.style.opacity = "0%";
  }, 2000);
};

const displaySlider = function (i) {
  const page = document.querySelectorAll(".galeri_page");

  if (index < 1) {
    index = page.length;
  }
  if (index > page.length) {
    index = 1;
  }

  // console.log(index);
  page.forEach((p) => p.classList.remove("show"));
  page.item(index - 1).classList.add("show");
  galeriPageCounterHandler(page, index - 1);
};

const galeriChangeSlide = function (n) {
  index += n;
  displaySlider(index);
};

prevBtn.addEventListener("click", function () {
  galeriChangeSlide(-1);
});

nextBtn.addEventListener("click", function () {
  galeriChangeSlide(1);
});

// displaySlider(index);

// // image focus ver
const imgFocusShow = function (img, state) {
  // console.log("hi");
  if (state) {
    galeriCont.style.filter = "blur(5px)";
    newDiv.innerHTML = `<span class="new_div-close"><i class="fa fa-close"></i
    ></span>
    <img src="asimov_Logolar/asimov.jpg" />
    <div class="new_div-info">
      <p>
        Hello World takımımızın teknofest 2024'te 1.oldup ödül aldığı günden hatıralar
      </p>
      <p>14/05/2024</p>
    </div>`;
    newDiv.style.display = "initial";

    newDiv.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
    newDiv
      .querySelector(".new_div-close")
      .addEventListener("click", function () {
        imgFocusShow(0, false);
      });
  } else {
    newDiv.style.display = "none";
    galeriCont.style.filter = "blur(0px)";
  }
};

galeriCont.addEventListener("click", function (e) {
  console.log(e.target);
  const chosenImg = e.target.closest(".image");
  // console.log(chosenImg);
  // if (chosenImg) {
  //   imgFocusShow(chosenImg, true);
  //   // console.log("hi");
  // }
});
