import React, { useState } from "react";
import styles from "./UserPanel.module.css";
import UserProfile from "./components/UserProfile/UserProfile";
import UserReviews from "./components/UserReviews/UserReviews";
import UserFavorites from "./components/UserFavorites/UserFavorites.jsx";

export default function UserPanel() {
  const [activeSection, setActiveSection] = useState("UserProfile");

  // Function to render the selected component
  const renderSection = () => {
    switch (activeSection) {
      case "UserProfile":
        return <UserProfile />;
      case "UserReviews":
        return <UserReviews />;
      case "UserFavorites":
        return <UserFavorites />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className={styles.userPanel}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <h2>User Panel</h2>
        <ul>
          <li className={activeSection === "UserProfile" ? styles.active : ""} onClick={() => setActiveSection("UserProfile")}>
            Personal Info
          </li>
          <li className={activeSection === "UserReviews" ? styles.active : ""} onClick={() => setActiveSection("UserReviews")}>
            My Reviews
          </li>
          <li className={activeSection === "UserFavorites" ? styles.active : ""} onClick={() => setActiveSection("UserFavorites")}>
            Favorite Places
          </li>
        </ul>
      </aside>

      {/* Main Content - Dynamic Rendering */}
      <div className={styles.mainContent}>{renderSection()}</div>
    </div>
  );
}
