import React, { useEffect, useState } from 'react';
import styles from './ViewHotel.module.css';

export default function ViewHotel() {
  const [cityName, setCityName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotelDetails = async () => {
    if (!cityName.trim() || !hotelName.trim()) {
      setError("Please enter both City Name and Hotel Name.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setHotelData(null);  // Reset previous data before fetching new data
  
    try {
      const response = await fetch(
        `http://localhost:7000/get-hotel-details?hotelName=${encodeURIComponent(hotelName)}&cityName=${encodeURIComponent(cityName)}`
      );
  
      if (!response.ok) {
        throw new Error('Hotel not found.');
      }
  
      const data = await response.json();
      console.log('Received hotel details:', data);
      setHotelData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className={styles.viewHotelContainer}>
      <h1>Search Hotel Details</h1>
      
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          placeholder="Enter City Name" 
          value={cityName} 
          onChange={(e) => setCityName(e.target.value)}
          className={styles.inputField}
        />
        <input 
          type="text" 
          placeholder="Enter Hotel Name" 
          value={hotelName} 
          onChange={(e) => setHotelName(e.target.value)}
          className={styles.inputField}
        />
        <button onClick={fetchHotelDetails} className={styles.searchButton}>
          Search
        </button>
      </div>

      {loading && <p>Loading hotel details...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && hotelData && (
       <div className={styles.viewHotelContainer}>
       <h2 className={styles.hotelName}>{hotelData.hotel_name}</h2>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Hotel Details</h3>
         <div className={styles.detailRow}>
           <p className={styles.label}>City:</p>
           <p className={styles.value}>{hotelData.city_name}</p>
         </div>
         <div className={styles.detailRow}>
           <p className={styles.label}>State:</p>
           <p className={styles.value}>{hotelData.hotel_state}</p>
         </div>
         <div className={styles.detailRow}>
           <p className={styles.label}>About:</p>
           <p className={styles.value}>{hotelData.about_hotel}</p>
         </div>
         <div className={styles.detailRow}>
           <p className={styles.label}>Address:</p>
           <p className={styles.value}>{hotelData.hotel_address}</p>
         </div>
         <div className={styles.detailRow}>
           <p className={styles.label}>Star Rating:</p>
           <p className={styles.value}>{hotelData.star} ⭐</p>
         </div>
       </div>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Amenities</h3>
         <ul className={styles.amenitiesList}>
           {hotelData.amenities?.basicFacilities?.length > 0 
             ? hotelData.amenities.basicFacilities.map((item, index) => <li key={index}>{item}</li>) 
             : <li>No amenities listed.</li>
           }
         </ul>
       </div>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Room Amenities</h3>
         <ul className={styles.amenitiesList}>
           {hotelData.room_amenities?.roomFeatures?.length > 0
             ? hotelData.room_amenities.roomFeatures.map((item, index) => <li key={index}>{item}</li>) 
             : <li>No room amenities listed.</li>
           }
         </ul>
       </div>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Property Rules</h3>
         <div className={styles.detailRow}>
           <p className={styles.label}>Check-in:</p>
           <p className={styles.value}>{hotelData.property_rules?.checkIn || 'N/A'}</p>
         </div>
         <div className={styles.detailRow}>
           <p className={styles.label}>Check-out:</p>
           <p className={styles.value}>{hotelData.property_rules?.checkOut || 'N/A'}</p>
         </div>
       </div>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Gallery</h3>
         <div className={styles.imageGallery}>
           {hotelData.urls_list?.length > 0 
             ? hotelData.urls_list.map((url, index) => (
                 <img key={index} src={url} alt={`Hotel ${index + 1}`} className={styles.hotelImage} />
               )) 
             : <p>No images available</p>
           }
         </div>
       </div>
     
       <div className={styles.section}>
         <h3 className={styles.sectionTitle}>Reviews</h3>
         <ul className={styles.reviewsList}>
           {hotelData.reviews?.length > 0
             ? hotelData.reviews.map((review, index) => <li key={index}>{review}</li>) 
             : <li>No reviews yet.</li>
           }
         </ul>
       </div>
     </div>
     
      )}
    </div>
  );
}
