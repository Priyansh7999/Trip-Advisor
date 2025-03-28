import React from "react";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Dashboard Heading */}
      <h2 className={styles.heading}>Dashboard Overview</h2>

      {/* Statistics Section */}
      <div className={styles.statsContainer}>
        <div className={styles.statBox}>
          <h3>12</h3>
          <p>Cities</p>
        </div>
        <div className={styles.statBox}>
          <h3>45</h3>
          <p>Hotels</p>
        </div>
        <div className={styles.statBox}>
          <h3>67</h3>
          <p>Restaurants</p>
        </div>
        <div className={styles.statBox}>
          <h3>23</h3>
          <p>Tourist Places</p>
        </div>
        <div className={styles.statBox}>
          <h3>120</h3>
          <p>Trips Planned</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <h2 className={styles.heading}>Recent Activity</h2>
      <div className={styles.activityLog}>
        <ul>
          <li>✅ Admin added a new city: <strong>New York</strong></li>
          <li>✅ Updated hotel details for <strong>Hotel California</strong></li>
          <li>✅ New user registered: <strong>JohnDoe123</strong></li>
          <li>✅ Admin added a new tourist spot: <strong>Eiffel Tower</strong></li>
          <li>✅ Restaurant details updated for <strong>Le Gourmet</strong></li>
        </ul>
      </div>
    </div>
  );
}
