"use strict";

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
const slides = document.querySelectorAll(".etkinliklerimiz--slide");
const slider = document.querySelector(".etkinliklerimiz--slider");
const slideArr = [...slides];

console.log(slides);
let slideIndex = 1;
let afterIndex, beforeIndex;

const displaySlides = function (n) {
  afterIndex = slideIndex + 1;
  beforeIndex = slideIndex - 1;
  if (slideIndex === 1) beforeIndex = slides.length;
  if (slideIndex < 1) {
    beforeIndex = slides.length - 1;
    slideIndex = slides.length;
  }
  if (slideIndex === slides.length) afterIndex = 1;
  if (slideIndex > slides.length) {
    afterIndex = 2;
    slideIndex = 1;
  }
  console.log(beforeIndex, slideIndex, afterIndex);
  slides.forEach((s) => s.classList.remove("active"));
  slides.forEach((s) => s.classList.remove("after"));
  slides.forEach((s) => s.classList.remove("before"));
  slides.item(slideIndex - 1).classList.add("active");
  slides.item(beforeIndex - 1).classList.add("before");
  slides.item(afterIndex - 1).classList.add("after");
};

slider.addEventListener("click", function (e) {
  const target = e.target.closest(".etkinliklerimiz--slide");
  if (!slideArr.includes(target)) return;
  const targetIndex = slideArr.indexOf(target);
  slideIndex = targetIndex + 1;
  displaySlides(slideIndex);
});

displaySlides(slideIndex);
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}
const slider = document.querySelector(".slider");
const slides = slider.querySelector(".slides");
const slideWidth = slider.clientWidth;

let slideIndex = 0;

function slideNext() {
  slideIndex++;
  if (slideIndex >= slides.children.length) {
    slideIndex = 0;
  }
  updateSlidePosition();
}

function slidePrevious() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = slides.children.length - 1;
  }
  updateSlidePosition();
}

function updateSlidePosition() {
  slides.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

setInterval(slideNext, 3000);
