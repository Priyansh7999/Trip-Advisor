import React, { useState } from 'react'
import AddHotel from './Components/AddHotel';
import UpdateHotel from './Components/UpdateHotel';
import styles from './Hotel.module.css'
export default function Hotel() {
const [activeTab, setActiveTab] = useState("AddHotel");
  const renderTab = () => {
    switch (activeTab) {
      case "AddHotel":
        return <AddHotel />;
      case "UpdateHotel":
        return <UpdateHotel />;
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <h1>Hotels Overview</h1>
        <p>Provide complete and accurate information to list a new hotel in the system.</p>
      </div>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === "AddHotel" ? styles.active : ""}`}
          onClick={() => setActiveTab("AddHotel")}
        >
          ➕ Add Hotel
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "UpdateHotel" ? styles.active : ""}`}
          onClick={() => setActiveTab("UpdateHotel")}
        >
          ➖ Update Hotel
        </button>
      </div>
      <div className={styles.contentContainer}>
        {renderTab()}
      </div>
    </div>
  )
}
