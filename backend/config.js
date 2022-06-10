// Import the functions you need from the SDKs you need
/*
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {

  apiKey: "AIzaSyAUFAmGa9rFF1vE6qPIw8Jgk7X08Vxfp9Y",

  authDomain: "twitter-data-cce17.firebaseapp.com",

  databaseURL: "https://twitter-data-cce17-default-rtdb.firebaseio.com",

  projectId: "twitter-data-cce17",

  storageBucket: "twitter-data-cce17.appspot.com",

  messagingSenderId: "666831500521",

  appId: "1:666831500521:web:a4c65eccb27206d1c3ec78",

  measurementId: "G-FFSJ1K993T"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
*/

var admin = require('firebase-admin')

var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://twitter-data-cce17-default-rtdb.firebaseio.com',
})

export const db = admin.firestore()
