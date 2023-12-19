const dotenv = require("dotenv");
const firebase = require("firebase");

const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

dotenv.config();
const {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  MEASUREMENTID,
} = process.env;

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
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
