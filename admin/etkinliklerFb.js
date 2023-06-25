"use strict";
// etkinliklerimiz
import {
  getDatabase,
  ref,
  set,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const etkinliklerRef = ref(database, "etkinlikler"); // Reference to the 'etkinlikler' node in the database

const yeniEtkinlik = {
  başlık: "New Event Title",
  açıklama: "New Event Description",
};

submit.addEventListener("click", function () {
  signInWithEmailAndPassword(auth, username.value, password.value)
    .then((userCredential) => {
      if (userCredential) {
        push(etkinliklerRef, yeniEtkinlik)
          .then(() => {
            console.log("New event added successfully!");
          })
          .catch((error) => {
            console.error("Error adding new event:", error);
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

// etkinliklerimiz
