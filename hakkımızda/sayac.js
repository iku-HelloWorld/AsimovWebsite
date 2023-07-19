"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";
import {
  getStorage,
  listAll,
  ref as sRef,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const storage = getStorage();
const core = sRef(storage, "coreMember/");
const hw = sRef(storage, "helloWorldMember/");
const roket = sRef(storage, "roketMember/");
const oto = sRef(storage, "otonomMember/");
const ai = sRef(storage, "dataaiÜye/");
const ki = sRef(storage, "coprorateCommunicationMember/");
const yk = sRef(storage, "yönetimKuruluÜye/");

let arr = [];
let etkCount = 0;
const getMemberCount = function () {
  listAll(hw)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(core)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(roket)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(oto)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(ai)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(yk)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        // console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  listAll(ki)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        //   console.log(folderRef);
      });
      res.items.forEach((itemRef) => {
        console.log(itemRef);
        arr.push(itemRef.name);
      });
      updateCount();
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  get(child(ref(getDatabase()), "etkinlikler/")).then((snapshot) => {
    etkCount = Object.keys(snapshot.val()).length;
    updateCount();
  });
};
const updateCount = function () {
  document.querySelector("#member-count").dataset.value = arr.length;
  document.querySelector("#activitiy-count").dataset.value = etkCount;
};

getMemberCount();
