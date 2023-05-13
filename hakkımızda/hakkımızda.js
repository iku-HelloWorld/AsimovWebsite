"use strict";

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
