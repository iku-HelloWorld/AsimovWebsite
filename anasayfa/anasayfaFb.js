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
      console.log(
        Object.values(snapshot.val()).sort((a, b) => {
          return a.age - b.age;
        })
      );
      isEight(Object.entries(snapshot.val()));
    }
  });
};
getImages();

let index = 1;

const replaceGaleri = function (galeriPage, key, imgurl) {
  galeriPage.insertAdjacentHTML(
    "beforeend",
    `<div class="image">
<img src="${imgurl}" alt="" />

<div style="display:none" class="image_div_content">${key[1].nick}</div>
</div>`
  );
};

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

  // let galeriPage;
  chunks.forEach((arr) => {
    let galeriPage = document.createElement("div");
    // console.log(galeriPage);
    galeriPage.classList.add("galeri_page");
    galericontent.appendChild(galeriPage);
    arr.forEach(function (key) {
      getDownloadURL(sRef(storage, "galeriResim/" + key[1].nick)).then(
        (imgurl) => {
          // console.log(imgurl);
          replaceGaleri(galeriPage, key, imgurl);
        }
      );
      //console.log(url);
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
const imgFocusShow = function (metadata, url, state) {
  console.log(metadata);
  // console.log("hi");
  if (state) {
    galeriCont.style.filter = "blur(5px)";
    newDiv.innerHTML = `<span class="new_div-close"><i class="fa fa-close"></i
    ></span>
    <img src="${url}" />
    <div class="new_div-info">
      <p>
        ${metadata.acıklama}
      </p>
      <p>${metadata.date}</p>
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
  const t = e.target.closest(".image");

  if (t) {
    const nick = t.querySelector(".image_div_content").textContent;
    const url = e.target.src;
    console.log(nick);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `galeriResim/${nick}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          imgFocusShow(snapshot.val(), url, true);
        } else {
          console.log("resim bulunamadı");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
