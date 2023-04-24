"use strict";
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

document.querySelector(".mainscreeniconButton").onclick = function () {
  sidebar.classList.toggle("sidebar_small");
  mainContent.classList.toggle("main-content_large");
};
