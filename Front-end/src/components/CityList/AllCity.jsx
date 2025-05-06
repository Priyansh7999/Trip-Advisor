// ALL CITY AND PLACES LIST
import React from "react";
import style from "./AllCity.module.css";
import AllCitySkeleton from "./AllCitySkeleton";
import { useNavigate } from "react-router-dom";
export default function AllCity({ cities, trending }) {
  const navigate = useNavigate();
  if (!cities) {
    return <AllCitySkeleton />
  }
  console.log(cities)
  return (
    <div className="city-cards-grid">
      {cities.length > 0 ? (
        cities.map((city, index) => (
          <div className={style["city-card"]} key={index}>
            {console.log(city.rating, city.name)}
            <img className={style["city-card-image"]} id="city-card-image" src={city.urls[0].urls || city.urls[0]} alt={city.title} />
            <div className={style["city-card-content"]} id="city-card-content">
              <div className={style["city-card-header"]} id="city-card-header">
                <span className={style["city-card-number"]} id="city-card-number">{index + 1}</span>
                <h2 className={style["city-card-title"]} id="city-card-title">{city.cityname || city.name}</h2>
              </div>
              <p className={style["city-card-desc"]} id="city-card-desc">{city.description}</p>
            </div>
            <div className={style["city-card-footer"]} id="city-card-footer">
              <hr style={{ opacity: "0.3" }} />
              <br />
              <div className="see-more" style={{ textAlign: 'center', width: '100%' }}>
                <button class="glow-on-hover" type="button" style={{ width: "80%" }} onClick={() =>navigate(`/city/${city.cityname || city.name}`)}
                >EXPLORE</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No cities found. Please try again later.</p>
      )}
    </div>
  );
}
