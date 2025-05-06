import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './HotelList.module.css';
import { useNavigate } from 'react-router-dom';

export default function HotelList({ cityname }) {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();
  const formattedCityName = cityname.charAt(0).toUpperCase() + cityname.slice(1);

  useEffect(() => {
    if (!formattedCityName) return;

    const fetchHotels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-hotel-list/${formattedCityName}`);
        setHotels(response.data); // assuming array of hotel objects
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, [formattedCityName]);

  return (
    <div className={style['city-cards-grid']}>
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <div className={style["city-card"]} key={index}>
            <img
              className={style["city-card-image"]}
              src={hotel.urlslist?.[0]}
              alt={hotel.hotelname}
            />
            <div className={style["city-card-content"]}>
              <div className={style["city-card-header"]}>
                <span className={style["city-card-number"]}>{index + 1}</span>
                <h2 className={style["city-card-title"]}>{hotel.hotelname}</h2>
              </div>
              <p className={style["city-card-desc"]}>
                {hotel.abouthotel}
              </p>
            </div>
            <div className={style["city-card-footer"]}>
              <hr style={{ opacity: '0.3' }} />
              <br />
              <div className="see-more" style={{textAlign:'center'}}>
              <button class="glow-on-hover" type="button" onClick={() => navigate(`/hotel/${hotel.hotelname}`)}>EXPLORE </button>
        </div>
            </div>
          </div>
        ))
      ) : (
        <p>No hotels found. Please try again later.</p>
      )}
    </div>
  );
}
