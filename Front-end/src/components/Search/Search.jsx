import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const navigate=useNavigate();
  const [activeTab, setActiveTab] = useState("city");

  return (
    <div className="search-component">
    <div className="search-container">
      {/* Tabs for Search Options */}
      <div className="search-tabs">
        <button className={activeTab === "city" ? "active" : ""} onClick={() => setActiveTab("city")}>
          Search City
        </button>
        <button className={activeTab === "place" ? "active" : ""} onClick={() => setActiveTab("place")}>
          Search Place
        </button>
        <button className={activeTab === "train" ? "active" : ""} onClick={() => navigate("/train")}>
          Search Train
        </button>
        <button className={activeTab === "flight" ? "active" : ""} onClick={() => navigate("/flight")}>
          Search Flight
        </button>
      </div>
      {/* Search Forms */}
      <div className="search-form">
        {activeTab === "city" && (
          <div>
            <input type="text" placeholder="Enter city name" />
            <button>Search City</button>
          </div>
        )}

        {activeTab === "place" && (
          <div>
            <input type="text" placeholder="Enter place name" />
            <button>Search Place</button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Search;
