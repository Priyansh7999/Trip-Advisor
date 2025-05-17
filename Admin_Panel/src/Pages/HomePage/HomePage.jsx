import React from 'react';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.title}>Welcome to the Trip Planner Admin Panel 🚀</h2>
        <p className={styles.subtitle}>Manage your cities, places, hotels, and restaurants in one place.</p>
      </div>
      

      <div className={styles.infoBoxes}>
        <div className={styles.card}>
          <h3>Cities Management</h3>
          <p>Add, update or remove travel destination cities.</p>
        </div>
        <div className={styles.card}>
          <h3>Places Explorer</h3>
          <p>Control sightseeing spots and interesting attractions per city.</p>
        </div>
        <div className={styles.card}>
          <h3>Hotels & Stays</h3>
          <p>Keep hotel details up-to-date for travelers.</p>
        </div>
        {/* <div className={styles.card}>
          <h3>Restaurants</h3>
          <p>Manage local food spots and dining recommendations.</p>
        </div> */}
      </div>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Trip Planner Admin Panel. All rights reserved.</p>
      </footer>
    </div>
  );
}
