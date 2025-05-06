import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../Firebase/Firebase'; 
import { doc, getDoc } from 'firebase/firestore';

export const TripPlannerContext = createContext(null);

export default function TripPlanner({ children }) {
  const [Month, setMonth] = useState({
    month: null,
    image: null,
  });
  
  const [TripCategory, setTripCategory] = useState({
    name: null,
    image: null,
    description: null,
  });
  
  const [authenticated, setAuthenticated] = useState(false);
  const [userProfilename, setUserProfilename] = useState('');
  const [userData, setUserData] = useState(null);
  const fetchUserData = async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userDataFromDb = docSnap.data();
          setUserData(userDataFromDb);
          const profileName = userDataFromDb.firstName || user.email.split('@')[0];
          setUserProfilename(profileName);
          console.log("User data loaded from Firestore, profile name set to:", profileName);
        } else {
          const emailPrefix = user.email.split('@')[0];
          setUserProfilename(emailPrefix);
          console.log("No user data in Firestore, using email prefix:", emailPrefix);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserProfilename(user.email.split('@')[0]);
      }
    } else {
      setUserData(null);
      setUserProfilename('');
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("TripPlanner context - user authenticated:", user.email);
        setAuthenticated(true);
        await fetchUserData(user);
      } else {
        console.log("TripPlanner context - no user authenticated");
        setAuthenticated(false);
        setUserProfilename('');
        setUserData(null);
      }
    });
    
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    console.log("TripPlanner context values updated:", {
      authenticated,
      userProfilename,
      hasUserData: !!userData
    });
  }, [authenticated, userProfilename, userData]);
  
  return (
    <TripPlannerContext.Provider
      value={{
        Month,
        setMonth,
        TripCategory,
        setTripCategory,
        authenticated,
        setAuthenticated,
        userProfilename,
        setUserProfilename,
        userData,
      }}
    >
      {children}
    </TripPlannerContext.Provider>
  );
}