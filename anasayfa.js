"use strict";

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

const changeSlide = function (n) {
  index += n;
  displaySlider(index);
};

prevBtn.addEventListener("click", function () {
  changeSlide(-1);
});

nextBtn.addEventListener("click", function () {
  changeSlide(1);
});

displaySlider(index);

// image focus ver
galeriCont.addEventListener("click", function (e) {
  const chosenImg = e.target.closest(".image");
  if (chosenImg) {
    galeriCont.style.filter = "blur(5px)";
    newDiv.innerHTML = `<span class="new_div-close">x</span>
    <img src="asimov.jpg" />
    <div class="new_div-info">
      <p>
        açıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklamaaçıklama
      </p>
      <p>tarih/trh/trih</p>
    </div>`;
    newDiv.style.display = "initial";

    console.log("hi");
    document
      .getElementsByClassName(".new_div-close")
      .addEventListener("click", function () {
        newDiv.style.display = "none";
      });
  }
});
// image focus ver
