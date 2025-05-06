import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import SearchCity from "./SearchCity";
import SearchPlace from "./SearchPlace";
import SearchTrain from "./SearchTrain";
import SearchFlight from "./SearchFlight";

const Search = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("city");

  const handleTabClick = (tab) => {
      setActiveTab(tab);
  };

  return (
    <div className="search-component">
      <div className="search-container">
        <div className="search-tabs">
          <button
            className={activeTab === "city" ? "active" : ""}
            onClick={() => handleTabClick("city")}
          >
            Search City
          </button>
          <button
            className={activeTab === "place" ? "active" : ""}
            onClick={() => handleTabClick("place")}
          >
            Search Place
          </button>
          <button
            className={activeTab === "train" ? "active" : ""}
            onClick={() => handleTabClick("train")}
          >
            Search Train
          </button>
          <button
            className={activeTab === "flight" ? "active" : ""}
            onClick={() => handleTabClick("flight")}
          >
            Search Flight
          </button>
        </div>

        {/* Render respective component based on selected tab */}
        <div className="search-result">
          {activeTab === "city" && <SearchCity />}
          {activeTab === "place" && <SearchPlace />}
          {activeTab === "train" && <SearchTrain />}
          {activeTab === "flight" && <SearchFlight />}
        </div>
      </div>
    </div>
  );
};

export default Search;
