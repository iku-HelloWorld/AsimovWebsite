"use strict";

const timeline = document.querySelector(".timeline_container");
const point = document.querySelectorAll(".point");
const messages = document.querySelector(".timeline_messages");

const messagesArr = [...messages.childNodes].filter(
  (n) => n.nodeName != "#text"
);
let timeInd = 0;

const displayTimeline = function (ind) {
  point.forEach((p) => {
    p.classList.remove("active");
    if (p.dataset.index <= timeInd) {
      p.classList.add("active");
    }
  });
};

const displayMessage = function (ind) {
  messagesArr.forEach((m) => m.classList.remove("active"));
  messagesArr[ind].classList.add("active");
};

timeline.addEventListener("click", function (e) {
  const tar = e.target;
  timeInd = tar.dataset.index;
  if ([...point].includes(tar)) {
    displayTimeline(timeInd);
    displayMessage(timeInd);
  }
});

displayTimeline(timeInd);
