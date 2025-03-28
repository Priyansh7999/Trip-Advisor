import React, { useState } from 'react';
import styles from './AddRestaurants.module.css';
export default function AddRestaurants() {
      // State for Basic Details
      const [name, setName] = useState('');
      const [city, setCity] = useState('');
      const [state, setState] = useState('');
      const [address, setAddress] = useState('');
      const [about, setAbout] = useState('');
    
      // State for Features
      const [cuisines, setCuisines] = useState(['']);
      const [mealTypes, setMealTypes] = useState(['']);
      const [specialDiets, setSpecialDiets] = useState(['']);
      const [restaurantFeatures, setRestaurantFeatures] = useState(['']);
    
      // State for Timings
      const [timings, setTimings] = useState([{ from: '', to: '' }]);
    
      // State for Contact Info
      const [phoneNumber, setPhoneNumber] = useState('');
      const [website, setWebsite] = useState('');
      const [email, setEmail] = useState('');
    
      // State for Reviews (Not displaying in UI but handling it for database)
      const [review, setReview] = useState(['']);
    
      // Function to add a new input field
      const addField = (setState) => {
        setState((prev) => [...prev, '']);
      };
    
      // Function to handle input change in array fields
      const handleChange = (index, state, setState, value) => {
        const updatedFields = [...state];
        updatedFields[index] = value;
        setState(updatedFields);
      };
    
      // Function to add new timing row
      const addTiming = () => {
        setTimings((prev) => [...prev, { from: '', to: '' }]);
      };
    
      // Function to handle time change
      const handleTimingChange = (index, field, value) => {
        const updatedTimings = [...timings];
        updatedTimings[index][field] = value;
        setTimings(updatedTimings);
      };
    
      // Handle Submit
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const restaurantData = {
            name,
            city,
            state,
            address,
            about,
            features: { cuisines, mealTypes, specialDiets, restaurantFeatures },
            timings,
            contactInfo: { phoneNumber, website, email },
            review // Not displayed but handled
        };
    
        try {
            const response = await fetch('http://localhost:7000/submit-restaurant-details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(restaurantData)
            });
    
            if (!response.ok) {
                throw new Error('Failed to submit restaurant details');
            }
    
            const result = await response.json();
            console.log('✅ Restaurant details submitted successfully:', result);
            alert('Restaurant details added successfully!');
        } catch (error) {
            console.error('❌ Error submitting restaurant details:', error);
            alert('Error submitting restaurant details. Please try again.');
        }
    };
    
    
      return (
        <div className={styles.manageRestaurantsContainer}>
          <h1>Manage Restaurants</h1>
          <form onSubmit={handleSubmit}>
    
            {/* Basic Details */}
            <h2>Basic Details</h2>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input type="text" style={{ width: '25%' }} value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>City</label>
              <input type="text" style={{ width: '25%' }} value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>State</label>
              <input type="text" style={{ width: '25%' }} value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>Address</label>
              <textarea value={address} style={{ width: '65%' }} onChange={(e) => setAddress(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>About</label>
              <textarea value={about} style={{ width: '65%' }} onChange={(e) => setAbout(e.target.value)} required />
            </div>
    
            {/* Features Section */}
            <h2>Features</h2>
            {[
              { label: 'Cuisines', state: cuisines, setState: setCuisines },
              { label: 'Meal Types', state: mealTypes, setState: setMealTypes },
              { label: 'Special Diets', state: specialDiets, setState: setSpecialDiets },
              { label: 'Features', state: restaurantFeatures, setState: setRestaurantFeatures },
            ].map((section, index) => (
              <div key={index} className={styles.formGroup}>
                <label>{section.label}</label>
                {section.state.map((item, i) => (
                  <input key={i} style={{ width: '25%' }} type="text" value={item} onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)} required />
                ))}
                <button type="button" className={styles.addButton} onClick={() => addField(section.setState)}>Add+</button>
              </div>
            ))}
    
            {/* Timings Section */}
            <h2>Timings</h2>
            {timings.map((time, index) => (
              <div key={index} className={styles.formGroup}>
                <label>From</label>
                <input type="time" value={time.from} onChange={(e) => handleTimingChange(index, 'from', e.target.value)} required />
    
                <label>To</label>
                <input type="time" value={time.to} onChange={(e) => handleTimingChange(index, 'to', e.target.value)} required />
    
                <button type="button" className={styles.addButton} onClick={addTiming}>Add+</button>
              </div>
            ))}
    
            {/* Contact Info Section */}
            <h2>Contact Info</h2>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="text" style={{ width: '25%' }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>Website URL</label>
              <input type="text" style={{ width: '65%' }} value={website} onChange={(e) => setWebsite(e.target.value)} required />
            </div>
    
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" style={{ width: '65%' }} value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
    
            {/* Submit Button */}
            <button type="submit" style={{ width: '20%' }} className={styles.submitButton}>Submit</button>
    
          </form>
        </div>
      );
    }
    