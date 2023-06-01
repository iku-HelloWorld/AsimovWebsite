"use strict";
import { CountUp } from "../node_modules/countup.js/dist/countUp.min.js";

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");

window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    // header.style.position = "fixed";
    console.log();
    header.classList.remove("h-active");
    console.log("hi");
  } else {
    // header.style.position = "absolute";
    header.classList.add("h-active");

    console.log("bye");
  }
});

const timeline = document.querySelector(".timeline_container");
const point = document.querySelectorAll(".point");
const messages = document.querySelector(".timeline_messages");

const messagesArr = [...messages.childNodes].filter(
  (n) => n.nodeName != "#text"
);
let timeInd = 0;

const displayTimeline = function (ind) {
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

const displaySlides = function (n) {
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
  console.log(beforeIndex, etkinlikSlideIndex, afterIndex);
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
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}

const sayaç = document.querySelector(".sayacContainer");
const sayaçPos = sayaç.getClientRects().item(0);
const sayaçTexts = document.querySelectorAll(".sayac-num");

sayaçTexts.forEach((t) => {
  console.log(t.textContent);
});
window.addEventListener("scroll", function (e) {
  const pageOffSet = window.scrollY;
  if (pageOffSet >= sayaçPos.top) {
    sayaçTexts.forEach((t) => {
      console.log(t.textContent);
      const countUp = new CountUp(t, Number(t.textContent));
      countUp.start();
    });
  }
});

// console.log(sayaçPos, sayaçPos.top);
