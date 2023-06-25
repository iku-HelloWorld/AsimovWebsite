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

const nav = document.querySelector(".navbar-wrapper");
const header = document.querySelector(".header");
const navBtn = document.getElementById("list-btn");
const navbarLinkUl = document.querySelector(".menu-list");
const navbarLinks = [...document.querySelectorAll(".navbar-menu-item")];

window.addEventListener("scroll", function () {
  if (window.scrollY >= window.visualViewport.height * 0.9) {
    // header.style.position = "fixed";
    header.classList.add("h-active");
    navBtn.style.color = "var(--black)";
    // console.log("hi");
  } else {
    // header.style.position = "absolute";
    header.classList.remove("h-active");
    navBtn.style.color = "var(--black)";
    // console.log("bye");
  }
});
/* Header aşağı kayınca pozisyon sticky olacak */

navbarLinkUl.addEventListener("click", function (e) {
  // console.log(e.target);
  if (
    e.target.dataset.section &&
    !navigator.userAgent.match(
      /iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i
    )
  ) {
    // console.log(e.target.dataset.section);
    document
      .querySelector(`${e.target.dataset.section}`)
      .scrollIntoView({ behavior: "smooth" }, true);
  }
});

const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".mainscreenSecond");
const mainScreen = document.querySelector(".main-screen");
const mainScreenContainer = document.querySelector(".mainscreenContainer");
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
  mainScreenContainer.style.filter = "blur(0px)";
  header.style.opacity = "100";
};
document
  .querySelector(".mainscreeniconButton")
  .addEventListener("click", sidebarOpen);

document.getElementById("bell_btn").addEventListener("click", sidebarOpen);

document.querySelector(".go_back_btn").addEventListener("click", sidebarClose);

let cursorThreshold = 100;

