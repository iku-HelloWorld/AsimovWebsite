"use strict";
import json from "/language.json" assert { type: "json" };

const timeline = document.querySelector(".timeline_container");
const messages = document.querySelector(".timeline_messages");

const textBtn = document.getElementById("lang");
let lang = "Tr";
let timeInd = 0;
const turnAnimate = { transform: "rotate(360deg)" };
const turnTiming = { duration: 300, iterations: 1 };

const handleLang = function () {
  if (lang === "Tr") {
    lang = json.Tr.lang;
    const values = Object.values(json.Tr.timeline);
    timeline.innerHTML = "";
    messages.innerHTML = "";
    values.forEach((val, index) => {
      //   console.log(index, val.nick, val.date, val.message);

      timeline.insertAdjacentHTML(
        "beforeend",
        `   <div class="point" data-index="${index}">
                <span id="p${index + 1}" data-date="${val.date}">${
          val.nick
        }</span>
            </div>
        `
      );
      messages.insertAdjacentHTML(
        "beforeend",
        `
        <p id="m${index + 1}" >${val.message}</p>
      `
      );
    });
  } else {
    lang = json.En.lang;
    const values = Object.values(json.En.timeline);
    timeline.innerHTML = "";
    messages.innerHTML = "";
    values.forEach((val, index) => {
      //   console.log(index, val.nick, val.date, val.message);

      timeline.insertAdjacentHTML(
        "beforeend",
        `   <div class="point " data-index="${index + 1}">
                <span id="p${index + 1}" data-date="${val.date}">${
          val.nick
        }</span>
            </div>
        `
      );
      messages.insertAdjacentHTML(
        "beforeend",
        `
        <p id="m${index + 1}" >${val.message}</p>
      `
      );
    });
  }
};

// console.log(messagesArr);

const displayTimeline = function () {
  const point = document.querySelectorAll(".point");
  point.forEach((p) => {
    // console.log(p);
    p.classList.remove("active");
    p.classList.remove("selected");
    // console.log(+p.dataset.index, +timeInd);
    if (+p.dataset.index === +timeInd) {
      //   console.log(p);
      p.classList.add("selected");
      p.classList.add("active");
    } else if (+p.dataset.index <= +timeInd) {
      p.classList.add("active");
    }
  });
  displayMessage(timeInd);
};

const displayMessage = function (ind) {
  const messagesArr = [...messages.childNodes].filter(
    (n) => n.nodeName != "#text"
  );
  // console.log(ind, messagesArr);
  messagesArr.forEach((m) => m.classList.remove("active"));
  messagesArr[ind].classList.add("active");
};

timeline.addEventListener("click", function (e) {
  const point = document.querySelectorAll(".point");
  const tar = e.target;
  // console.log(tar.dataset.index);
  timeInd = tar.dataset.index;
  //   console.log(+timeInd + 1);
  if ([...point].includes(tar)) {
    displayTimeline(timeInd);
    displayMessage(timeInd);
  }
});
const handleAnimation = function () {
  // console.log(lang);
  textBtn.animate(turnAnimate, turnTiming);
  // textBtn.textContent = lang;
  handleLang();
};

textBtn.addEventListener("click", function () {
  handleAnimation();
});
handleLang();
displayTimeline(timeInd);
