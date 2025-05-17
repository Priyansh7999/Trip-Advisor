import React, { useEffect, useState } from 'react';
import styles from '../SelectedCity/SelectedCity.module.css';
import style from './SelectedCity.module.css'
import { useParams } from 'react-router-dom';
import ViewReviews from '../../components/Reviews/ViewReviews';
import GiveReviews from '../../components/Reviews/GiveReviews';
import GiveRating from '../../components/Rating/GiveRating';
import ViewRating from '../../components/Rating/ViewRaing';
export default function SelectedPlace() {
  const { placeName } = useParams();
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/get-place/${encodeURIComponent(placeName)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setPlaceData(data);
      } catch (error) {
        console.error('Error fetching place data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [placeName]);

  if (loading) return <div>Loading...</div>;
  if (!placeData) return <div>Error loading place data.</div>;

  const {
    name,
    city,
    state,
    suggestedduration,
    description,
    whattoexpect,
    moreabout,
    urls = [],
    overview = {}
  } = placeData;

  return (
    <div className={styles["selected-city-container"]}>
      <div className={styles["selected-city-header"]}>
        <div className={styles["selected-city-image"]}>
          {urls.map((url, index) => (
            <img key={index} src={url} alt={`${name} ${index + 1}`} className={styles["place-image"]} />
          ))}
        </div>
        <div className={styles["selected-city-name"]}>
          <h1>{name}, {city}</h1>
        </div>
        <div className={styles["selected-city-rating"]}>
        </div>
      </div>

      <div className={styles["selected-place-description"]}>
        {description && (
          <>
            <h2 className={style["section-title"]}>Overview</h2>
            <p>{description}</p>
          </>
        )}

        {suggestedduration && (
          <>
            <hr />
            <p><strong>Suggested Duration:</strong> {suggestedduration}</p>
          </>
        )}

        {whattoexpect && (
          <>
            <hr />
            <h2 className={style["section-title"]}>What to Expect?</h2>
            <p>{whattoexpect}</p>
          </>
        )}

        {moreabout && (
          <>
            <h2 className={style["section-title"]}>More About {name}</h2>
            <p>{moreabout}</p>
          </>
        )}

        {overview && (
          <div className={style.box}>
            <h2 className={style["section-title"]}>Additional Info</h2>
            <p><strong>History:</strong> {overview.history}</p>
            <p><strong>Highlights:</strong> {overview.highlights}</p>
            <p><strong>Timings:</strong> {overview.timings}</p>
            <p><strong>Entry Fee:</strong> {overview.entryFee}</p>
            <p><strong>Restricted Items:</strong> {overview.restrictedItems}</p>
          </div>
        )}
      </div>
      <div className={styles["selected-place-review"]}>
        <ViewReviews type={'Place'} name={placeName} />
        <GiveReviews type={'Place'} name={placeName} />
      </div>
    </div>
  );
}
