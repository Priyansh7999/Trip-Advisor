// ALL CITY AND PLACES LIST
import React from "react";
import style from "./AllCity.module.css";
import AllCitySkeleton from "./AllCitySkeleton";
export default function AllCity({ cities, trending, navigate }) {
  if(!cities){
    return <AllCitySkeleton />
  }
  return (
    <div className="city-cards-grid">
      {cities.length > 0 ? (
        cities.map((city, index) => (
          <div className={style["city-card"]} key={index}>
            <img className={style["city-card-image"]} id="city-card-image" src={city.src} alt={city.title} />
            <div className={style["city-card-content"]} id="city-card-content">
              <div className={style["city-card-header"]} id="city-card-header">
                <span className={style["city-card-number"]} id="city-card-number">{index + 1}</span>
                <h2 className={style["city-card-title"]} id="city-card-title">{city.title}</h2>
              </div>
              <p className={style["city-card-desc"]} id="city-card-desc">{city.description}</p>
            </div>
            <div className={style["city-card-footer"]} id="city-card-footer">
              <hr style={{ opacity: "0.3" }} />
              <br />
              <button
                className={style["explore-button"]} id="explore-button"
                onClick={() => {
                  (trending === "trendingcity")?
                    navigate(`/city/${city.title}`) : navigate(`/place/${city.title}`)
                }}
              >
                <span className={style["explore-button-bg"]} id="explore-button-bg"></span>
                <span className="explore-button-text">Explore</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No cities found. Please try again later.</p>
      )}
    </div>
  );
}
