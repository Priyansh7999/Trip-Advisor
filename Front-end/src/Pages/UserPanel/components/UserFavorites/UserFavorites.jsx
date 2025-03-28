import React, { useState, useEffect } from "react";
import styles from "./UserFavorites.module.css";

export default function UserFavorites() {
  // Mock User Data (Replace with actual user authentication)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
  };

  // State to store favorite places
  const [favorites, setFavorites] = useState([]);

  // Function to fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      // Simulating a backend API call (Replace with real API)
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { id: 1, name: "Eiffel Tower", location: "Paris, France" },
              { id: 2, name: "Grand Canyon", location: "Arizona, USA" },
              { id: 3, name: "Taj Mahal", location: "Agra, India" },
            ]),
          1000
        )
      );

      setFavorites(response);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Function to remove a favorite place
  const removeFavorite = async (placeId) => {
    try {
      // Simulating API call (Replace with actual API request)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Remove from local state
      setFavorites(favorites.filter((place) => place.id !== placeId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Fetch favorites when component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className={styles.favoritesContainer}>
      <h1>My Favorite Places</h1>
      <p>Here are the places you've marked as favorites.</p>

      {/* Display Favorites */}
      {favorites.length === 0 ? (
        <p className={styles.noFavorites}>No favorites added yet.</p>
      ) : (
        <ul className={styles.favoritesList}>
          {favorites.map((place) => (
            <li key={place.id} className={styles.favoriteItem}>
              <div>
                <h3>{place.name}</h3>
                <p className={styles.location}>📍 {place.location}</p>
              </div>
              <button className={styles.removeButton} onClick={() => removeFavorite(place.id)}>
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
