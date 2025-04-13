import React, { useState } from 'react'
import AddRestaurant from './Components/AddRestaurant';
import UpdateRestaurant from './Components/UpdateRestaurant';
import styles from './Restaurant.module.css'
export default function Restaurant() {
 const [activeTab, setActiveTab] = useState("AddRestaurant");
   const renderTab = () => {
     switch (activeTab) {
       case "AddRestaurant":
         return <AddRestaurant />;
       case "UpdateRestaurant":
         return <UpdateRestaurant />;
     }
   };
   return (
     <div>
       <div className={styles.container}>
         <h1>Restaurant Overview</h1>
         <p>From cozy cafés to gourmet spots — add all key information and images to list this eatery.</p>
       </div>
       <div className={styles.tabContainer}>
         <button
           className={`${styles.tabButton} ${activeTab === "AddRestaurant" ? styles.active : ""}`}
           onClick={() => setActiveTab("AddRestaurant")}
         >
           ➕ Add Restaurant
         </button>
         <button
           className={`${styles.tabButton} ${activeTab === "UpdateRestaurant" ? styles.active : ""}`}
           onClick={() => setActiveTab("UpdateRestaurant")}
         >
           ➖ Update Restaurant
         </button>
       </div>
       <div className={styles.contentContainer}>
         {renderTab()}
       </div>
     </div>
   )
 }
 