"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getStorage,
  ref as sRef,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Create a root reference

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
const database = getDatabase();
const storage = getStorage();

const Notification = document.querySelector(".mainSideBar");
/* <section class="mainnewspage">
                <div>
                  <img
                    class="mainimagepage"
                    src="https://picsum.photos/id/237/200/300"
                    alt="Example Image"
                  />
                </div>
                <div class="maintextpage">
                  <h2>Right Box</h2>
                  <p>
                   lorem paragraf
                  </p>
                </div>
              </section>*/
const getNotification = function () {
  Notification.innerHTML = "";
  get(child(ref(database), `bildirim/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        Notification.innerHTML = "";
        Object.entries(snapshot.val()).forEach((m) => {
          console.log(m);
          const RightBoxHeader = m[1].başlık;
          const RightBoxParagraph = m[1].açıklama;
          console.log(RightBoxParagraph);
          let url;

          getDownloadURL(
            sRef(storage, "bildirim/" + RightBoxHeader.slice(0, 10))
          ).then((imgURL) => {
            console.log(imgURL);
            url = imgURL;
            Notification.insertAdjacentHTML(
              "afterbegin",
              `<section class="mainnewspage">
                          <div>
                            <img loading="lazy"
                              class="mainimagepage"
                              src="${url}"
                              alt="Example Image"
                            />
                          </div>
                          <div class="maintextpage">
                            <h2>${RightBoxHeader}</h2>
                            <p>
                            ${RightBoxParagraph}
                            </p>
                          </div>
                        </section>`
            );
          });
        });
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

getNotification();
