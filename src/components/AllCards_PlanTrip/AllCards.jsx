//USE IN PLAN TRIP TO SHOW ALL TRIP CATEGORY CARD

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripPlannerContext } from '../../context';
import styles from "./AllCards.module.css";
const AllCards = ({ places }) => {
  const {setTripCategory} = useContext(TripPlannerContext);
  const navigate = useNavigate();
  return (
    <div className={styles["where-to-content"]} id="where-to-content">
      <div className={styles["place-cards-grid"]} id="place-cards-grid">
        {places.map((place, index) => (
          <div className={styles["place-card"]} id="place-card" key={index}>
            <img className={styles["place-card-image"]} id="place-card-image" src={place.img} alt={place.name} />
            <div className={styles["place-card-content"]} id="place-card-content">
              <h2 className={styles["place-card-name"]} id="place-card-name">
                <span className={styles["place-card-number"]} id="place-card-number">{index + 1}</span>{place.name}
              </h2>
              <p className={styles["place-card-description"]} id="place-card-description">{place.description}</p>
            </div>
            <div className={styles["place-card-footer"]} id="place-card-footer">
              <hr style={{ opacity: '0.3' }} />
              <br />
              <button
                className={styles["explore-button"]} id="explore-button"
                onClick={() =>{
                  navigate(`/PlanTripCategory/${place.name}`)
                  setTripCategory({ name: place.name, image: place.img , description: place.description });
                }}

              >
                <span className={styles["explore-button-bg"]} id="explore-button-bg"></span>
                <span className="explore-button-text">Explore</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCards;
