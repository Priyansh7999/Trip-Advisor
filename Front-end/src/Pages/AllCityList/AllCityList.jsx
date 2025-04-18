// for all cities and places list

import React from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../components/hooks/useFetch"; // Import the custom hook
import styles from "./AllCityList.module.css";
import bg1 from "../../assets/bg2.jpg";
import AllCity from "../../components/CityList/AllCity";
import { useEffect, useState } from "react";
export default function AllCityList({ trending }) {
  const navigate = useNavigate();

  // Use the useFetch hook to fetch the cities based on the trending category
  const { data: cities, loading, error } = useFetch(`http://localhost:7000/api/${trending}`, [trending]);

  // Scroll to the top of the page when the component is mounted
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles["all-city-list-container"]} id="all-city-list-container">
      <div className={styles["all-city-list-header"]} id="all-city-list-header">
        <img className={styles["all-city-list-bg"]} id="all-city-list-bg" src={bg1} alt="" />
        <h1 className={styles["all-city-title"]} id="all-city-title">
          Explore All Trending {trending === "trendingcity" ? "Cities" : "Places"}
        </h1>
      </div>
      
      <AllCity cities={cities} trending={trending} navigate={navigate} />
    </div>
  );
}
