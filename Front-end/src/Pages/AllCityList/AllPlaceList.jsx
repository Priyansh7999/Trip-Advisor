import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AllCityList.module.css";
import bg1 from "../../assets/bg2.jpg";
import AllCity from "../../components/CityList/AllCity";

export default function AllPlaceList({ trending }) {
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");
  const [sortedCities, setSortedCities] = useState([]);

  // Scroll to top when mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch cities/places from server
  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/get-place-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [trending]);

  // Sort cities based on selected option
  useEffect(() => {
    if (!cities) return;

    let sorted = [...cities];

    if (sortOption === "high-rating") {
      sorted.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    } else if (sortOption === "low-rating") {
      sorted.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0));
    }
    
    setSortedCities(sorted);
  }, [cities, sortOption]);

  return (
    <div className={styles["all-city-list-container"]} id="all-city-list-container">
      <div className={styles["all-city-list-header"]} id="all-city-list-header">
        <img className={styles["all-city-list-bg"]} id="all-city-list-bg" src={bg1} alt="" />
        <h1 className={styles["all-city-title"]} id="all-city-title">
          Explore All Trending {trending === "trendingcity" ? "Cities" : "Places"}
        </h1>
      </div>

      {/* SORT DROPDOWN MENU */}
      <div className={styles.sortMenu}>
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">All</option>
          <option value="high-rating">Highest Rating</option>
          <option value="low-rating">Lowest Rating</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AllCity cities={sortedCities} trending={trending} navigate={navigate} />
      )}
    </div>
  );
}
