import React, { useState } from 'react'
import styles from './CityDetails.module.css'
import AddCity from './Components/AddCity';
import UpdateCity from './Components/UpdateCity';
export default function CityDetails() {
  const [activeTab, setActiveTab] = useState("AddCity");
  const renderTab = () => {
    switch (activeTab) {
      case "AddCity":
        return <AddCity />;
      case "UpdateCity":
        return <UpdateCity />;
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <h1>Cities Overview</h1>
        <p>Help users discover more places by entering accurate and complete city info.</p>
      </div>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === "AddCity" ? styles.active : ""}`}
          onClick={() => setActiveTab("AddCity")}
        >
          ➕ Add City
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "UpdateCity" ? styles.active : ""}`}
          onClick={() => setActiveTab("UpdateCity")}
        >
          ➖ Update City
        </button>
      </div>
      <div className={styles.contentContainer}>
        {renderTab()}
      </div>
    </div>
  )
}
