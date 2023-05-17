"use strict";
/*navbar*/
const button = document.getElementById(`list-btn`);
const menu = document.querySelector(`.asimov-menu`);

if (button) {
  button.addEventListener(`click`, () => {
    menu.classList.toggle(`active`);
  });
}
/*navbar*/