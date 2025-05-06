import React, { useContext, useState, useEffect } from 'react'; 
import axios from 'axios'; 
import styles from './GiveReviews.module.css'; 
import { TripPlannerContext } from '../../context';  

export default function GiveReviews({ type, name }) {
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const { authenticated, userProfilename } = useContext(TripPlannerContext);
  
  console.log("GiveReviews render - authenticated:", authenticated, "username:", userProfilename);
  
  const handleSubmit = async () => {
    if (!authenticated) {
      console.log("Not authenticated in handleSubmit");
      setMessage('Please log in to submit a review.');
      return;
    }
    
    if (!review.trim()) {
      setMessage('Please write a review before submitting.');
      return;
    }
    
    const endpoint = `http://localhost:5000/store-review-${type.toLowerCase()}`;
    
    try {
      console.log("Submitting review as:", userProfilename);
      
      const response = await axios.post(endpoint, {
        name,
        username: userProfilename,
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
      
      {!authenticated ? (
        <div className={styles.authMessage}>
          <p style={{textAlign: 'center'}}>You need to log in to submit a review.</p>
          <button 
            onClick={() => window.location.href = "/login"}
            className={styles.button}
          >
            Go to Login
          </button>
        </div>
      ) : (
        <>
          <p>Posting as: {userProfilename}</p>
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
        </>
      )}
      
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}