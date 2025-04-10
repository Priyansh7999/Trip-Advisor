import React, { useState } from 'react'
import AddPlaces from './Components/AddPlaces';
import UpdatePlaces from './Components/UpdatePlaces';
import styles from "./Places.module.css";
export default function Places() {
  const [activeTab, setActiveTab] = useState("AddPlaces");
    const renderTab = () => {
      switch (activeTab) {
        case "AddPlaces":
          return <AddPlaces />;
        case "UpdatePlaces":
          return <UpdatePlaces />;
      }
    };
    return (
      <div>
        <div className={styles.container}>
          <h1>Places Overview</h1>
          <p>Help tourists discover hidden gems, iconic landmarks, and cultural spots by adding complete destination info.</p>
        </div>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "AddPlaces" ? styles.active : ""}`}
            onClick={() => setActiveTab("AddPlaces")}
          >
            ➕ Add Place
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "UpdatePlaces" ? styles.active : ""}`}
            onClick={() => setActiveTab("UpdatePlaces")}
          >
            ➖ Update Place
          </button>
        </div>
        <div className={styles.contentContainer}>
          {renderTab()}
        </div>
      </div>
    )
  }
  