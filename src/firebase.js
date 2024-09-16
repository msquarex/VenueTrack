import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCfJYbeipACZzekVzt-MsX0ypBUoWTCsqw",
    authDomain: "teletrack-fc322.firebaseapp.com",
    projectId: "teletrack-fc322",
    storageBucket: "teletrack-fc322.appspot.com",
    messagingSenderId: "434656208355",
    appId: "1:434656208355:web:04a09d8a3fa65b26762cd6",
    measurementId: "G-SDJ299PL6F"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };