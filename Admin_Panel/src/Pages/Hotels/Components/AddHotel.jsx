import React, { useState } from 'react'
import styles from './AddHotel.module.css'

export default function AddHotel() {
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

  // Add a new field to the dynamic array
  const addField = (setState) => {
    setState(prevState => [...prevState, '']);
  };

  // Handle change for each field
  const handleChange = (index, state, setState, value) => {
    const updatedFields = [...state];
    updatedFields[index] = value;
    setState(updatedFields);
  };

  // Handle delete for each field
  const handleDelete = (index, setState) => {
    setState(prevState => prevState.filter((_, i) => i !== index));
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
      reviews: review,
    };
    console.log(hotelData);
  
    try {
      const res = await fetch('http://localhost:5000/add-hotel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelData),
      });
  
      const data = await res.json();
      console.log('Hotel saved:', data);
      alert(data.error || data.message);
      if(data.message){
        setCityName('');
        setHotelState('');
        setHotelName('');
        setAboutHotel('');
        setHotelAddress('');
        setStar(0);
        setBasicFacilities(['']);
        setFoodAndDrinks(['']);
        setSafetyAndSecurity(['']);
        setHealthAndWellness(['']);
        setCommonArea(['']);
        setPopularWithGuests(['']);
        setRoomFeatures(['']);
        setBathroom(['']);
        setCheckIn(['']);
        setCheckOut(['']);
        setOtherRules(['']);
      }
    } catch (err) {
      console.error('Error submitting hotel data:', err);
    }
  };
  

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Basic Details */}
      <h1>Basic Hotel Details</h1>
      {/* Hotel Name */}
      <div className={styles.formdata}>
        <label htmlFor="">Hotel Name</label>
        <input type="text" id="hotelName" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
      </div>

      {/* City Name & State */}
      <div className={styles.formdata}>
        <label>City Name</label>
        <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} required />
        <label>Hotel State</label>
        <input type="text" value={hotelState} onChange={(e) => setHotelState(e.target.value)} required />
      </div>
      {/* About the Hotel */}
      <div className={styles.formdata}>
        <label>About the Hotel</label>
        <textarea placeholder='About the hotel....' value={aboutHotel} onChange={(e) => setAboutHotel(e.target.value)} required />
      </div>

      {/* Hotel Address */}
      <div className={styles.formdata}>
        <label>Hotel Address</label>
        <input type="text" value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} required />
      </div>

      {/* Star Rating */}
      <div className={styles.formdata}>
        <label>Star Rating</label>
        <select value={star} onChange={(e) => setStar(e.target.value)} required>
          <option value="1">1 Star</option>
          <option value="2">2 Star</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
        </select>
      </div>

      <h1>Hotels Amenities</h1>
      {/* Dynamic Sections */}
      {[
        { label: 'Basic Facilities', state: basicFacilities, setState: setBasicFacilities },
        { label: 'Food and Drinks', state: foodAndDrinks, setState: setFoodAndDrinks },
        { label: 'Safety and Security', state: safetyAndSecurity, setState: setSafetyAndSecurity },
        { label: 'Health and Wellness', state: healthAndWellness, setState: setHealthAndWellness },
        { label: 'Common Area', state: commonArea, setState: setCommonArea },
      ].map((section, index) => (
        <div key={index} className={styles.formdataAdd}>
          <label>{section.label}</label>
          <div className={styles.multiInput}>
            {section.state.map((item, i) => (
              <div key={i} className={styles.inputContainer}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)}
                  required
                />
                {section.state.length > 1 && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(i, section.setState)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addField(section.setState)}>
              Add+
            </button>
          </div>
        </div>
      ))}

      <h1>Room Amenities</h1>
      {/* Room Amenities */}
      {[
        { label: 'Popular with Guests', state: popularWithGuests, setState: setPopularWithGuests },
        { label: 'Room Features', state: roomFeatures, setState: setRoomFeatures },
        { label: 'Bathroom', state: bathroom, setState: setBathroom },
      ].map((section, index) => (
        <div key={index} className={styles.formdataAdd}>
          <label>{section.label}</label>
          <div className={styles.multiInput}>
            {section.state.map((item, i) => (
              <div key={i} className={styles.inputContainer}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)}
                  required
                />
                {section.state.length > 1 && (
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => handleDelete(i, section.setState)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => addField(section.setState)}>
              Add+
            </button>
          </div>
        </div>
      ))}

      <h1>Property Rules and other</h1>
      {/* Property Rules */}
      <div className={styles.formdata}>
        <label>Check-in</label>
        <input style={{ width: '20%' }} type="text" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
      </div>

      <div className={styles.formdata}>
        <label>Check-out</label>
        <input style={{ width: '20%' }} type="text" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
      </div>

      {/* Other Rules */}
      <div className={styles.formdataAdd}>
        <label>Other Rules</label>
        <div className={styles.multiInput}>
          {otherRules.map((rule, i) => (
            <div key={i} className={styles.inputContainer}>
              <input
                type="text"
                value={rule}
                onChange={(e) => handleChange(i, otherRules, setOtherRules, e.target.value)}
                required
              />
              {otherRules.length > 1 && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(i, setOtherRules)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={() => addField(setOtherRules)}>
            Add+
          </button>
        </div>
      </div>

      {/* List of URLs */}
      <div className={styles.formdataAdd} style={{ flexWrap: 'wrap' }}>
        <label>Urls</label>
        <div className={styles.multiInput}>
          {urls.map((url, i) => (
            <div key={i} className={styles.inputContainer}>
              <input
                type="text"
                value={url}
                onChange={(e) => handleChange(i, urls, setUrls, e.target.value)}
                required
              />
              {urls.length > 1 && (
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={() => handleDelete(i, setUrls)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={() => addField(setUrls)}>
            Add+
          </button>
        </div>
      </div>

      <div className={styles.button}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
}
