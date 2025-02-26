import React, { useState, useEffect } from 'react';
import FocusCards from '../../ui/focus-cards'; // Assuming FocusCard component is imported
import "./TrendingCity.css";
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
export default function TrendingCity() {
  const [cities, setCities] = useState([]);
  const navigate=useNavigate();
  const handleSeeMoreClick = () => {
    // Navigate to the "/all-city" route when the button is clicked
    navigate("/all-city");
  };
  // Fetch cities data
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/trendingcity");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <>
      <div className="trending-city-container">
        <h2 className="trending-city-title">
          Top Cities to Visit
        </h2>
        <hr style={{ margin: "0 5% 20px" }} />
        <FocusCards cards={cities.slice(0, 6)} />
        <button className="explore-but" onClick={handleSeeMoreClick}>
          See More
        </button>
      </div>
    </>
  );
}
