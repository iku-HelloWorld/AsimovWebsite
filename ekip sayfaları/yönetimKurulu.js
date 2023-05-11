"use strict";

/* yönetim kurulu img slider */
const slides = document.querySelectorAll(".yönetimkuruluslide");
const dots = document.querySelectorAll(".yönetimkuruludot");

let currentSlide = 0;

function showSlide(n) {
  if (n < 0) {
    currentSlide = slides.length - 1;
  } else if (n >= slides.length) {
    currentSlide = 0;
  } else {
    currentSlide = n;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].setAttribute("data-dot", "non-selected");
  }

  slides[currentSlide].classList.add("active");
  dots[currentSlide].setAttribute("data-dot", "selected");
}

showSlide(currentSlide);

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

const arrowLeft = document.querySelector(".yönetimkuruluarrowleft");
const arrowRight = document.querySelector(".yönetimkuruluarrowright");

arrowLeft.addEventListener("click", prevSlide);
arrowRight.addEventListener("click", nextSlide);

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", function () {
    showSlide(i);
  });
}
/* yönetim kurulu img slider */
