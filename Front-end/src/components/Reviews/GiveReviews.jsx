import React, { useState } from 'react';
import axios from 'axios';
import styles from './GiveReviews.module.css';

export default function GiveReviews({ type, name, username }) {
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!review.trim()) {
      setMessage('Please write a review before submitting.');
      return;
    }

    const endpoint = `http://localhost:5000/store-review-${type.toLowerCase()}`;

    try {
      const response = await axios.post(endpoint, {
        name,
        username,
        review,
      });

      if (response.status === 200) {
        setMessage('Review submitted successfully!');
        setReview('');
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting review. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Leave a Review for {name}</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows={5}
        className={styles.textarea}
        placeholder={`Write your review for this ${type.toLowerCase()}...`}
      />
      <div>
        <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
      </div>
      
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
