import React, { useState } from 'react'
import AddPlace from './components/AddPlace';
import UpdatePlace from './components/UpdatePlace';
import ViewPlace from './components/ViewPlace';
import styles from "./ManagePlaces.module.css";
export default function ManagePlaces() {
const [activeTab, setActiveTab] = useState("AddPlace");

  // Function to render the selected component
  const renderTab = () => {
    switch (activeTab) {
      case "AddPlace":
        return <AddPlace />;
      case "UpdatePlace":
        return <UpdatePlace />;
      case "ViewPlace":
        return <ViewPlace />;
      default:
        return <AddPlace />;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🌍 Manage Places</h1>
      <p className={styles.description}>
        Effortlessly add, update, or view Places details. Keep your travel database updated and accurate!
      </p>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === "AddPlace" ? styles.active : ""}`}
          onClick={() => setActiveTab("AddPlace")}
        >
          ➕ Add Place
        </button>
        {/* <button 
          className={`${styles.tabButton} ${activeTab === "UpdatePlace" ? styles.active : ""}`}
          onClick={() => setActiveTab("UpdatePlace")}
        >
          ✏️ Update Place
        </button> */}
        <button 
          className={`${styles.tabButton} ${activeTab === "ViewPlace" ? styles.active : ""}`}
          onClick={() => setActiveTab("ViewPlace")}
        >
          ➖ View Place
        </button>
      </div>

      {/* Dynamic Content */}
      <div className={styles.contentContainer}>
        {renderTab()}
      </div>
    </div>
  );
}
