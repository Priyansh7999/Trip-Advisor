import React from 'react';
import './SkeletonLoader.css'; // Style for skeleton loading

const AllCitySkeleton = () => {
  return (
    <div className="city-cards-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="city-card skeleton" key={index}>
          <div className="city-card-image skeleton"></div>
          <div className="city-card-content">
            <div className="city-card-header">
              <div className="city-card-number skeleton"></div>
              <div className="city-card-title skeleton"></div>
            </div>
            <div className="city-card-desc skeleton"></div>
          </div>
          <div className="city-card-footer">
            <div className="explore-button skeleton"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllCitySkeleton;
