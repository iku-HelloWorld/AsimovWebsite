"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCIQyW2X33YimVFujydd3ycfrmuC-oLYzo",
  authDomain: "asimov-website.firebaseapp.com",
  databaseURL: "https://asimov-website-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "asimov-website",
  storageBucket: "asimov-website.appspot.com",
  messagingSenderId: "693182885740",
  appId: "1:693182885740:web:a8450b8b14a41579778d49",
  measurementId: "G-HS93FSYNKF"
};

const etkinlikler=document.querySelector(".etkinliklerimiz--slides");
const app = initializeApp(firebaseConfig);
const database = getDatabase();
get(child(ref(getDatabase()),"etkinlikler/")).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
    Object.entries(snapshot.val()).forEach(element => {
      console.log(element);
      etkinlikler.insertAdjacentHTML("afterbegin",`<div class="etkinliklerimiz--slide">
      <img loading="lazy" src="Asimov_Logolar/HelloWorld_Normal.png" />
      <h1>${element[1].başlık}</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing
        elit.Accusantium, ullam. Iusto modi quidem excepturi! Unde
        impeditlaudantium autem, natus nisi dicta, et aperiam accusamus
        magnamvero, dolorum reiciendis quo incidunt!Lorem, ipsum dolor sit
        ametconsectetur adipisicing elit. Accusantium, ullam. Iusto
        modiquidem excepturi! Unde impedit danslideIndex Lorem, ipsum
        dolorsit amet consectetur adipisicing elit. Accusantium, ullam.
        Iustomodi quidem exceptur letter 562
      </p>
    </div>`)
    });
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

{/* <div class="etkinliklerimiz--slide">
            <img loading="lazy" src="Asimov_Logolar/HelloWorld_Normal.png" />
            <h1>lorem ipsum</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing
              elit.Accusantium, ullam. Iusto modi quidem excepturi! Unde
              impeditlaudantium autem, natus nisi dicta, et aperiam accusamus
              magnamvero, dolorum reiciendis quo incidunt!Lorem, ipsum dolor sit
              ametconsectetur adipisicing elit. Accusantium, ullam. Iusto
              modiquidem excepturi! Unde impedit danslideIndex Lorem, ipsum
              dolorsit amet consectetur adipisicing elit. Accusantium, ullam.
              Iustomodi quidem exceptur letter 562
            </p>
          </div> */}