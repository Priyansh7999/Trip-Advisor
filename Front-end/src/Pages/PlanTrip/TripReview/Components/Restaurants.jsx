import React, { useEffect, useState } from 'react';
import styles from './CSS/Restaurants.module.css'; // Importing CSS module

export default function Restaurants({ latitude, longitude }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState([]); // State to store image sources

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          `https://maps-data.p.rapidapi.com/nearby.php?query=Restaurants&lat=${latitude}&lng=${longitude}&limit=50&country=us&lang=en&offset=0&zoom=21`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': '732f7b9f89mshaaa0c84a58e8176p1ff2abjsn15cd24fe7292',
              'x-rapidapi-host': 'maps-data.p.rapidapi.com',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        if (Array.isArray(data.data)) {
          setRestaurants(data.data);

          // Collect image sources
          const images = data.data.map(restaurant =>
            restaurant?.photos && restaurant?.photos.length > 0 ? restaurant?.photos[1]?.src : ''
          );
          setImageSrc(images);
        } else {
          throw new Error('Unexpected data format');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [latitude, longitude]); // Adding latitude and longitude as dependencies to trigger refetch when they change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Restaurants Near You</h2>
      {restaurants.length > 0 ? (
        <ul className={styles.restaurantList}>
          {restaurants.map((restaurant, index) => (
            <li key={index} className={styles.restaurantItem}>
              <div className={styles.restaurantCard}>
                <div className={styles.restaurantImage}>
                  {/* Use the ImageSrc array to render images */}
                  {imageSrc[index] && (
                    <img
                      src={imageSrc[index]}
                      alt={restaurant?.name || 'Restaurant Image'}
                    />
                  )}
                </div>
                <div className={styles.restaurantDetails}>
                  <h3 className={styles.restaurantName}>{restaurant.name}</h3>
                  <p className={styles.restaurantAddress}>
                    <strong>Address:</strong> {restaurant.full_address}
                  </p>
                  <p className={styles.restaurantPhone}>
                    <strong>Phone:</strong> {restaurant.phone_number || 'N/A'}
                  </p>
                  <p className={styles.restaurantRating}>
                    <strong>Rating:</strong> {restaurant.rating} ({restaurant.review_count} reviews)
                  </p>
                  {restaurant.working_hours && Object.keys(restaurant.working_hours).length > 0 && (
                    <>
                      <p className={styles.restaurantHours}>
                        <strong>Opening Hours:</strong> {restaurant.state}
                      </p>
                    </>
                  )}
                  <button
                    className="glow-on-hover"
                    onClick={() => window.open(restaurant.place_link, '_blank')}
                  >
                    View More
                  </button>
                </div>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No restaurants found</p>
      )}
    </div>
  );
}
