import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ViewReviews.module.css';

export default function ViewReviews({ type, name }) {
  const [reviews, setReviews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const endpoint = `http://localhost:5000/view-review-${type.toLowerCase()}`;
        const response = await axios.post(endpoint, { name });
        if (response.data.reviews) {
          setReviews(response.data.reviews);
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      }
    };

    fetchReviews();
  }, [type, name]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const visibleReviews = reviews.slice(0, visibleCount);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Reviews for {name}</h2>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>No reviews yet.</p>
      ) : (
        <>
          <div className={styles.reviewList}>
            {visibleReviews.map((rev, idx) => (
              <div key={idx} className={styles.reviewItem}>
                <p className={styles.username}>{rev?.username}</p>
                <p className={styles.reviewText}>{rev?.review}</p>
              </div>
            ))}
          </div>
          {visibleCount < reviews.length && (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
