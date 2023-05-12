"use strict";
const slider = document.querySelector('.slider');
const slides = slider.querySelector('.slides');
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
