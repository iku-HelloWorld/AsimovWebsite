"use strict";
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}

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

// console.log(sidebar.style.width);

mainScreen.addEventListener("mouseup", function () {
  cursorThreshold = 100;
  isPressedDown = false;
  if (sidebar.style.width.slice(0, -1) > 50) {
    sidebar.style.transition = "600ms ease";
    sidebarOpen();
  } else {
    sidebarClose();
    sidebar.style.transition = "600ms ease";
  }

  // console.log("up");
});
// mainScreen.addEventListener("mousemove", function (e) {
//   if (!isPressedDown) return;

//   sidebar.style.transition = "0ms";
//   e.preventDefault();
//   let width = ((visualViewport.width - e.pageX) / visualViewport.width) * 100;
//   sidebar.style.opacity = "100%";
//   sidebar.style.width = `${width}%`;
//   console.log(width, e.pageX, visualViewport.width);
// });
// background img follows cursor
const bgImg = document.querySelector(".main--bgImg-ımg");
const bgImgLeft = bgImg.getBoundingClientRect().left;
const bgImgTop = bgImg.getBoundingClientRect().top;

let totalDistance = 0;
let oldCursorX;

$(window).on("mousemove", function (e) {
  if (!isPressedDown) return;
  if (oldCursorX)
    totalDistance += Math.sqrt(Math.pow(oldCursorX - e.clientX, 2));
  if (totalDistance >= cursorThreshold) {
    console.log("Mouse moved!");
    // actual event
    cursorThreshold = 1;
    sidebar.style.transition = "0ms";
    e.preventDefault();
    let width = ((visualViewport.width - e.pageX) / visualViewport.width) * 100;
    sidebar.style.opacity = "100%";
    sidebar.style.width = `${width}%`;

    totalDistance = 0;
  }

  oldCursorX = e.clientX;
  oldCursorY = e.clientY;
});

const whenMouseMove = function (e) {
  bgImg.style.transform = "translate(0,0)";
  bgImg.style.left = `${bgImgLeft + e.pageX / 25}px `;
  bgImg.style.top = `${bgImgTop + e.pageY / 25}px`;
  // console.log(bgImg.getBoundingClientRect());
};
document.addEventListener("mousemove", function (e) {
  // console.log(window.visualViewport.width, window.visualViewport.height);

  if (window.visualViewport.width > 775 && window.visualViewport.height > 385) {
    whenMouseMove(e);
  }
});
// background img follows cursor

const sideButton = document.getElementById(`sidebar-button`);
const sideMenu = document.querySelector(`.sidebar-menu`);

if (sideButton) {
  sideButton.addEventListener(`click`, () => {
    sideMenu.classList.toggle(`sidebar-active`);
  });
}

const page = document.querySelectorAll(".galeri_page");
const prevBtn = document.querySelector(".arrow1");
const nextBtn = document.querySelector(".arrow2");
const galeriCont = document.querySelector(".galeri_content");
const newDiv = document.querySelector(".new_div");

let index = 1;

const displaySlider = function (i) {
  if (index < 1) {
    index = page.length;
  }
  if (index > page.length) {
    index = 1;
  }

  console.log(index);
  page.forEach((p) => p.classList.remove("show"));
  page.item(index - 1).classList.add("show");
};

const galeriChangeSlide = function (n) {
  index += n;
  displaySlider(index);
};

prevBtn.addEventListener("click", function () {
  galeriChangeSlide(-1);
});

nextBtn.addEventListener("click", function () {
  galeriChangeSlide(1);
});

displaySlider(index);

// image focus ver
const ımgFocusShow = function (e) {
  console.log("hi");

  galeriCont.style.filter = "blur(5px)";
  newDiv.innerHTML = `<span onclick="ımgFocusClose()" class="new_div-close">x</span>
    <img src="asimov_Logolar/asimov.jpg" />
    <div class="new_div-info">
      <p>
        açıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklama
      </p>
      <p>tarih/trh/trih</p>
    </div>`;
  newDiv.style.display = "initial";
};
const ımgFocusClose = function () {
  newDiv.style.display = "none";
  galeriCont.style.filter = "blur(0px)";
};

galeriCont.addEventListener("click", function (e) {
  const chosenImg = e.target.closest(".image");
  console.log(chosenImg);
  if (chosenImg) {
    ımgFocusShow(e);
    console.log("hi");
  }
});
// image focus ver
/* biz kimiz img slider */
const dotsDiv = document.querySelector(".dots");
const dots = document.querySelectorAll(".dot");
const slides = document.querySelectorAll(".slide");
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
/* biz kimiz img slider */

/* biz kimiz text slider */
const tagsDiv = document.querySelector(".tags");
const tags = document.querySelectorAll(".tag");
const texts = document.querySelectorAll(".text-slide");
/* biz kimiz text slider */
let imgIndex = 1;
let textIndex = 1;
console.log(slides);

const displaySlide = function (index) {
  if (index > slides.length) {
    imgIndex = 1;
  }
  if (index < 1) {
    imgIndex = slides.length;
  }
  console.log(imgIndex);
  slides.forEach((s) => (s.style.opacity = "0%"));
  slides.item(imgIndex - 1).style.opacity = "100%";

  displayDot(imgIndex);
};

const displayDot = function (index) {
  dots.forEach((d) => (d.dataset.dot = "non-selected"));
  dots.item(index - 1).dataset.dot = "selected";
};

const changeSlide = function (n) {
  imgIndex = imgIndex + n;
  displaySlide(imgIndex);
};

arrowLeft.addEventListener("click", function () {
  changeSlide(-1);
});
arrowRight.addEventListener("click", function () {
  changeSlide(1);
});
dotsDiv.addEventListener("click", function (e) {
  e.preventDefault();

  let i = Number(e.target.parentElement.dataset.index);
  if (i) {
    imgIndex = i;
    displaySlide(imgIndex);
  }
});

const displayText = function (index) {
  texts.forEach((t) => (t.dataset.text = "hide"));
  texts.item(index).dataset.text = "show";
};

const tagHandler = function (index) {
  tags.forEach((t) => (t.dataset.tag = "non-selected"));
  tags.item(index).dataset.tag = "selected";
};

tagsDiv.addEventListener("click", function (e) {
  let i = e.target.dataset.index;
  console.log(i);
  if (i) {
    textIndex = i - 1;
    tagHandler(textIndex);
    displayText(textIndex);
  }
});

displaySlide(imgIndex);
displayText(textIndex);