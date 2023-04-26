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
