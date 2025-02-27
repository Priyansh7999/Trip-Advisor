import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesSearch = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const LOCATION = "40.7128,-74.0060"; // Latitude and Longitude for New York
  const RADIUS = 5000; // Search radius (in meters)

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        // Make request to your backend (proxy server)
        const response = await axios.get('http://localhost:7000/api/places', {
          params: {
            location: LOCATION,
            radius: RADIUS,
            type: 'restaurant',  // You can change this type
          }
        });

        setPlaces(response.data.results);  // Update state with results
      } catch (err) {
        setError('Failed to fetch places');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
      <h1>Restaurants in New York</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {places.length > 0 ? (
          places.map(place => (
            <li key={place.place_id}>
              <h3>{place.name}</h3>
              <p>{place.vicinity}</p>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
};

export default PlacesSearch;
