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
    p.classList.remove("selected");
    if (p.dataset.index === timeInd) {
      p.classList.add("selected");
      p.classList.add("active");
    } else if (p.dataset.index <= timeInd) {
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

    for (let key in json.Tr.hakkımızda) {
      // console.log(key, document.getElementById(key));
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.Tr.hakkımızda[key]}`;
      } else {
        console.log(key + " key in json is not accesable in this page");
      }
    }
  } else {
    lang = json.En.lang;
    // navbar

    for (let key in json.En.navbar) {
      if (document.getElementById(`${key}`)) {
        // console.log(document.getElementById(`${key}`));
        document.getElementById(
          `${key}`
        ).textContent = `${json.En.navbar[key]}`;
      } else {
        console.log(key + " key in json is not accesable in this page");
      }
    }

    for (let key in json.En.hakkımızda) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.En.hakkımızda[key]}`;
      } else {
        console.log(key + " key in json is not accesable in this page");
      }
      // console.log(document.getElementById(`${key}`));
    }
  }
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
