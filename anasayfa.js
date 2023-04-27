"use strict";
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".mainscreenSecond");
const sidebarOpen = function () {
  sidebar.classList.toggle("sidebar_show");
};
document
  .querySelector(".mainscreeniconButton")
  .addEventListener("click", sidebarOpen);

document.querySelector(".go_back_btn").addEventListener("click", sidebarOpen);

var mainscreenContainer = document.querySelector(".main-screen");

mainscreenContainer.addEventListener("mousemove", function (e) {
  mainscreenContainer.style.backgroundPositionX = -e.offsetX * 0.1 + "px";
  mainscreenContainer.style.backgroundPositionY = -e.offsetY * 0.1 + "px";
});
//reset the background positions back to the original on mouseleave

mainscreenContainer.addEventListener("mouseleave", function () {
  mainscreenContainer.style.backgroundPosition = "0px 0px";
});
