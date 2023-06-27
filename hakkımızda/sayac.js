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

const arr = [];
const getMemberCount = function () {
  listAll(hw)
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
  listAll(core)
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
  listAll(roket)
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
  listAll(oto)
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
  listAll(ai)
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
  listAll(yk)
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
};
const updateCount = function () {
  document.querySelector(".sayac-num").textContent = arr.length;
};

getMemberCount();
