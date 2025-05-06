
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAeOzC9TNRG8g2VOkf-Z9F1GGXydQHNm94",
  authDomain: "trip-planner-ff15d.firebaseapp.com",
  projectId: "trip-planner-ff15d",
  storageBucket: "trip-planner-ff15d.firebasestorage.app",
  messagingSenderId: "284691399810",
  appId: "1:284691399810:web:5d877909557d4e8fe6a09b",
  measurementId: "G-F29JEVZM94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app); 
export default app