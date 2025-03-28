import React, { useState } from 'react';
import styles from './ViewPlace.module.css';

export default function ViewPlace() {
  const [placeName, setPlaceName] = useState('');
  const [cityName, setCityName] = useState('');
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!placeName || !cityName) {
      setError('Please enter both Place Name and City Name.');
      return;
    }

    setLoading(true);
    setError('');
    setPlaceData(null);

    try {
      const response = await fetch(`http://localhost:7000/get-place-details/${placeName}/${cityName}`);
      if (!response.ok) {
        throw new Error('Place not found or error fetching data');
      }
      const data = await response.json();
      console.log('✅ Received place details:', data);
      setPlaceData(data);
    } catch (err) {
      console.error('❌ Error fetching place details:', err);
      setError(err.message);
      setPlaceData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.viewPlaceContainer}>
      <h1 className={styles.heading}>View Place Details</h1>

      {/* Search Bar */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Enter place name"
          value={placeName}
          onChange={(e) => setPlaceName(e.target.value)}
          className={styles.searchInput}
        />
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

      {/* Display Place Details */}
      {placeData && (
        <div className={styles.placeDetails}>
          <h2 className={styles.placeName}>{placeData.name || 'N/A'}</h2>

          <div className={styles.section}>
            <h3>Description</h3>
            <p>{placeData.description || 'N/A'}</p>
          </div>

          <div className={styles.section}>
            <h3>Location</h3>
            <div className={styles.detailRow}>
              <span className={styles.label}>City:</span>
              <span className={styles.value}>{placeData.city || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>State:</span>
              <span className={styles.value}>{placeData.state || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Latitude:</span>
              <span className={styles.value}>{placeData.latitude || 'N/A'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Longitude:</span>
              <span className={styles.value}>{placeData.longitude || 'N/A'}</span>
            </div>
          </div>


          <div className={styles.section}>
            <h3>Best Time to Visit</h3>
            <p>{placeData.best_time || 'N/A'}</p>
          </div>

          <div className={styles.section}>
            <h3>What to Expect</h3>
            <p>{placeData.what_to_expect || 'N/A'}</p>
          </div>

          <div className={styles.section}>
            <h3>Tips</h3>
            <p>{placeData.tips || 'N/A'}</p>
          </div>

          <div className={styles.section}>
            <h3>Gallery</h3>
            <div className={styles.imageGallery}>
              {placeData.urls ? (() => {
                try {
                  const urlsArray = typeof placeData.urls === 'string' ? JSON.parse(placeData.urls) : placeData.urls;
                  return Array.isArray(urlsArray) ? urlsArray.map((url, index) => (
                    <img key={index} src={url} alt={`Place ${index + 1}`} className={styles.placeImage} />
                  )) : <p>No images available</p>;
                } catch (error) {
                  console.error('Error parsing URLs:', error);
                  return <p>No images available</p>;
                }
              })() : <p>No images available</p>}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
