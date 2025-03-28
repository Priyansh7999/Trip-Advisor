import React, { useState } from 'react';
import styles from './AddHotel.module.css';

export default function AddHotel() {
  // State for basic hotel details
  const [cityName, setCityName] = useState('');
  const [hotelState, setHotelState] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [aboutHotel, setAboutHotel] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [star, setStar] = useState('');

  // State for dynamic fields
  const [basicFacilities, setBasicFacilities] = useState(['']);
  const [foodAndDrinks, setFoodAndDrinks] = useState(['']);
  const [safetyAndSecurity, setSafetyAndSecurity] = useState(['']);
  const [healthAndWellness, setHealthAndWellness] = useState(['']);
  const [commonArea, setCommonArea] = useState(['']);
  
  const [popularWithGuests, setPopularWithGuests] = useState(['']);
  const [roomFeatures, setRoomFeatures] = useState(['']);
  const [bathroom, setBathroom] = useState(['']);

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [otherRules, setOtherRules] = useState(['']);
  const [urls, setUrls] = useState(['']);
  const [review, setReview] = useState(['']);

  // Function to handle dynamic fields
  const addField = (setState) => {
    setState(prevState => [...prevState, '']);
  };

  const handleChange = (index, state, setState, value) => {
    const updatedFields = [...state]; // ✅ Copy the current state array
    updatedFields[index] = value;     // ✅ Update the specific field
    setState(updatedFields);          // ✅ Set the updated array
  };
  

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = {
        cityName,
        hotelState,
        hotelName,
        aboutHotel,
        hotelAddress,
        star,
        amenities: {
            basicFacilities,
            foodAndDrinks,
            safetyAndSecurity,
            healthAndWellness,
            commonArea,
        },
        roomAmenities: {
            popularWithGuests,
            roomFeatures,
            bathroom,
        },
        propertyRules: {
            checkIn,
            checkOut,
            otherRules,
        },
        urlsList: urls,
        reviews: review
    };

    try {
        const response = await fetch('http://localhost:7000/submit-hotels-details', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hotelData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit hotel details');
        }

        const result = await response.json();
        console.log('✅ Hotel details submitted successfully:', result);
        alert('Hotel details added successfully!');
    } catch (error) {
        console.error('❌ Error submitting hotel details:', error);
        alert('Error submitting hotel details. Please try again.');
    }
};


  return (
    <div className={styles.addHotelContainer}>
      <h1>Add Hotel</h1>
      <h2>Basic Hotel Details</h2>
      <form onSubmit={handleSubmit}>
        {/* City Name */}
        <div className={styles.formGroup}>
          <label>City Name</label>
          <input style={{ width: '20%' }} type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
        </div>

        {/* Hotel State */}
        <div className={styles.formGroup}>
          <label>Hotel State</label>
          <input style={{ width: '20%' }} type="text" value={hotelState} onChange={(e) => setHotelState(e.target.value)} required />
        </div>

        {/* Hotel Name */}
        <div className={styles.formGroup}>
          <label>Hotel Name</label>
          <input style={{ width: '20%' }} type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} required />
        </div>

        {/* About the Hotel */}
        <div className={styles.formGroup}>
          <label>About the Hotel</label>
          <textarea style={{ width: '65%' }} value={aboutHotel} onChange={(e) => setAboutHotel(e.target.value)} required />
        </div>

        {/* Hotel Address */}
        <div className={styles.formGroup}>
          <label>Hotel Address</label>
          <input style={{ width: '65%' }} type="text" value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} required />
        </div>

        {/* Star Rating slect the option */}
        <div className={styles.formGroup}>
          <label>Star Rating</label>
          <select style={{ width: '20%' }} value={star} onChange={(e) => setStar(e.target.value)} required>
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
          </select>
        </div>
        <h2> Hotels Amenities</h2>
        {/* Dynamic Sections */}
        {[
          { label: 'Basic Facilities', state: basicFacilities, setState: setBasicFacilities },
          { label: 'Food and Drinks', state: foodAndDrinks, setState: setFoodAndDrinks },
          { label: 'Safety and Security', state: safetyAndSecurity, setState: setSafetyAndSecurity },
          { label: 'Health and Wellness', state: healthAndWellness, setState: setHealthAndWellness },
          { label: 'Common Area', state: commonArea, setState: setCommonArea },
        ].map((section, index) => (
          <div key={index} className={styles.formGroup}>
            <label>{section.label}</label>
            {section.state.map((item, i) => (
              <input style={{ width: '20%' }} key={i} type="text" value={item} onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)}
              required />
            ))}
            <button type="button" className={styles.addButton} onClick={() => addField(section.setState)}>Add+</button>
          </div>
        ))}

        <h2>Room Amenities</h2>
        {/* Room Amenities */}
        {[
          { label: 'Popular with Guests', state: popularWithGuests, setState: setPopularWithGuests },
          { label: 'Room Features', state: roomFeatures, setState: setRoomFeatures },
          { label: 'Bathroom', state: bathroom, setState: setBathroom },
        ].map((section, index) => (
          <div key={index} className={styles.formGroup}>
            <label>{section.label}</label>
            {section.state.map((item, i) => (
              <input style={{ width: '20%' }} key={i} type="text" value={item} onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)}
              required />
            ))}
            <button type="button" className={styles.addButton} onClick={() => addField(section.setState)}>Add+</button>
          </div>
        ))}

        <h2>Property Rules and other</h2>
        {/* Property Rules */}
        <div className={styles.formGroup}>
          <label>Check-in</label>
          <input style={{ width: '20%' }} type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Check-out</label>
          <input style={{ width: '20%' }} type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
        </div>

        <div className={styles.formGroup}>
          <label>Other Rules</label>
          {otherRules.map((rule, i) => (
            <input key={i} style={{ width: '20%' }} type="text" value={rule} onChange={(e) => handleChange(i, otherRules, setOtherRules, e.target.value)} required />
          ))}
          <button type="button" className={styles.addButton} onClick={() => addField(setOtherRules)}>Add+</button>
        </div>

        {/* list of urls with add button */}
        <div className={styles.formGroup} style={{ flexWrap: 'wrap' }}>
          <label>Urls</label>
          {urls.map((url, i) => (
            <input key={i} style={{ width: '65%' }} type="text" value={url} onChange={(e) => handleChange(i, urls, setUrls, e.target.value)} required />
          ))}
          <button type="button" className={styles.addButton} onClick={() => addField(setUrls)}>Add+</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>Submit</button>

      </form>
    </div>
  );
}
