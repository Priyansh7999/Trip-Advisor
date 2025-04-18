import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './SelectedHotel.module.css';
import GiveReviews from '../../components/Reviews/GiveReviews';
import ViewReviews from '../../components/Reviews/ViewReviews';

export default function SelectedHotel() {
  const { name } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/get-hotel/${name}`);
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    if (name) fetchHotelData();
  }, [name]);

  if (!hotel) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.SelectedHotel}>
    <div className={styles.container}>
      <h1 className={styles.title}>
        {hotel.hotelname}, {hotel.cityname}, {hotel.hotelstate}
      </h1>

      <div className={styles.gallery}>
        {hotel.urlslist?.map((url, index) => (
          <img key={index} src={url} alt={`Hotel ${index}`} className={styles.galleryImage} />
        ))}
      </div>

      <section className={styles.section}>
        <h2>About the Hotel</h2>
        <p className={styles.description}>{hotel.abouthotel}</p>
        <h2>Address</h2>
        <p>{hotel.hoteladdress}</p>
      </section>
        <h2>Amenities</h2>
      <section className={styles.amenities}>
        <div className={styles.amenityCategory}>
          <h3>Basic Facilities</h3>
          <ul>{hotel.amenities?.basicFacilities?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Food & Drinks</h3>
          <ul>{hotel.amenities?.foodAndDrinks?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Health & Wellness</h3>
          <ul>{hotel.amenities?.healthAndWellness?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Safety & Security</h3>
          <ul>{hotel.amenities?.safetyAndSecurity?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Common Areas</h3>
          <ul>{hotel.amenities?.commonArea?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Room Features</h3>
          <ul>{hotel.roomamenities?.roomFeatures?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>

        <div className={styles.amenityCategory}>
          <h3>Bathroom Amenities</h3>
          <ul>{hotel.roomamenities?.bathroom?.map((item, i) => <li key={i}>{item}</li>)}</ul>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Property Rules</h2>
        <p><strong>Check-In:</strong> {hotel.propertyrules?.checkIn}</p>
        <p><strong>Check-Out:</strong> {hotel.propertyrules?.checkOut}</p>
        <ul>{hotel.propertyrules?.otherRules?.map((rule, i) => <li key={i}>{rule}</li>)}</ul>
      </section>
    </div>
    <div className={styles.reviews}>
      <ViewReviews type={'hotel'} name={name} />
      <GiveReviews type={'hotel'} name={name} username={'priyansh'} />
    </div>
    </div>
  );
}
