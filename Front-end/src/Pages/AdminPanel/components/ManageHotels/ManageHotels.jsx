import React, { useState } from 'react';
import styles from './ManageHotels.module.css';
import AddHotel from './components/AddHotel';
import UpdateHotel from './components/UpdateHotel';
import ViewHotel from './components/ViewHotel';
export default function ManageHotels() {
  const [activeTab, setActiveTab] = useState("AddHotel");

  // Function to render the selected component
  const renderTab = () => {
    switch (activeTab) {
      case "AddHotel":
        return <AddHotel />;
      case "UpdateHotel":
        return <UpdateHotel />;
      case "ViewHotel":
        return <ViewHotel />;
      default:
        return <AddHotel />;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🏨 Manage Hotels</h1>
      <p className={styles.description}>
        Effortlessly add, update, or view Hotels details. Keep your travel database updated and accurate!
      </p>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === "AddHotel" ? styles.active : ""}`}
          onClick={() => setActiveTab("AddHotel")}
        >
          ➕ Add Hotel
        </button>
        {/* <button 
          className={`${styles.tabButton} ${activeTab === "UpdateHotel" ? styles.active : ""}`}
          onClick={() => setActiveTab("UpdateHotel")}
        >
          ✏️ Update Hotel
        </button> */}
        <button 
          className={`${styles.tabButton} ${activeTab === "ViewHotel" ? styles.active : ""}`}
          onClick={() => setActiveTab("ViewHotel")}
        >
          ➖ View Hotel
        </button>
      </div>

      {/* Dynamic Content */}
      <div className={styles.contentContainer}>
        {renderTab()}
      </div>
    </div>
  );
}