mainScreen.addEventListener("mousedown", function (e) {
  // console.log(e.target.closest(".sidebar"));
  if (e.target.closest(".mainscreenContainer")) {
    isPressedDown = true;
  }

  // console.log();
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
// console.log(width, e.pageX, visualViewport.width);
// });
// background img follows cursor
const bgImg = document.querySelector(".main--bgImg-ımg");
const bgImgLeft = bgImg.getBoundingClientRect().left;
const bgImgTop = bgImg.getBoundingClientRect().top;

// let totalDistance = 0;
let oldCursorX;

$(window).on("mousemove", function (e) {
  // console.log("Mouse moved!");
  if (isPressedDown) {
    if (Math.abs(oldCursorX - e.clientX) >= cursorThreshold) {
      // totalDistance += Math.sqrt(Math.pow(oldCursorX - e.clientX, 2));

      // actual event
      cursorThreshold = 0;
      sidebar.style.transition = "0ms";
      e.preventDefault();
      let width =
        ((visualViewport.width - e.pageX) / visualViewport.width) * 100;
      sidebar.style.opacity = "100%";
      sidebar.style.width = `${width}%`;
      mainScreenContainer.style.filter = "blur(2px)";
      header.style.opacity = "0";

      // totalDistance = 0;
    }
  } else {
    oldCursorX = e.clientX;
  }
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
const galeriPageCounter = document.querySelector(".galeri_page-counter");

let index = 1;

// const galeriPageCounterHandler = function (i) {
//   galeriPageCounter.textContent = `${[...page].indexOf(page[i]) + 1}/${
//     page.length
//   }`;
//   galeriPageCounter.style.opacity = "100%";
//   galeriPageCounter.style.transform = "translate(-50%,50px)";
//   setTimeout(function () {
//     galeriPageCounter.style.transform = "translate(-50%,0px)";
//     galeriPageCounter.style.opacity = "0%";
//   }, 2000);
// };

// const displaySlider = function (i) {
//   if (index < 1) {
//     index = page.length;
//   }
//   if (index > page.length) {
//     index = 1;
//   }

//   // console.log(index);
//   page.forEach((p) => p.classList.remove("show"));
//   page.item(index - 1).classList.add("show");
//   galeriPageCounterHandler(index - 1);
// };

// const galeriChangeSlide = function (n) {
//   index += n;
//   displaySlider(index);
// };

// prevBtn.addEventListener("click", function () {
//   galeriChangeSlide(-1);
// });

// nextBtn.addEventListener("click", function () {
//   galeriChangeSlide(1);
// });

// displaySlider(index);

// // image focus ver
// const imgFocusShow = function (img, state) {
//   // console.log("hi");
//   if (state) {
//     galeriCont.style.filter = "blur(5px)";
//     newDiv.innerHTML = `<span class="new_div-close"><i class="fa fa-close"></i
//     ></span>
//     <img src="asimov_Logolar/asimov.jpg" />
//     <div class="new_div-info">
//       <p>
//         Hello World takımımızın teknofest 2024'te 1.oldup ödül aldığı günden hatıralar
//       </p>
//       <p>14/05/2024</p>
//     </div>`;
//     newDiv.style.display = "initial";

//     newDiv.scrollIntoView({
//       behavior: "smooth",
//       block: "end",
//       inline: "nearest",
//     });
//     newDiv
//       .querySelector(".new_div-close")
//       .addEventListener("click", function () {
//         imgFocusShow(0, false);
//       });
//   } else {
//     newDiv.style.display = "none";
//     galeriCont.style.filter = "blur(0px)";
//   }
// };

// galeriCont.addEventListener("click", function (e) {
//   const chosenImg = e.target.closest(".image");
//   // console.log(chosenImg);
//   if (chosenImg) {
//     imgFocusShow(chosenImg, true);
//     // console.log("hi");
//   }
// });
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
// console.log(slides);

const displaySlide = function (index) {
  if (index > slides.length) {
    imgIndex = 1;
  }
  if (index < 1) {
    imgIndex = slides.length;
  }
  // console.log(imgIndex);
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
  texts.item(index - 1).dataset.text = "show";
};

const tagHandler = function (index) {
  tags.forEach((t) => (t.dataset.tag = "non-selected"));
  tags.item(index - 1).dataset.tag = "selected";
};

tagsDiv.addEventListener("click", function (e) {
  let i = e.target.dataset.index;
  // console.log(i);
  if (i) {
    textIndex = i;
    tagHandler(textIndex);
    displayText(textIndex);
  }
});

displaySlide(imgIndex);
displayText(textIndex);

// lang

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
      document.getElementById(`${key}`).textContent = `${json.Tr.navbar[key]}`;
    }

    // mainscreen
    for (let key in json.Tr.mainscreen) {
      // console.log(key, document.getElementById(key));

      document.getElementById(
        `${key}`
      ).textContent = `${json.Tr.mainscreen[key]}`;
    }
  } else {
    lang = json.En.lang;
    // navbar
    for (let key in json.En.navbar) {
      // console.log(document.getElementById(`${key}`));
      document.getElementById(`${key}`).textContent = `${json.En.navbar[key]}`;
    }

    // mainscreen
    for (let key in json.En.mainscreen) {
      // console.log(document.getElementById(`${key}`));
      document.getElementById(
        `${key}`
      ).textContent = `${json.En.mainscreen[key]}`;
    }
  }
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
/*
<a id="nav_kulübümüz" href="#">Kulübümüz</a>
<a id="nav_hakkımızda" href="/hakkımızda/hakkımızda.html"
                    >Hakkımızda</a
                  >

<a
                    id="nav_yönetim_kurulu"
                    href="/ekip sayfaları/yönetimKurulu.html"
                    >Yönetim Kurulu
                  </a>
<a
                    id="nav_kurumsal_iletişim"
                    href="/ekip sayfaları/kurumsalİletişim.html"
                    >Kurumsal İletişim</a
                  >
<a id="nav_galeri" href="">Galeri</a>
<a id="nav_takımlarımız" href="">Takımlarımız</a>
<a id="nav_hw" href="">HELLO WORLD</a>
<a id="nav_otonom" href="">OTONOM ARABA</a>
<a id="nav_roket" href="">ROKET TAKIMI</a>
<a id="nav_sakurai" href="">SAKURAİ TAKIMI</a>
<a id="nav_core" href="">CORE TAKIMI</a>
<a id="nav_iletişim" href="">İletişim</a>
<a id="the_btn" href="">En</a>
*/
