"use strict";

/* yönetim kurulu img slider */
const slides = document.querySelectorAll(".slide");
const prev = document.querySelectorAll(".prev");
const next = document.querySelectorAll(".next");
let slidePosition = 0;
const totalSlides = slides.length;

// İlk resmi göster
slides[0].classList.add("active");

// Resimleri gezinmek için önceki/sonraki düğmelerine tıklama işlevleri
function prevSlide() {
  slides[slidePosition].classList.remove("active");
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  slides[slidePosition].classList.add("active");
}

function nextSlide() {
  slides[slidePosition].classList.remove("active");
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  slides[slidePosition].classList.add("active");
}

// Önceki/sonraki düğmelerine tıklama olaylarını ekleme
prev.forEach((button) => {
  button.addEventListener("click", prevSlide);
});

next.forEach((button) => {
  button.addEventListener("click", nextSlide);
});

// Dot'lara tıklandığında ilgili slaytı göster
document.getElementById("dot1").onclick = function () {
  showSlide(1);
};
document.getElementById("dot2").onclick = function () {
  showSlide(2);
};
document.getElementById("dot3").onclick = function () {
  showSlide(3);
};
document.getElementById("dot4").onclick = function () {
  showSlide(4);
};

// Gösterilecek slaytın belirlenmesi ve gösterilmesi
function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    n = 1;
  }
  if (n < 1) {
    n = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.opacity = "0";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slides[n - 1].style.opacity = "1";
  dots[n - 1].classList.add("active");
}

/* yönetim kurulu img slider */
