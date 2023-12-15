const firebase = require("firebase");
const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");

const firebaseConfig = {
  apiKey: "AIzaSyCT2tM9bIgHUN3jgDB1ZeePvK4uvsbqdyE",
  authDomain: "agrisight-db.firebaseapp.com",
  projectId: "agrisight-db",
  storageBucket: "agrisight-db.appspot.com",
  messagingSenderId: "452340927341",
  appId: "1:452340927341:web:ba50f8d7892e02fcc2e864",
  measurementId: "G-4Q3NEVJZYL",
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
