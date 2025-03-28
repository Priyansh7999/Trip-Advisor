import React, { useState } from 'react';
import styles from './ManageRestaurants.module.css';
import AddRestaurants from './components/AddRestaurants';
import UpdateRestaurants from './components/UpdateRestaurants';
import ViewRestaurants from './components/ViewRestaurants';
export default function ManageRestaurants() {
  const [activeTab, setActiveTab] = useState("AddRestaurants");
 
   // Function to render the selected component
   const renderTab = () => {
     switch (activeTab) {
       case "AddRestaurants":
         return <AddRestaurants />;
       case "UpdateRestaurants":
         return <UpdateRestaurants />;
       case "ViewRestaurants":
         return <ViewRestaurants />;
       default:
         return <AddRestaurants />;
     }
   };
 
   return (
     <div className={styles.container}>
       <h1 className={styles.heading}>🍴 Manage Restaurants</h1>
       <p className={styles.description}>
         Effortlessly add, update, or view Restaurants details. Keep your travel database updated and accurate!
       </p>
 
       {/* Tab Navigation */}
       <div className={styles.tabContainer}>
         <button 
           className={`${styles.tabButton} ${activeTab === "AddRestaurants" ? styles.active : ""}`}
           onClick={() => setActiveTab("AddRestaurants")}
         >
           ➕ Add Restaurants
         </button>
         {/* <button 
           className={`${styles.tabButton} ${activeTab === "UpdateRestaurants" ? styles.active : ""}`}
           onClick={() => setActiveTab("UpdateRestaurants")}
         >
           ✏️ Update Restaurants
         </button> */}
         <button 
           className={`${styles.tabButton} ${activeTab === "ViewRestaurants" ? styles.active : ""}`}
           onClick={() => setActiveTab("ViewRestaurants")}
         >
           ➖ View Restaurants
         </button>
       </div>
 
       {/* Dynamic Content */}
       <div className={styles.contentContainer}>
         {renderTab()}
       </div>
     </div>
   );
 }
 