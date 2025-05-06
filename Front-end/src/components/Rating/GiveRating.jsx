import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './GiveRating.module.css';
import { TripPlannerContext } from '../../context';  
export default function GiveRating({ type, name }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { authenticated } = useContext(TripPlannerContext);
  const handleRating = async (rating) => {
    if (!authenticated) {
      window.location.href = '/login';
      return;
    }
    setSelected(rating);
    setLoading(true);
    setMessage('');
    
    try {
      const endpoint = `http://localhost:5000/view-rating-${type.toLowerCase()}`;
      const res = await axios.post(endpoint, { 
        name, 
        rating: Number(rating)
      });
      
      if (res.data.newRating) {
        setMessage(`Rating submitted! Current average: ${res.data.newRating.toFixed(1)}`);
      } else {
        setMessage(res.data.message || 'Rating submitted!');
      }
    } catch (err) {
      console.error('Failed to submit rating:', err);
      if (err.response) {
        setMessage(`Error: ${err.response.data.message || 'Server error'}`);
      } else if (err.request) {
        setMessage('Error: No response from server. Please try again.');
      } else {
        setMessage('Failed to submit rating. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Rate {name}</h3>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            className={`${styles.star} ${
              (hovered || selected) >= num ? styles.active : ''
            }`}
            onMouseEnter={() => setHovered(num)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handleRating(num)}
          >
            ★
          </span>
        ))}
      </div>
      {selected > 0 && <p className={styles.result}>You rated: {selected} / 5</p>}
      {loading && <p className={styles.loading}>Submitting rating...</p>}
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}