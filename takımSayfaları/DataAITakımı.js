"use strict";
import json from "/language.json" assert { type: "json" };

const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

button.addEventListener(`click`, () => {
  menu.classList.toggle(`active`);
  window.addEventListener("scroll", function () {
    menu.classList.remove(`active`);
  });
});
const header = document.querySelector(".header");
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
    for (let key in json.Tr.dataaiTakımı) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.Tr.dataaiTakımı[key]}`;
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
    for (let key in json.En.dataaiTakımı) {
      if (document.getElementById(`${key}`)) {
        document.getElementById(
          `${key}`
        ).textContent = `${json.En.dataaiTakımı[key]}`;
      } else {
        console.log(key + " not exist");
      }
      // console.log(document.getElementById(`${key}`));
    }
  }
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
