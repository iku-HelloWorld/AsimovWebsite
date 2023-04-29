"use strict";

const page = document.querySelectorAll(".galeri_page");
const prevBtn = document.querySelector(".arrow1");
const nextBtn = document.querySelector(".arrow2");

let index = 1;

const displaySlider = function (i) {
  if (index < 1) {
    index = page.length;
  }
  if (index > page.length) {
    index = 1;
  }

  console.log(index);
  page.forEach((p) => p.classList.remove("show"));
  page.item(index - 1).classList.add("show");
};

const changeSlide = function (n) {
  index += n;
  displaySlider(index);
};

prevBtn.addEventListener("click", function () {
  changeSlide(-1);
});

nextBtn.addEventListener("click", function () {
  changeSlide(1);
});

displaySlider(index);