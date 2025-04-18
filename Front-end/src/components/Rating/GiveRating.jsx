import React, { useState } from 'react';
import axios from 'axios';
import styles from './GiveRating.module.css';

export default function GiveRating({ type, name }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [message, setMessage] = useState('');

  const handleRating = async (rating) => {
    setSelected(rating);
    try {
      const endpoint = `http://localhost:5000/view-rating-${type.toLowerCase()}`;
      const res = await axios.post(endpoint, { name, rating });
      setMessage(res.data.message || 'Rating submitted!');
    } catch (err) {
      console.error('Failed to submit rating:', err);
      setMessage('Failed to submit rating.');
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
    </div>
  );
}
