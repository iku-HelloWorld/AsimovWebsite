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

const otonomMemberRemove = document.querySelector(".otonom-member-remove");

get(child(dbRef, `otonomMember/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(Object.entries(snapshot.val()));

      Object.entries(snapshot.val()).forEach((e) => {
        const ad = e[1].ad;
        const nick = e[1].nick;

        otonomMemberRemove.insertAdjacentHTML(
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

otonomMemberRemove.addEventListener("click", function (e) {
  if (e.target.closest(".member-remove")) {
    const chosenName = e.target.parentElement.childNodes[2].textContent;
    const chosenNick = e.target.parentElement.childNodes[1].data;
    // console.log(chosenName);
    if (confirm(chosenName + "isimli üye silinsin mi?")) {
      remove(child(dbRef, `otonomMember/` + chosenNick))
        .then(() => {
          // console.log("üye silindi");
          location.reload();
        })
        .catch((error) => {
          // console.log("üye silinemedi");
        });
    }
  }
});

const otonomMemberImg = document.querySelector(".otonom-member-img");
const otonomMemberSubmit = document.querySelector(".otonom-member-submit");
const otonomMemberName = document.querySelector(".otonom-member-name");
const otonomMemberDuty = document.querySelector(".otonom-member-duty");
const otonomMemberDepartment = document.querySelector(
  ".otonom-member-department"
);

otonomMemberSubmit.addEventListener("click", function () {
  const ad = otonomMemberName.value;
  const ünvan = otonomMemberDuty.value;
  const bölüm = otonomMemberDepartment.value;
  const resim = otonomMemberImg.files[0];

  if (ad && ünvan && bölüm && resim) {
    if (!ad.split(" ")[1]) {
      alert("İsim ve soyad olarak en az 2 kelime girilmeli!");
    }
    const nick =
      ad.split(" ")[0].slice(0, 2) + ad.split(" ")[1].slice(0, 2) + ad.length;

    const imageRef = sRef(storage, "otonomMember/" + nick);
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
        location.reload();
        otonomMemberName.value = "";
        otonomMemberDuty.value = "";
        otonomMemberDepartment.value = "";
        otonomMemberImg.value = "";
      }
    );

    // console.log(ad, ünvan, bölüm, nick);
    set(ref(db, "otonomMember/" + nick), {
      ad: ad,
      ünvan: ünvan,
      bölüm: bölüm,
      nick: nick,
    });
  } else {
    alert("Tüm boşlukları doldurunuz");
  }
});
