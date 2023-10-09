"use strict";
// etkinliklerimiz
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";

import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIQyW2X33YimVFujydd3ycfrmuC-oLYzo",
  authDomain: "asimov-website.firebaseapp.com",
  databaseURL:
    "https://asimov-website-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "asimov-website",
  storageBucket: "asimov-website.appspot.com",
  messagingSenderId: "693182885740",
  appId: "1:693182885740:web:a8450b8b14a41579778d49",
  measurementId: "G-HS93FSYNKF",
};
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
const db = getDatabase();
const date = new Date();
const hour = date.getHours();
const minute = date.getMinutes();

const removeDiv = document.querySelector(".activities-remove");
const submit = document.querySelector(".activities-submit");

submit.addEventListener("click", function () {
  let img = document.querySelector(".activities-img").value;
  let header = document.querySelector(".activities-header").value;
  let exp = document.querySelector(".activities-explanation").value;

  const nick = header.slice(0, 10) + hour + minute;
  // console.log(header, exp, img);

  if (header && exp && img) {
    set(ref(db, "etkinlikler/" + nick), {
      başlık: header,
      açıklama: exp,
      nick: nick,
    });
    // console.log("success");
    document.querySelector(".activities-img").value = "";
    document.querySelector(".activities-header").value = "";
    document.querySelector(".activities-explanation").value = "";
    // location.reload();
    getMember();
  }
});
const getMember = function () {
  get(child(ref(db), `etkinlikler/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        removeDiv.innerHTML = "";
        // console.log(snapshot.val());
        Object.values(snapshot.val()).forEach((v) => {
          removeDiv.insertAdjacentHTML(
            "afterbegin",
            `
        <div>
          ${v.başlık}
          <button data-h="${v.başlık}" data-n="${v.nick}" class="act-sil-btn">etkinliği sil</button>
        </div>`
          );
        });
      } else {
        // console.log("No data available");
      }
    })
    .catch((error) => {
      // console.error(error);
    });
};
getMember();
///////

removeDiv.addEventListener("click", function (e) {
  if (e.target.closest(".act-sil-btn")) {
    const { h, n } = e.target.closest(".act-sil-btn").dataset;
    // console.log(h, n);
    alertify.confirm(
      "etkinlik sil",
      `${h} isimli etkinlik silinsin mi?`,
      function () {
        remove(ref(db, "etkinlikler/" + n)).then(() => {
          // console.log("success");
          alertify.succes("etkinlik silindi");
          // location.reload();removeDiv
          getMember();
        });
      },

      function () {
        alertify.error("etkinlik silinemedi");
      }
    );
  }
});

// alertify.confirm(
//   "üye silme",
//   `${chosenName} isimli üye silinsin mi?`,
//   function () {
//     remove(child(dbRef, `coreMember/` + chosenNick))
//       .then(() => {
//         alertify.success("üye silindi");
//         location.reload();
//       })
//       .catch((error) => {
//         // console.log("üye silinemedi");
//       });
//   },
//   () => alertify.error("üye silinemedi")
// );
