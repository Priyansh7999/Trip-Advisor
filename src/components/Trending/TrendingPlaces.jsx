import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import FocusCards from '../../ui/focus-cards'; // Assuming FocusCard component is imported
import "./TrendingCity.css";

export default function TrendingPlaces() {
  const [places, setPlaces] = useState([]);
  const navigate=useNavigate();
  const handleSeeMoreClick = () => {
    // Navigate to the "/all-city" route when the button is clicked
    navigate("/all-city");
  };
  // Fetch cities data
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/trendingplace");
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error("Failed to fetch places", error);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className="trending-places-container">
      <h2 className="trending-city-title">
        Top Places to Visit
      </h2>
      <hr style={{ margin: "0 100px 20px" }} />
      <div className="city-cards-container">
        <FocusCards cards={places.slice(0, 6)} />
      </div>
      <button className="explore-but" onClick={handleSeeMoreClick}>
          See More
        </button>
    </div>
  );
}
