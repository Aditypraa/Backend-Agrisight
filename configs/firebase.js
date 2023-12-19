const firebase = require("firebase");

const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const firebaseConfig = {
  apiKey: "AIzaSyAKOjy3XpN6sEAMaHyjCy_zE0gEn7STKvw",
  authDomain: "agrisight-dev.firebaseapp.com",
  projectId: "agrisight-dev",
  storageBucket: "agrisight-dev.appspot.com",
  messagingSenderId: "901563183991",
  appId: "1:901563183991:web:da646462fc5e8a83442772",
  measurementId: "G-MDYZZDGGGR",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const tanamanRef = db.collection("tanaman");
const artikelRef = db.collection("artikel");

firebase.initializeApp(firebaseConfig);

module.exports = {
  admin,
  firebase,
  db,
  tanamanRef,
  artikelRef,
};
