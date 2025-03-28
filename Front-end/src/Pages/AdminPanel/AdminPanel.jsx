import React, { useState } from "react";
import styles from "./AdminPanel.module.css";
import Dashboard from "./components/Dashboard/Dashboard";
import ManageCities from "./components/ManageCities/ManageCities";
import ManageHotels from "./components/ManageHotels/ManageHotels";
import ManageRestaurants from "./components/ManageRestaurants/ManageRestaurants";
import ManagePlaces from "./components/ManagePlaces/ManagePlaces";
import Reports from "./components/Reports/Reports";

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Function to render the selected component
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard />;
      case "ManageCities":
        return <ManageCities />;
      case "ManageHotels":
        return <ManageHotels />;
      case "ManageRestaurants":
        return <ManageRestaurants />;
      case "ManagePlaces":
        return <ManagePlaces />;
      case "Reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.adminPanel}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeSection === "Dashboard" ? styles.active : ""} onClick={() => setActiveSection("Dashboard")}>
            Dashboard
          </li>
          <li className={activeSection === "ManageCities" ? styles.active : ""} onClick={() => setActiveSection("ManageCities")}>
            Manage City Details
          </li>
          <li className={activeSection === "ManageHotels" ? styles.active : ""} onClick={() => setActiveSection("ManageHotels")}>
            Manage Hotel Details
          </li>
          <li className={activeSection === "ManageRestaurants" ? styles.active : ""} onClick={() => setActiveSection("ManageRestaurants")}>
            Manage Restaurant Details
          </li>
          <li className={activeSection === "ManagePlaces" ? styles.active : ""} onClick={() => setActiveSection("ManagePlaces")}>
            Manage Places to Visit
          </li>
        </ul>
      </aside>

      {/* Main Content - Dynamic Rendering */}
      <div className={styles.mainContent}>{renderSection()}</div>
    </div>
  );
}
