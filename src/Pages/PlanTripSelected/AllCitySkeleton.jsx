import React from 'react';
import styles from './SkeletonLoader.module.css'; // Style for skeleton loading

const AllCitySkeleton = () => {
  return (
    <div className={styles["city-cards-grid"]} id="city-cards-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className={styles["city-card"]} id="city-card skeleton" key={index}>
          <div className={styles["city-card-image"]} id="city-card-image skeleton"></div>
          <div className={styles["city-card-content"]} id="city-card-content">
            <div className={styles["city-card-header"]} id="city-card-header">
              <div className={styles["city-card-number"]} id="city-card-number skeleton"></div>
              <div className={styles["city-card-title"]} id="city-card-title skeleton"></div>
            </div>
            <div className={styles["city-card-desc"]} id="city-card-desc skeleton"></div>
          </div>
          <div className={styles["city-card-footer"]} id="city-card-footer">
            <div className="explore-button skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCitySkeleton;
