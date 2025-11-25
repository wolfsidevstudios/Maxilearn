import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALmX4xk9t4PbRK_3MSl3wxMyEayK9tbBI",
  authDomain: "wolfsi-studios.firebaseapp.com",
  projectId: "wolfsi-studios",
  storageBucket: "wolfsi-studios.firebasestorage.app",
  messagingSenderId: "562922803230",
  appId: "1:562922803230:web:24359187c0428efb275e0f",
  measurementId: "G-9TL27CC0FK"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };