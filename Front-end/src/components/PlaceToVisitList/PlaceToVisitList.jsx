import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './PlaceToVisitList.module.css'; // Assuming regular CSS, not CSS Modules
import { useNavigate } from 'react-router-dom';

export default function PlaceToVisitList({ cityname }) {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  console.log(cityname)
  const formattedCityName = cityname.charAt(0).toUpperCase() + cityname.slice(1);


  useEffect(() => {
    if (!formattedCityName) return;

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-place-list/${formattedCityName}`);
        setPlaces(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching place list:', error);
      }
    };

    fetchPlaces();
  }, [formattedCityName]);

  return (
    <div className={style['place-list-container']}>
      <div className={style["city-cards-grid"]}>
        {places.length > 0 ? (
          places.map((place, index) => (
            <div className={style["city-card"]} key={index}>
              <img
                className={style["city-card-image"]}
                src={place.urls?.[0] || 'https://via.placeholder.com/300'}
                alt={place.name}
              />
              <div className={style["city-card-content"]}>
                <div className={style["city-card-header"]}>
                  <span className={style["city-card-number"]}>{index + 1}</span>
                  <h2 className={style["city-card-title"]}>{place.name}</h2>
                </div>
                <p className={style["city-card-desc"]}>
                  {place.description}
                </p>
              </div>
              <div className={style["city-card-footer"]}>
                <hr style={{ opacity: '0.3' }} />
                <br />
                <div className="see-more" style={{ textAlign: 'center' }}>
                  <button className="glow-on-hover" type="button" onClick={() => navigate(`/place/${place.name}`)}>
                    EXPLORE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No places found. Please try again later.</p>
        )}
      </div>
    </div>
  );
}
