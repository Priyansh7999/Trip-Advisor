//USE IN PLAN TRIP TO SHOW ALL PLAN TRIP CARD

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripPlannerContext } from '../../context';
import "./AllCards.css";
const AllCards = ({ places }) => {
  const {setTripCategory} = useContext(TripPlannerContext);
  const navigate = useNavigate();
  return (
    <div className="where-to-content">
      <div className="place-cards-grid">
        {places.map((place, index) => (
          <div className="place-card" key={index}>
            <img className="place-card-image" src={place.img} alt={place.name} />
            <div className="place-card-content">
              <h2 className="place-card-name">
                <span className="place-card-number">{index + 1}</span>{place.name}
              </h2>
              <p className="place-card-description">{place.description}</p>
            </div>
            <div className="place-card-footer">
              <hr style={{ opacity: '0.3' }} />
              <br />
              <button
                className="explore-button"
                onClick={() =>{
                  navigate(`/PlanTripCategory/${place.name}`)
                  setTripCategory({ name: place.name, image: place.img , description: place.description });
                }}

              >
                <span className="explore-button-bg"></span>
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
