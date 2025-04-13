import React, { useState, useEffect } from 'react';
import styles from './AddHotel.module.css';

export default function UpdateHotel() {
  const [searchName, setSearchName] = useState('');
  const [hotelData, setHotelData] = useState(null);
  const [error, setError] = useState('');

  const [cityName, setCityName] = useState('');
  const [hotelState, setHotelState] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [aboutHotel, setAboutHotel] = useState('');
  const [hotelAddress, setHotelAddress] = useState('');
  const [star, setStar] = useState('');

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

  
  const handleChange = (index, array, setArray, value) => {
    const updated = [...array];
    updated[index] = value;
    setArray(updated);
  };
  const addField = (setState) => setState((prev) => [...prev, '']);
  const handleDelete = (index, setArray) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  };

  const fetchHotel = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get-hotel/${searchName}`);
      const data = await res.json();
      if (!data.hotelname) throw new Error('Hotel not found');
      setHotelData(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (hotelData) {
      setHotelName(hotelData.hotelname);
      setCityName(hotelData.cityname);
      setHotelState(hotelData.hotelstate);
      setAboutHotel(hotelData.abouthotel);
      setHotelAddress(hotelData.hoteladdress);
      setStar(hotelData.star);
      setBasicFacilities(hotelData.amenities?.basicFacilities || ['']);
      setFoodAndDrinks(hotelData.amenities?.foodAndDrinks || ['']);
      setSafetyAndSecurity(hotelData.amenities?.safetyAndSecurity || ['']);
      setHealthAndWellness(hotelData.amenities?.healthAndWellness || ['']);
      setCommonArea(hotelData.amenities?.commonArea || ['']);
      setPopularWithGuests(hotelData.roomamenities?.popularWithGuests || ['']);
      setRoomFeatures(hotelData.roomamenities?.roomFeatures || ['']);
      setBathroom(hotelData.roomamenities?.bathroom || ['']);
      setCheckIn(hotelData.propertyrules?.checkIn || '');
      setCheckOut(hotelData.propertyrules?.checkOut || '');
      setOtherRules(hotelData.propertyrules?.otherRules || ['']);
      setUrls(hotelData.urlslist || ['']);
      setReview(hotelData.reviews || ['']);
    }
  }, [hotelData]);
  const handleDeleteData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/delete-hotel/${hotelName}`, {
        method: 'DELETE',
      });
  
      const data = await res.json();
      alert(data.message || data.error);
  
      if (data.message) {
        // Clear hotel fields
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
      console.error('Error deleting hotel:', err);
      alert('Failed to delete hotel');
    }
  };
  
  const handleSubmit = async () => {
   
    const hotelDetails = {
      cityName, hotelState, hotelName, aboutHotel, hotelAddress, star,
      amenities: { basicFacilities, foodAndDrinks, safetyAndSecurity, healthAndWellness, commonArea },
      roomAmenities: { popularWithGuests, roomFeatures, bathroom },
      propertyRules: { checkIn, checkOut, otherRules },
      urlsList: urls, reviews: review
    };
    try {
      const res = await fetch(`http://localhost:5000/update-hotel/${hotelName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelDetails),
      });
      const data = await res.json();
      alert(data.message || data.error);
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
      console.error('Error updating hotel:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Hotel</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchHotel(); }} className={styles.formInput}>
        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search Hotel by Name" />
        <button type="submit" className={styles.submitButton}>Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && (
        <div>
          <h1>Basic Hotel Details</h1>
          <div className={styles.formdata}>
            <label>Hotel Name</label>
            <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>City Name</label>
            <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            <label>Hotel State</label>
            <input type="text" value={hotelState} onChange={(e) => setHotelState(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>About the Hotel</label>
            <textarea value={aboutHotel} onChange={(e) => setAboutHotel(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Hotel Address</label>
            <input type="text" value={hotelAddress} onChange={(e) => setHotelAddress(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>Star Rating</label>
            <select value={star} onChange={(e) => setStar(e.target.value)}>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>{s} Star</option>
              ))}
            </select>
          </div>

          <h2>Hotel Amenities</h2>
          {[{ label: 'Basic Facilities', state: basicFacilities, setState: setBasicFacilities },
            { label: 'Food and Drinks', state: foodAndDrinks, setState: setFoodAndDrinks },
            { label: 'Safety and Security', state: safetyAndSecurity, setState: setSafetyAndSecurity },
            { label: 'Health and Wellness', state: healthAndWellness, setState: setHealthAndWellness },
            { label: 'Common Area', state: commonArea, setState: setCommonArea },
          ].map((sec, i) => (
            <div key={i} className={styles.formdataAdd}>
              <label>{sec.label}</label>
              {sec.state.map((val, idx) => (
                <div key={idx} className={styles.inputContainer}>
                  <input value={val} onChange={(e) => handleChange(idx, sec.state, sec.setState, e.target.value)} />
                  {sec.state.length > 1 && <button type="button" onClick={() => handleDelete(idx, sec.setState)}>Delete</button>}
                </div>
              ))}
              <button type="button" onClick={() => addField(sec.setState)}>Add+</button>
            </div>
          ))}

          <h2>Room Amenities</h2>
          {[{ label: 'Popular with Guests', state: popularWithGuests, setState: setPopularWithGuests },
            { label: 'Room Features', state: roomFeatures, setState: setRoomFeatures },
            { label: 'Bathroom', state: bathroom, setState: setBathroom },
          ].map((sec, i) => (
            <div key={i} className={styles.formdataAdd}>
              <label>{sec.label}</label>
              {sec.state.map((val, idx) => (
                <div key={idx} className={styles.inputContainer}>
                  <input value={val} onChange={(e) => handleChange(idx, sec.state, sec.setState, e.target.value)} />
                  {sec.state.length > 1 && <button type="button" onClick={() => handleDelete(idx, sec.setState)}>Delete</button>}
                </div>
              ))}
              <button type="button" onClick={() => addField(sec.setState)}>Add+</button>
            </div>
          ))}

          <h2>Property Rules</h2>
          <div className={styles.formdata}>
            <label>Check-in</label>
            <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            <label>Check-out</label>
            <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>

          <div className={styles.formdataAdd}>
            <label>Other Rules</label>
            {otherRules.map((r, i) => (
              <div key={i} className={styles.inputContainer}>
                <input value={r} onChange={(e) => handleChange(i, otherRules, setOtherRules, e.target.value)} />
                {otherRules.length > 1 && <button type="button" onClick={() => handleDelete(i, setOtherRules)}>Delete</button>}
              </div>
            ))}
            <button type="button" onClick={() => addField(setOtherRules)}>Add+</button>
          </div>

          <h2>Media & Reviews</h2>
          <div className={styles.formdataAdd}>
            <label>URLs</label>
            {urls.map((url, i) => (
              <div key={i} className={styles.inputContainer}>
                <input value={url} onChange={(e) => handleChange(i, urls, setUrls, e.target.value)} />
                {urls.length > 1 && <button type="button" onClick={() => handleDelete(i, setUrls)}>Delete</button>}
              </div>
            ))}
            <button type="button" onClick={() => addField(setUrls)}>Add+</button>
          </div>

          <div className={styles.button}>
            <button onClick={handleSubmit} className={styles.submitButton}>Update</button>
          </div>
          <div className={styles.button}>
            <button onClick={handleDeleteData} className={styles.submitButton}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
