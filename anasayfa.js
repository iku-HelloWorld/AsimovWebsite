"use strict";
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}

const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".mainscreenSecond");

const sidebarOpen = function () {
  sidebar.classList.toggle("sidebar_show");
};
document
  .querySelector(".mainscreeniconButton")
  .addEventListener("click", sidebarOpen);

document.querySelector(".go_back_btn").addEventListener("click", sidebarOpen);

// background img follows cursor
const bgImg = document.querySelector(".main--bgImg-ımg");
const bgImgLeft = bgImg.getBoundingClientRect().left;
const bgImgTop = bgImg.getBoundingClientRect().top;

const whenMouseMove = function (e) {
  bgImg.style.transform = "translate(0,0)";
  bgImg.style.left = `${bgImgLeft + e.pageX / 25}px `;
  bgImg.style.top = `${bgImgTop + e.pageY / 25}px`;
  console.log(bgImg.getBoundingClientRect());
};
console.log(bgImg.getBoundingClientRect());
document.addEventListener("mousemove", function (e) {
  whenMouseMove(e);
});
// background img follows cursor

const sideButton = document.getElementById(`sidebar-button`);
const sideMenu = document.querySelector(`.sidebar-menu`);

if (sideButton) {
  sideButton.addEventListener(`click`, () => {
    sideMenu.classList.toggle(`sidebar-active`);
  });
}
