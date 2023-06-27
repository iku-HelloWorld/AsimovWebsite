import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getStorage,
  getDownloadURL,
  ref as sRef,
  listAll,
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
const db = getDatabase();
const auth = getAuth();
const storage = getStorage(app);

const sponsorContainer = document.querySelector(".sponsor-container");

// Verileri Firebase'den alıp HTML'e ekleme
function showSponsors() {
  const listRef = sRef(storage, "sponsorImages/");
  listAll(listRef)
    .then((res) => {
      sponsorContainer.innerHTML = "";
      res.items.forEach((itemRef) => {
        console.log(itemRef);
        getDownloadURL(sRef(storage, "sponsorImages/" + itemRef.name)).then(
          (url) => {
            // console.log(url);
            sponsorContainer.insertAdjacentHTML(
              "beforeend",
              ` <img loading="lazy" src="${url}" alt="" class="sponsor-img">
                <div class="sponsor-content">
                  <h1 class="sponsor-title">${itemRef.name}</h1>
                </div>`
            );
          }
        );
        // sponsorContainer.insertAdjacentHTML(
        //   "beforeend",
        //   `<img src="" alt="" class="sponsor-img">
        //   <div class="sponsor-content">
        //     <h1 class="sponsor-title">Roketsan</h1>
        //     <p class="sponsor-description">
        //       Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        //       Voluptatibus earum accusantium nostrum eum dolorem. <br>
        //       Expedita fugit, in perspiciatis labore ut dolores architecto
        //       assumenda eos laborum magnam officiis
        //     </p>
        //   </div>`
        // );
      });
    })
    .catch((error) => {
      console.error(error);
    });
  // get(child(ref(db), "sponsorImages"))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       sponsorContainer.innerHTML = "";
  //       const sponsors = snapshot.val();
  //       Object.keys(sponsors).forEach((sponsorKey) => {
  //         const sponsor = sponsors[sponsorKey];
  //         const description = sponsor.description;
  //         const image = sponsor.imageURL;
  //         const title = sponsor.title;

  //         const sponsorHTML = `
  //           <div class="sponsor-card">
  //             <img class="sponsor-img" src="${image}" alt="${title}" />
  //             <h3 class="sponsor-title">${title}</h3>
  //             <p class="sponsor-description">${description}</p>
  //           </div>
  //         `;
  //         sponsorContainer.insertAdjacentHTML("beforeend", sponsorHTML);
  //       });
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}

// Sponsors'u göster
showSponsors();
