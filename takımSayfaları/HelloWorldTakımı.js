"use strict";

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");
const navbarLinkUl = document.querySelector(".menu-list");
const navbarLinks = [...document.querySelectorAll(".navbar-menu-item")];
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

button.addEventListener(`click`, () => {
  menu.classList.toggle(`active`);
  window.addEventListener("scroll", function () {
    menu.classList.remove(`active`);
  });
});
// const navBtn = document.getElementById("list-btn");

window.addEventListener("scroll", function () {
  if (window.scrollY === 0) {
    // header.style.position = "fixed";
    // console.log();
    header.classList.remove("h-active");
    // console.log("hi");
  } else {
    // header.style.position = "absolute";
    header.classList.add("h-active");

    // console.log("bye");
  }
});

navbarLinkUl.addEventListener("click", function (e) {
  // console.log(e.target);
  if (
    e.target.dataset.section &&
    !navigator.userAgent.match(
      /iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i
    )
  ) {
    console.log(e.target.dataset.section);
    document
      .querySelector(`${e.target.dataset.section}`)
      .scrollIntoView({ behavior: "smooth" }, true);
  }
});
