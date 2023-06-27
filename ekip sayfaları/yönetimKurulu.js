"use strict";
import json from "/language.json" assert { type: "json" };

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");
const navbarLinkUl = document.querySelector(".menu-list");
const navbarLinks = [...document.querySelectorAll(".navbar-menu-item")];

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

const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

button.addEventListener(`click`, () => {
  menu.classList.toggle(`active`);
  window.addEventListener("scroll", function () {
    menu.classList.remove(`active`);
  });
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
    for (let key in json.Tr.yönetimKurulu) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.Tr.yönetimKurulu[key]}`;
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`), json.En.navbar[key]);
    }
    for (let key in json.Tr.ünvanlar) {
      if (document.querySelectorAll(`.${key}`)) {
        document.querySelectorAll(`.${key}`).forEach((v) => {
          v.textContent = `${json.Tr.ünvanlar[key]}`;
        });
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`), json.En.navbar[key]);
    }
    for (let key in json.Tr.bölümler) {
      if (document.querySelectorAll(`.${key}`)) {
        document.querySelectorAll(`.${key}`).forEach((v) => {
          v.textContent = `${json.Tr.bölümler[key]}`;
        });
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`), json.En.navbar[key]);
    }
  } else {
    lang = json.En.lang;
    // navbar
    for (let key in json.En.navbar) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.En.navbar[key]}`;
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`));
    }

    // mainscreen
    for (let key in json.En.yönetimKurulu) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.En.yönetimKurulu[key]}`;
      } else {
        console.log(key + " not exist");
      }
      // console.log(document.getElementById(`${key}`));
    }
    for (let key in json.En.ünvanlar) {
      if (document.querySelectorAll(`.${key}`)) {
        document.querySelectorAll(`.${key}`).forEach((v) => {
          v.textContent = `${json.En.ünvanlar[key]}`;
        });
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`), json.En.navbar[key]);
    }
    for (let key in json.En.bölümler) {
      if (document.querySelectorAll(`.${key}`)) {
        document.querySelectorAll(`.${key}`).forEach((v) => {
          v.textContent = `${json.En.bölümler[key]}`;
        });
      } else {
        console.log(key + "is not accesable");
      }
      // console.log(document.getElementById(`${key}`), json.En.navbar[key]);
    }
  }
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
