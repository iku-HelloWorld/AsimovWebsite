"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getDatabase();
const dbRef = ref(getDatabase());
const storage = getStorage();
// sil

const coreMemberRemove = document.querySelector(".core-member-remove");
const getMember = function () {
  get(child(dbRef, `coreMember/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(Object.entries(snapshot.val()));
        coreMemberRemove.innerHTML = "";
        Object.entries(snapshot.val()).forEach((e) => {
          const ad = e[1].ad;
          const nick = e[1].nick;

          coreMemberRemove.insertAdjacentHTML(
            "afterbegin",
            `<div>
            <!--${nick}-->
              ${ad}
              <button class="member-remove">üyeyi sil</button>
            </div>`
          );
        });
      } else {
        // console.log("No data available");
      }

      // console.log(üyeler);
    })
    .catch((error) => {
      // console.error("üye Listesi yüklenemedi");
    });
};
getMember();

coreMemberRemove.addEventListener("click", function (e) {
  if (e.target.closest(".member-remove")) {
    const chosenName = e.target.parentElement.childNodes[2].textContent;
    const chosenNick = e.target.parentElement.childNodes[1].data;
    // console.log(chosenName);
    alertify.confirm(
      "üye silme",
      `${chosenName} isimli üye silinsin mi?`,
      function () {
        remove(child(dbRef, `coreMember/` + chosenNick))
          .then(() => {
            alertify.success("üye silindi");
            // location.reload();
            getMember();
          })
          .catch((error) => {
            // console.log("üye silinemedi");
          });
      },
      () => alertify.error("üye silinemedi")
    );
    // .set("frameless", true);
  }
});

// alertify.confirm(
//   "This is a confirm dialog.",
//   function () {
//     alertify.success("Ok");
//   },
//   function () {
//     alertify.error("Cancel");
//   }
// );

const coreMemberImg = document.querySelector(".core-member-img");
const coreMemberSubmit = document.querySelector(".core-member-submit");
const coreMemberName = document.querySelector(".core-member-name");
const coreMemberDuty = document.querySelector(".core-member-duty");
const coreMemberDepartment = document.querySelector(".core-member-department");

coreMemberSubmit.addEventListener("click", function () {
  const ad = coreMemberName.value;
  const ünvan = coreMemberDuty.value;
  const bölüm = coreMemberDepartment.value;
  const resim = coreMemberImg.files[0];

  if (ad && ünvan && bölüm && resim) {
    if (!ad.split(" ")[1]) {
      alert("İsim ve soyad olarak en az 2 kelime girilmeli!");
    }
    const nick =
      ad.split(" ")[0].slice(0, 2) + ad.split(" ")[1].slice(0, 2) + ad.length;

    const imageRef = sRef(storage, "coreMember/" + nick);
    const metadata = {
      contentType: resim.type,
      name: nick,
    };
    const uploadTask = uploadBytes(imageRef, resim, metadata).then(
      (snapshot) => {
        // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   console.log("File available at", downloadURL);
        // });
        // console.log("success");
        // location.reload();
        getMember();
        coreMemberName.value = "";
        coreMemberDuty.value = "";
        coreMemberDepartment.value = "";
        coreMemberImg.value = "";
      }
    );

    // console.log(ad, ünvan, bölüm, nick);
    set(ref(db, "coreMember/" + nick), {
      ad: ad,
      ünvan: ünvan,
      bölüm: bölüm,
      nick: nick,
    });
  } else {
    alertify.alert("Tüm boşlukları doldurunuz", function () {});
  }
});
