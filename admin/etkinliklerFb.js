"use strict";
// etkinliklerimiz
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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
const storage = getStorage();

// sil

const etkinlilerRemove = document.querySelector(
  ".etkinlikler-remove"
);

const etkinliklerRef = ref(database, "etkinlikler"); // Reference to the 'etkinlikler' node in the database

const dbRef = ref(getDatabase());
get(child(dbRef, `etkinlikler/`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      // console.log(Object.entries(snapshot.val()));

      Object.entries(snapshot.val()).forEach((e) => {
        const başlık = e[1].başlık;
        const açıklama = e[1].açıklama;

        etkinliklerRemove.insertAdjacentHTML(
          "afterbegin",
          `<div>
              <button class="etkinlikler-remove">etkinliği sil</button>
            </div>`
        );
      });
    } else {
      // console.log("No data available");
    }

    // console.log(etkinlikler);
  })
  .catch((error) => {
    // console.error("Etkinlikler yüklenemedi");
  });

  etkinliklerImg = document.querySelector(
    ".etkinlikler-img"
  );
  const etkinliklerSubmit = document.querySelector(
    ".etkinlikler-submit"
  );

  const uploadTask = uploadBytes(imageRef, resim, metadata).then(
    (snapshot) => {
      // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //   console.log("File available at", downloadURL);
      // });
      // console.log("success");
      location.reload();
      corporateCommunicationMemberName.value = "";
      corporateCommunicationMemberImg.value = "";
    }
  );

// etkinliklerimiz
