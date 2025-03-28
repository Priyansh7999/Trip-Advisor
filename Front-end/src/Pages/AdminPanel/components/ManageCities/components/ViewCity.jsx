import React, { useState } from 'react';
import styles from './ViewCity.module.css';

export default function ViewCity() {
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!cityName) {
      setError('Please enter a city name.');
      return;
    }

    setLoading(true);
    setError('');
    setCityData(null);

    try {
      const response = await fetch(`http://localhost:7000/get-city-details/${cityName}`);
      if (!response.ok) {
        throw new Error('City not found or error fetching data');
      }
      const data = await response.json();
      console.log('Received city details:', data);
      setCityData(data);
    } catch (err) {
      console.error('❌ Error fetching city details:', err);
      setError(err.message);
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.viewCityContainer}>
      <h1 className={styles.heading}>View City Details</h1>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter city name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>Search</button>
      </div>

      {/* Error Handling */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Display City Details */}
      {cityData && (
        <div className={styles.cityDetails}>
        <h2 className={styles.cityName}>{cityData.city_name || 'N/A'}</h2>
      
        {/* Basic Info */}
        <div className={styles.section}>
          <h3>Basic Info</h3>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Description:</span>
            <span className={styles.detailValue}>{cityData.description || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Best Time to Visit:</span>
            <span className={styles.detailValue}>{cityData.best_time || 'N/A'}</span>
          </div>
        </div>
      
        {/* Seasons */}
        <div className={styles.section}>
          <h3>Seasons</h3>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Peak:</span>
            <span className={styles.detailValue}>{cityData.peak_season_start || 'N/A'} - {cityData.peak_season_end || 'N/A'} ({cityData.peak_season_desc || 'N/A'})</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Moderate:</span>
            <span className={styles.detailValue}>{cityData.moderate_season_start || 'N/A'} - {cityData.moderate_season_end || 'N/A'} ({cityData.moderate_season_desc || 'N/A'})</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Off:</span>
            <span className={styles.detailValue}>{cityData.off_season_start || 'N/A'} - {cityData.off_season_end || 'N/A'} ({cityData.off_season_desc || 'N/A'})</span>
          </div>
        </div>
      
        {/* Overview */}
        <div className={styles.section}>
          <h3>Overview</h3>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Title:</span>
            <span className={styles.detailValue}>{cityData.city_title || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>History:</span>
            <span className={styles.detailValue}>{cityData.city_history || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>State:</span>
            <span className={styles.detailValue}>{cityData.state || 'N/A'}</span>
          </div>
        </div>
      
        {/* How to Reach */}
        <div className={styles.section}>
          <h3>How to Reach</h3>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>By Air:</span>
            <span className={styles.detailValue}>{cityData.by_air || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>By Rail:</span>
            <span className={styles.detailValue}>{cityData.by_rail || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>By Road:</span>
            <span className={styles.detailValue}>{cityData.by_road || 'N/A'}</span>
          </div>
        </div>
      
        {/* Food to Try */}
        <div className={styles.section}>
          <h3>Food to Try</h3>
          <ul className={styles.foodList}>
            {cityData.food_to_try ? JSON.parse(cityData.food_to_try).map((food, index) => (
              <li key={index} className={styles.detailRow}>
                <span className={styles.detailLabel}>{food.name}:</span>
                <span className={styles.detailValue}>{food.description}</span>
              </li>
            )) : <li>N/A</li>}
          </ul>
        </div>
      
        {/* Things to Buy */}
        <div className={styles.section}>
          <h3>Things to Buy</h3>
          <ul className={styles.buyList}>
            {cityData.things_to_buy ? JSON.parse(cityData.things_to_buy).map((item, index) => (
              <li key={index} className={styles.detailRow}>
                <span className={styles.detailLabel}>{item.heading}:</span>
                <span className={styles.detailValue}>{item.description}</span>
              </li>
            )) : <li>N/A</li>}
          </ul>
        </div>
      
        {/* Reviews */}
        <div className={styles.section}>
          <h3>Reviews</h3>
          <ul className={styles.reviews}>
            {cityData.reviews ? JSON.parse(cityData.reviews).map((review, index) => (
              <li key={index} className={styles.detailRow}>
                <span className={styles.detailLabel}>Review {index + 1}:</span>
                <span className={styles.detailValue}>{review || 'No Review'}</span>
              </li>
            )) : <li>N/A</li>}
          </ul>
        </div>
      </div>
      
      )}
    </div>
  );
}
