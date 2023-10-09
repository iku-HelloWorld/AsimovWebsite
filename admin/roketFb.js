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

const roketMemberRemove = document.querySelector(".roket-member-remove");

const getMember = function () {
  get(child(dbRef, `roketMember/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        roketMemberRemove.innerHTML = "";
        // console.log(Object.entries(snapshot.val()));

        Object.entries(snapshot.val()).forEach((e) => {
          const ad = e[1].ad;
          const nick = e[1].nick;

          roketMemberRemove.insertAdjacentHTML(
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

roketMemberRemove.addEventListener("click", function (e) {
  if (e.target.closest(".member-remove")) {
    const chosenName = e.target.parentElement.childNodes[2].textContent;
    const chosenNick = e.target.parentElement.childNodes[1].data;
    // console.log(chosenName);
    alertify.confirm(
      `${chosenName} isimli üye silinsin mi?`,
      function () {
        remove(child(dbRef, `roketMember/` + chosenNick))
          .then(() => {
            alertify.success("üye silindi");
            // location.reload();
            getMember();
          })
          .catch((error) => {
            // console.log("üye silinemedi");
          });
      },
      function () {
        alertify.error("üye silinemedi");
      }
    );
  }
});

const roketMemberImg = document.querySelector(".roket-member-img");
const roketMemberSubmit = document.querySelector(".roket-member-submit");
const roketMemberName = document.querySelector(".roket-member-name");
const roketMemberDuty = document.querySelector(".roket-member-duty");
const roketMemberDepartment = document.querySelector(
  ".roket-member-department"
);

roketMemberSubmit.addEventListener("click", function () {
  const ad = roketMemberName.value;
  const ünvan = roketMemberDuty.value;
  const bölüm = roketMemberDepartment.value;
  const resim = roketMemberImg.files[0];

  if (ad && ünvan && bölüm && resim) {
    if (!ad.split(" ")[1]) {
      alertify.alert("İsim ve soyad olarak en az 2 kelime girilmeli!");
    }
    const nick =
      ad.split(" ")[0].slice(0, 2) + ad.split(" ")[1].slice(0, 2) + ad.length;

    const imageRef = sRef(storage, "roketMember/" + nick);
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

        roketMemberName.value = "";
        roketMemberDuty.value = "";
        roketMemberDepartment.value = "";
        roketMemberImg.value = "";
      }
    );

    // console.log(ad, ünvan, bölüm, nick);
    set(ref(db, "roketMember/" + nick), {
      ad: ad,
      ünvan: ünvan,
      bölüm: bölüm,
      nick: nick,
    });
  } else {
    alertify.alert("Tüm boşlukları doldurunuz");
  }
});
