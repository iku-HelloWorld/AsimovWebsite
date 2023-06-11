"use strict";
import { CountUp } from "../node_modules/countup.js/dist/countUp.min.js";
import json from "/language.json" assert { type: "json" };

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");
const navbarLinkUl = document.querySelector(".menu-list");
const navbarLinks = [...document.querySelectorAll(".navbar-menu-item")];

/* Header aşağı kayınca pozisyon sticky olacak */

navbarLinkUl.addEventListener("click", function (e) {
  // console.log(e.target);
  if (
    e.target.dataset.section &&
    !navigator.userAgent.match(
      /iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i
    )
  ) {
    window.location.href = `${e.target.dataset.section}`;
    // console.log(e.target.dataset.section);
    // document
    //   .querySelector(`${e.target.dataset.section}`)
    //   .scrollIntoView({ behavior: "smooth" }, true);
  }
});
// const nav = document.querySelector(".navbar-wrapper");
// const navBtn = document.getElementById("list-btn");
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

button.addEventListener(`click`, () => {
  menu.classList.toggle(`active`);
  window.addEventListener("scroll", function () {
    menu.classList.remove(`active`);
  });
});

window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    // header.style.position = "fixed";
    // console.log();
    header.classList.remove("h-active");
    // console.log("hi");
  } else {
    // header.style.position = "absolute";
    header.classList.add("h-active");

    // console.log("bye");
  }
});

const timeline = document.querySelector(".timeline_container");
const point = document.querySelectorAll(".point");
const messages = document.querySelector(".timeline_messages");

const messagesArr = [...messages.childNodes].filter(
  (n) => n.nodeName != "#text"
);
let timeInd = 0;

const displayTimeline = function () {
  point.forEach((p) => {
    p.classList.remove("active");
    if (p.dataset.index <= timeInd) {
      p.classList.add("active");
    }
  });
};

const displayMessage = function (ind) {
  messagesArr.forEach((m) => m.classList.remove("active"));
  messagesArr[ind].classList.add("active");
};

timeline.addEventListener("click", function (e) {
  const tar = e.target;
  timeInd = tar.dataset.index;
  if ([...point].includes(tar)) {
    displayTimeline(timeInd);
    displayMessage(timeInd);
  }
});

displayTimeline(timeInd);
const etkinlikSlides = document.querySelectorAll(".etkinliklerimiz--slide");
const etkinlikSlider = document.querySelector(".etkinliklerimiz--slider");
const etkinlikSlideArr = [...etkinlikSlides];

// console.log(slides);
let etkinlikSlideIndex = 1;
let afterIndex, beforeIndex;

const displaySlides = function () {
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
  // console.log(beforeIndex, etkinlikSlideIndex, afterIndex);
  etkinlikSlides.forEach((s) => s.classList.remove("active"));
  etkinlikSlides.forEach((s) => s.classList.remove("after"));
  etkinlikSlides.forEach((s) => s.classList.remove("before"));
  etkinlikSlides.item(etkinlikSlideIndex - 1).classList.add("active");
  etkinlikSlides.item(beforeIndex - 1).classList.add("before");
  etkinlikSlides.item(afterIndex - 1).classList.add("after");
};

etkinlikSlider.addEventListener("click", function (e) {
  const target = e.target.closest(".etkinliklerimiz--slide");
  if (!etkinlikSlideArr.includes(target)) return;
  const targetIndex = etkinlikSlideArr.indexOf(target);
  etkinlikSlideIndex = targetIndex + 1;
  displaySlides(etkinlikSlideIndex);
});

displaySlides(etkinlikSlideIndex);

const sayaç = document.querySelector(".sayacContainer");
const sayaçPos = sayaç.getClientRects()[0];
const sayaçTexts = document.querySelectorAll(".sayac-num");
let sayaçInScreen = false;

const sayaçCount = function () {
  // console.log("this too");
  if (sayaçInScreen) return;
  console.log("working");
  // console.log("amazing but");
  sayaçTexts.forEach((t) => {
    // console.log(t.dataset.value);
    const countOptions = {
      duration: 5,
    };
    const countUp = new CountUp(t, Number(t.dataset.value), countOptions);
    countUp.start();
  });
};
window.addEventListener("scroll", function () {
  if (
    window.scrollY > sayaçPos.top - this.visualViewport.height &&
    window.scrollY < sayaçPos.top
  ) {
    sayaçCount();
    sayaçInScreen = true;
  } else {
    sayaçInScreen = false;
  }
});

const textBtn = document.getElementById("lang");

let lang = "Tr";

const turnAnimate = { transform: "rotate(360deg)" };
const turnTiming = { duration: 300, iterations: 1 };

const handleAnimation = function () {
  // console.log(lang);
  textBtn.animate(turnAnimate, turnTiming);
  // textBtn.textContent = lang;
  handleLang();
};

const handleLang = function () {
  if (lang === "Tr") {
    lang = json.Tr.lang;
    // navbar
    for (let key in json.Tr.navbar) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.Tr.navbar[key]}`;
      } else {
        console.log(key + " key in json is not accesable in this page");
      }
    }

    // hakkımızda TODO:
    // for (let key in json.Tr.mainscreen) {
    //   // console.log(key, document.getElementById(key));

    //   document.getElementById(
    //     `${key}`
    //   ).textContent = `${json.Tr.mainscreen[key]}`;
    // }
  } else {
    lang = json.En.lang;
    // navbar
    for (let key in json.En.navbar) {
      // console.log(document.getElementById(`${key}`));
      document.getElementById(`${key}`).textContent = `${json.En.navbar[key]}`;
    }

    // mainscreen
    for (let key in json.En.mainscreen) {
      // console.log(document.getElementById(`${key}`));
      document.getElementById(
        `${key}`
      ).textContent = `${json.En.mainscreen[key]}`;
    }
  }
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
