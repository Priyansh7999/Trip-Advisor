import React, { useState } from 'react';
import axios from 'axios';
import styles from './ViewRestaurants.module.css';

export default function ViewRestaurants() {
  const [restaurantName, setRestaurantName] = useState('');
  const [cityName, setCityName] = useState('');
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!restaurantName || !cityName) {
      setError('Please enter both Restaurant Name and City Name.');
      return;
    }

    setLoading(true);
    setError('');
    setRestaurantData(null);

    try {
      const response = await axios.get(
        `http://localhost:7000/get-restaurant-details/${restaurantName}/${cityName}`
      );
      console.log('Received restaurant details:', response.data);
      setRestaurantData(response.data);
    } catch (err) {
      setError('Restaurant not found or error fetching data');
      setRestaurantData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.viewRestaurantContainer}>
      <h1 className={styles.heading}>View Restaurant Details</h1>

      {/* Search Inputs */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter restaurant name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          className={styles.searchInput}
        />
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Error Handling */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p className={styles.loading}>Loading...</p>}

      {/* Display Restaurant Details */}
      {restaurantData && (
        <div className={styles.restaurantDetails}>
          <h2 className={styles.restaurantName}>{restaurantData.name}</h2>

          <div className={styles.section}>
            <h3>About</h3>
            <p>{restaurantData.about}</p>
          </div>

          <div className={styles.section}>
            <h3>Location</h3>
            <div className={styles.detailRow}>
              <p className={styles.detailLabel}>City:</p>
              <p className={styles.detailValue}>{restaurantData.city}</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.detailLabel}>State:</p>
              <p className={styles.detailValue}>{restaurantData.state}</p>
            </div>
            <div className={styles.detailRow}>
              <p className={styles.detailLabel}>Address:</p>
              <p className={styles.detailValue}>{restaurantData.address}</p>
            </div>
          </div>

          <div className={styles.section}>
  <h3>Features</h3>
  {typeof restaurantData.features === 'object' ? (
    Object.entries(restaurantData.features).map(([key, value]) => (
      <div key={key} className={styles.detailRow}>
        <p className={styles.detailLabel}>{key}:</p>
        <p className={styles.detailValue}>
          {Array.isArray(value) ? value.join(', ') : value}
        </p>
      </div>
    ))
  ) : (
    <p className={styles.detailValue}>{restaurantData.features}</p>
  )}
</div>


          <div className={styles.section}>
            <h3>Timings</h3>
            <p>{JSON.stringify(restaurantData.timings, null, 2)}</p>
          </div>

          <div className={styles.section}>
            <h3>Contact Info</h3>
            <p>{JSON.stringify(restaurantData.contact_info, null, 2)}</p>
          </div>

          <div className={styles.section}>
            <h3>Reviews</h3>
            <ul className={styles.featuresList}>
              {Array.isArray(restaurantData.reviews) ? (
                restaurantData.reviews.map((review, index) => (
                  <li key={index}>{review}</li>
                ))
              ) : (
                <li>{restaurantData.reviews}</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
