import React from 'react';
import './SkeletonLoader.css'; // Style for skeleton loading

const LesserKnownSkeleton = () => {
  return (
    <div className="lesser-known-skeleton">
      <h1>LESSER KNOWN WONDERS IN INDIA</h1>
      <div className="lesser-known-cards">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="lesser-known-card skeleton">
            <div className="lesser-known-card-img skeleton"></div>
            <div className="lesser-known-card-info">
              <div className="skeleton-title"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LesserKnownSkeleton;
