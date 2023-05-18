"use strict";

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");

window.addEventListener("scroll", function () {
  if (window.scrollY >= window.visualViewport.height * 0.9) {
    // header.style.position = "fixed";
    header.classList.add("h-active");
    navBtn.style.color = "var(--black)";
    console.log("hi");
  } else {
    // header.style.position = "absolute";
    header.classList.remove("h-active");
    navBtn.style.color = "var(--black)";
    console.log("bye");
  }
});
/* Header aşağı kayınca pozisyon sticky olacak */

const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".mainscreenSecond");
const mainScreen = document.querySelector(".main-screen");
let isPressedDown = false;

const sidebarOpen = function () {
  sidebar.style.opacity = "100%";
  sidebar.style.width = "100%";
  mainScreen.style.overflowY = "scroll";
  header.style.display = "none";
};

const sidebarClose = function () {
  sidebar.style.width = "0%";
  sidebar.style.opacity = "0";
  mainScreen.style.overflowY = "hidden";
  header.style.display = "initial";
};
document
  .querySelector(".mainscreeniconButton")
  .addEventListener("click", sidebarOpen);

document.getElementById("bell_btn").addEventListener("click", sidebarOpen);

document.querySelector(".go_back_btn").addEventListener("click", sidebarClose);

let cursorThreshold = 100;

mainScreen.addEventListener("mousedown", function (e) {
  console.log(e.target.closest(".sidebar"));
  if (e.target.closest(".sidebar") === sidebar) return;
  isPressedDown = true;
  // console.log("down");
});

/* kurumsal iletişim img slider */
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

const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}
