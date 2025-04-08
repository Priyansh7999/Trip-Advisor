import React, { useState } from 'react'
import AddPlaces from './Components/AddPlaces';
import UpdatePlaces from './Components/updatePlaces';
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
          <h1>Hotels Overview</h1>
          <p>Help tourists discover hidden gems, iconic landmarks, and cultural spots by adding complete destination info.</p>
        </div>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${activeTab === "AddPlaces" ? styles.active : ""}`}
            onClick={() => setActiveTab("AddPlaces")}
          >
            ➕ Add City
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "UpdatePlaces" ? styles.active : ""}`}
            onClick={() => setActiveTab("UpdatePlaces")}
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
  