import admin from "firebase-admin"

import serviceAccount from "../serviceAccountKey.json"  assert { type: "json" };
// import * as serviceAccountKey from './serviceAccountKey.json';

const firebaseConfig = {
  apiKey: "AIzaSyCdaXFWDX-FXWb6XPcBFvvOBSxHVELie04",
  authDomain: "club-management-system-642af.firebaseapp.com",
  projectId: "club-management-system-642af",
  storageBucket: "club-management-system-642af.appspot.com",
  messagingSenderId: "276718748396",
  appId: "1:276718748396:web:4c3c7d689b03df9a5e9bc9",
  measurementId: "G-0D4DNPLRDK",
  credential: admin.credential.cert(serviceAccount)
};
admin.initializeApp(firebaseConfig);

const db = admin.firestore();




export const otpRef  = db.collection("otp");
export const Users = db.collection('User');
export const Companies = db.collection('Companies');
export const Jobs = db.collection('Jobs');
export const Comments = db.collection('Comments');

