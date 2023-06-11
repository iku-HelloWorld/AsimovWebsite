"use strict";

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");
const navbarLinkUl = document.querySelector(".menu-list");
const navbarLinks = [...document.querySelectorAll(".navbar-menu-item")];
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

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

button.addEventListener(`click`, () => {
  menu.classList.toggle(`active`);
  window.addEventListener("scroll", function () {
    menu.classList.remove(`active`);
  });
});

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

/* yönetim kurulu img slider */
const slides = document.querySelectorAll(".slide");
const prev = document.querySelectorAll(".prev");
const next = document.querySelectorAll(".next");
let slidePosition = 0;
const totalSlides = slides.length;

// İlk resmi göster
// slides[0].classList.add("active");
showSlide(1);

// Resimleri gezinmek için önceki/sonraki düğmelerine tıklama işlevleri
function prevSlide() {
  slides[slidePosition].classList.remove("active");
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  // slides[slidePosition].classList.add("active");
  showSlide(slidePosition);
}

function nextSlide() {
  slides[slidePosition].classList.remove("active");
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  //slides[slidePosition].classList.add("active");
  showSlide(slidePosition);
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

/*navbar*/
