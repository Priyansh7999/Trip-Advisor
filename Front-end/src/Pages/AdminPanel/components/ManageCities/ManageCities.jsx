import React, { useState } from "react";
import styles from "./ManageCities.module.css";
import AddCity from "./components/AddCity";
import UpdateCity from "./components/UpdateCity";
import ViewCity from "./components/ViewCity";

export default function ManageCities() {
  const [activeTab, setActiveTab] = useState("AddCity");

  // Function to render the selected component
  const renderTab = () => {
    switch (activeTab) {
      case "AddCity":
        return <AddCity />;
      case "UpdateCity":
        return <UpdateCity />;
      case "ViewCity":
        return <ViewCity />;
      default:
        return <AddCity />;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🌍 Manage Cities</h1>
      <p className={styles.description}>
        Effortlessly add, update, or view city details. Keep your travel database updated and accurate!
      </p>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === "AddCity" ? styles.active : ""}`}
          onClick={() => setActiveTab("AddCity")}
        >
          ➕ Add City
        </button>
        {/* <button 
          className={`${styles.tabButton} ${activeTab === "UpdateCity" ? styles.active : ""}`}
          onClick={() => setActiveTab("UpdateCity")}
        >
          ✏️ Update City
        </button> */}
        <button 
          className={`${styles.tabButton} ${activeTab === "ViewCity" ? styles.active : ""}`}
          onClick={() => setActiveTab("ViewCity")}
        >
          ➖ View City
        </button>
      </div>

      {/* Dynamic Content */}
      <div className={styles.contentContainer}>
        {renderTab()}
      </div>
    </div>
  );
}
