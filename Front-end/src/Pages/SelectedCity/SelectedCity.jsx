import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SelectedCity.module.css';
import Weather from '../../components/Weather/Weather';
import CityMap from '../../components/CityMap/CityMap';
import HotelList from '../../components/HotelsList/HotelList';
import PlaceToVisitList from '../../components/PlaceToVisitList/PlaceToVisitList';
import ViewReviews from '../../components/Reviews/ViewReviews';
import GiveReviews from '../../components/Reviews/GiveReviews';
// import { TripPlannerContext } from '../../context';
const SelectedCity = () => {
  const { cityName } = useParams();
  const [cityData, setCityData] = useState(null);
  

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCityData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/get-city/${cityName}`);
        const data = await res.json();
        setCityData(data);
      } catch (err) {
        console.error('Failed to fetch city data', err);
      }
    };
    fetchCityData();
  }, [cityName]);

  if (!cityData) return <div>Loading...</div>;

  const {
    cityname,
    description,
    besttime,
    peakseason,
    moderateseason,
    offseason,
    overview,
    howtoreach,
    foodtotry,
    thingstobuy,
    conclusion,
    latitude,
    longitude
  } = cityData;

  return (
    <div className={styles["selected-city-container"]}>
      <div className={styles["selected-city-header"]}>
        <div className={styles["selected-city-image"]}>
          <img src={cityData.urls[0].urls} alt={cityname} />
        </div>
        <div className={styles["selected-city-name"]}>
          <h1>{cityname}</h1> 
        </div>
        <div className={styles["selected-city-rating"]}>
        {/* <ViewRating type={'City'} name={cityname} /> */}
        </div>
        <div className={styles["selected-city-desc"]}>
          <p>{description}</p>
        </div>
        <div>
        </div>
      </div>

      <div className={styles["selected-city-best-time-to-visit"]}>
        <h1>Best Time to Visit {cityname}</h1>
        <p>{besttime}</p>
        <div className={styles["selected-city-best-time-to-visit-Season"]}>
          <div className={styles["selected-city-best-time-to-visit-Season"]}>
            <div className={styles["box1"]}>
              <h2>Peak Season</h2>
              <p>{peakseason?.start} - {peakseason?.end}</p>
              <p>{peakseason?.description}</p>
            </div>
            <div className={styles.box2}>
              <h2>Moderate Season</h2>
              <p>{moderateseason?.start} - {moderateseason?.end}</p>
              <p>{moderateseason?.description}</p>
            </div>
            <div className={styles.box3}>
              <h2>Off-season</h2>
              <p>{offseason?.start} - {offseason?.end}</p>
              <p>{offseason?.description}</p>
            </div>
          </div>
          <div className={styles.Weather}>
            <Weather city={cityname} />
          </div>
        </div>
      </div>
      <div className={styles["selected-city-overview"]}>
        <h1>Hotels To Visit</h1>
        <HotelList cityname={cityName} />
      </div>

      <div className={styles["selected-city-overview"]}>
        <h1>Place To Visit</h1>
        <PlaceToVisitList cityname={cityName} />
      </div>

      <div className={styles["selected-city-overview"]}>
        <h1>{cityname} Overview</h1>
        <div className={styles["selected-city-name-title-history-card"]}>
          <h2>{overview?.cityTitle}</h2>
          <p>{overview?.cityHistory}</p>
          <div className={styles["selected-city-card"]}>
            <table>
              <tbody>
                <tr><th>State</th><td>{overview?.state}</td></tr>
                <tr><th>Tourist Places</th><td>{overview?.touristPlaces}</td></tr>
                <tr><th>Famous For</th><td>{overview?.famousFor}</td></tr>
                <tr><th>Weather</th><td>{overview?.weather}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={styles["selected-city-how-to-reach"]}>
        <div className={styles["selected-city-transport-map"]}>
          <div className={styles.transport}>
            <h1>How to Reach {cityname}</h1>
            <div className={styles['by-air']}>
              <h2>By Air</h2>
              <p>{howtoreach?.byAir}</p>
            </div>
            <div className={styles['by-train']}>
              <h2>By Rail</h2>
              <p>{howtoreach?.byRail}</p>
            </div>
            <div className={styles['by-road']}>
              <h2>By Road</h2>
              <p>{howtoreach?.byRoad}</p>
            </div>
          </div>
          <div className={styles.map}>
          <CityMap url={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&center=${latitude},${longitude}&zoom=12`} />
          </div>
        </div>
      </div>

      <div className={styles["selected-city-food-to-try"]}>
        <h2>Food to Try in {cityname}</h2>
        {foodtotry?.map((food, index) => (
          <div key={index}>
            <h4>{food.name}</h4>
            <p>{food.description}</p>
          </div>
        ))}
      </div>

      <div className={styles["selected-city-things-to-buy"]}>
        <h2>Things to Buy in {cityname}</h2>
        {thingstobuy?.map((item, index) => (
          <div key={index}>
            <h4>{item.heading}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      <div className={styles["selected-city-Conclusion"]}>
        <h2>Conclusion</h2>
        <p>{conclusion}</p>
      </div>

      {/* Reviews */}
      <div className={styles["selected-city-reviews"]}>
        <h2>Reviews</h2>
        <ViewReviews type={'City'} name={cityname} />
        <GiveReviews type={'City'} name={cityname} />
      </div>
    </div>
  );
};

export default SelectedCity;
