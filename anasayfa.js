"use strict";
/* biz kimiz img slider */
const dotsDiv = document.querySelector(".dots");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
/* biz kimiz img slider */

/* biz kimiz text slider */
const tagsDiv = document.querySelector(".tags");
const tags = document.querySelectorAll(".tag");
const texts = document.querySelectorAll(".text-slide");
/* biz kimiz text slider */
let imgIndex = 1;
let textIndex = 1;
console.log(slides);

const displaySlide = function (index) {
  if (index > slides.length) {
    imgIndex = 1;
  }
  if (index < 1) {
    imgIndex = slides.length;
  }
  console.log(imgIndex);
  slides.forEach((s) => (s.style.opacity = "0%"));
  slides.item(imgIndex - 1).style.opacity = "100%";

  displayDot(imgIndex);
};

const displayDot = function (index) {
  dots.forEach((d) => (d.dataset.dot = "non-selected"));
  dots.item(index - 1).dataset.dot = "selected";
};

const changeSlide = function (n) {
  imgIndex = imgIndex + n;
  displaySlide(imgIndex);
};

arrowLeft.addEventListener("click", function () {
  changeSlide(-1);
});
arrowRight.addEventListener("click", function () {
  changeSlide(1);
});
dotsDiv.addEventListener("click", function (e) {
  e.preventDefault();

  let i = Number(e.target.parentElement.dataset.index);
  if (i) {
    imgIndex = i;
    displaySlide(imgIndex);
  }
});

const displayText = function (index) {
  texts.forEach((t) => (t.dataset.text = "hide"));
  texts.item(index).dataset.text = "show";
};

const tagHandler = function (index) {
  tags.forEach((t) => (t.dataset.tag = "non-selected"));
  tags.item(index).dataset.tag = "selected";
};

tagsDiv.addEventListener("click", function (e) {
  let i = e.target.dataset.index;
  console.log(i);
  if (i) {
    textIndex = i - 1;
    tagHandler(textIndex);
    displayText(textIndex);
  }
});

displaySlide(imgIndex);
displayText(textIndex);
