import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDLGC7AkJBkg6Z1eBaZ-iFEBGdmvFINkgg",
  authDomain: "vue-socialtipping-app.firebaseapp.com",
  projectId: "vue-socialtipping-app",
  storageBucket: "vue-socialtipping-app.appspot.com",
  messagingSenderId: "229145236405",
  appId: "1:229145236405:web:4b8e435a294e57720abffc",
  measurementId: "G-D9DGVF2RBV",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
