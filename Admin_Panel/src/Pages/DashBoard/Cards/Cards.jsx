import React, { useEffect, useState } from 'react';
import styles from './Cards.module.css';

export default function Cards() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch('http://localhost:5000/dashboard-counts');
        const data = await res.json();
        setCounts(data);
      } catch (err) {
        console.error('Failed to fetch dashboard counts', err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <p>Total Cities</p>
        <h2>{counts.totalCities}</h2>
      </div>
      <div className={styles.cards}>
        <p>Total Places</p>
        <h2>{counts.totalPlaces}</h2>
      </div>
      <div className={styles.cards}>
        <p>Total Hotels</p>
        <h2>{counts.totalHotels}</h2>
      </div>
      
    </div>
  );
}
