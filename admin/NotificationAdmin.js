"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  child,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

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
const database = getDatabase();
const auth = getAuth();
const storage = getStorage();

const login = document.querySelector(".login");
const edit = document.querySelector(".edit");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const submit = document.querySelector(".submit");
const dbRef = ref(database);

const NotificationDelete = document.querySelector(".Notification-delete");

get(child(dbRef, `bildirim/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      Object.entries(snapshot.val()).forEach((m) => {
        const NotificationDeleteHeader = m[1].başlık;
        const NotificationDeleteText = m[1].açıklama;

        NotificationDelete.insertAdjacentHTML(
          "afterbegin",
          `<div>
            <!--${NotificationDeleteHeader}-->
              ${NotificationDeleteText}
              <button class="Notification-delete-button">Bildirimi sil</button>
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

NotificationDelete.addEventListener("click", function (m) {
  if (m.target.closest(".Notification-delete")) {
    const chosenHeader = m.target.parentElement.childNodes[1].textContent;
    const chosenText = m.target.parentElement.childNodes[1].data;
    // console.log(chosenName);
    alertify.confirm(
      "bildirim sil",
      `${chosenHeader} bildirim silinsin mi?`,
      function () {
        remove(child(dbRef, `bildirim/` + chosenHeader.slice(0, 10)))
          .then(() => {
            // console.log("Bildirim silindi");
            // location.reload();
          })
          .catch((error) => {
            // console.log("Bildirim silinemedi");
          });
        deleteObject(sRef(storage, `bildirim/` + chosenHeader.slice(0, 10)))
          .then(() => {
            // console.log("deleted");
            alertify.success("bildirim silindi");
            location.reload();
          })
          .catch(() => {
            // console.log("fuck");
          });
      },
      function () {
        alertify.error("bildirim silinemedi");
      }
    );
  }
});

const NotificationPictureAdmin = document.querySelector(
  ".NotificationPictureAdmin"
);
const NotificationHeaderAdmin = document.querySelector(
  ".NotificationHeaderAdmin"
);
const NotificationParagraphAdmin = document.querySelector(
  ".NotificationParagraphAdmin"
);

const NotificationSubmit = document.querySelector(".Notification-submit");
function writeNotificationData() {
  const db = getDatabase();
  if (
    NotificationPictureAdmin.value &&
    NotificationHeaderAdmin.value &&
    NotificationParagraphAdmin.value
  ) {
    set(ref(db, "bildirim/" + NotificationHeaderAdmin.value.slice(0, 10)), {
      başlık: NotificationHeaderAdmin.value,
      açıklama: NotificationParagraphAdmin.value,
    });

    const storageRef = sRef(
      storage,
      "bildirim/" + NotificationHeaderAdmin.value.slice(0, 10)
    );
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, NotificationPictureAdmin.files[0]).then(
      (snapshot) => {
        console.log("Uploaded a blob or file!");
        NotificationPictureAdmin.value = "";
        NotificationHeaderAdmin.value = "";
        NotificationParagraphAdmin.value = "";
        location.reload();
      }
    );
  }
}

NotificationSubmit.addEventListener("click", function () {
  writeNotificationData();
});
