import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD-UeZmBYicDETkLE7sD_386cdIrqK8kGo",
  authDomain: "venuetrack-8b104.firebaseapp.com",
  projectId: "venuetrack-8b104",
  storageBucket: "venuetrack-8b104.appspot.com",
  messagingSenderId: "153064058350",
  appId: "1:153064058350:web:0b4afa92ca01b6d60272ff",
  measurementId: "G-Q1Q84XHP9E"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Create a custom auth object
const customAuth = {
  currentUser: null,
};

export { customAuth };