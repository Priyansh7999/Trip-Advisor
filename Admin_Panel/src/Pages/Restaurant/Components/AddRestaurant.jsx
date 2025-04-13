import React, { useState } from 'react'
import styles from './AddRestaurant.module.css'

export default function AddRestaurant() {
  // Basic Details
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');

  // Features
  const [cuisines, setCuisines] = useState(['']);
  const [mealTypes, setMealTypes] = useState(['']);
  const [specialDiets, setSpecialDiets] = useState(['']);
  const [restaurantFeatures, setRestaurantFeatures] = useState(['']);

  // Timings
  const [timings, setTimings] = useState([{ from: '', to: '' }]);

  // Contact Info
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [urls, setUrls] = useState(['']);
  // State for Reviews (Not displaying in UI but handling it for database)
  const [review, setReview] = useState(['']);

  // Function to handle add and remove field dynamically
  const handleFieldChange = (action, section, index = null) => {
    if (action === 'add') {
      section.setState((prev) => [...prev, '']); // Add new field
    } else if (action === 'remove' && index !== null) {
      const updatedFields = [...section.state];
      updatedFields.splice(index, 1); // Remove field at index
      section.setState(updatedFields);
    }
  };

  // Function to handle input change for array fields
  const handleChange = (index, state, setState, value) => {
    const updatedFields = [...state];
    updatedFields[index] = value;
    setState(updatedFields);
  };
  const addField = (setState) => {
    setState(prevState => [...prevState, '']);
  };
  // Function to handle timing change
  const handleTimingChange = (index, field, value) => {
    const updatedTimings = [...timings];
    updatedTimings[index][field] = value;
    setTimings(updatedTimings);
  };

  const handleDelete = (index, setState) => {
    setState(prevState => prevState.filter((_, i) => i !== index));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    const restaurantData = {
      name,
      city,
      state,
      address,
      about,
      features: {
        cuisines,
        mealTypes,
        specialDiets,
        restaurantFeatures,
      },
      timings,
      contactInfo: {
        phoneNumber,
        website,
        email,
      },
      review,
      urls,
    };
    
    try {
      const res = await fetch('http://localhost:5000/add-restaurant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData),
      });

      const data = await res.json();
      alert(data.message)
      if(data.message){
        setName('');
        setCity('');
        setState('');
        setAddress('');
        setAbout('');
        setCuisines(['']);
        setMealTypes(['']);
        setSpecialDiets(['']);
        setRestaurantFeatures(['']);
        setPhoneNumber('');
        setWebsite('');
        setEmail('')
        setUrls([''])
      }
      console.log('Restaurant saved:', data);
    } catch (err) {
      console.error('Error submitting restaurant data:', err);
    }
  };


  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Basic Details */}
      <h1>Basic Restaurant Details</h1>
      <div className={styles.formdata}>
        <label>Restaurant Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className={styles.formdata}>
        <label>City Name</label>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        <label>State Name</label>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>
      <div className={styles.formdata}>
        <label>Address</label>
        <textarea value={address} placeholder='Address of the Restaurant' onChange={(e) => setAddress(e.target.value)} required />
      </div>

      <div className={styles.formdata}>
        <label>About</label>
        <textarea value={about} placeholder='Something about Restaurant' onChange={(e) => setAbout(e.target.value)} required />
      </div>

      {/* Features Section */}
      <h1>Restaurant Features</h1>
      {[
        { label: 'Cuisines', state: cuisines, setState: setCuisines },
        { label: 'Meal Types', state: mealTypes, setState: setMealTypes },
        { label: 'Special Diets', state: specialDiets, setState: setSpecialDiets },
        { label: 'Features', state: restaurantFeatures, setState: setRestaurantFeatures },
      ].map((section, index) => (
        <div key={index} className={styles.formdataAdd}>
          <label>{section.label}</label>
          <div className={styles.multiInput}>
            {section.state.map((item, i) => (
              <div key={i} className={styles.inputGroup}>
                <input type="text" value={item} onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)} required />
                {section.state.length > 1 && (
                  <button type="button" className={styles.deleteButton} onClick={() => handleFieldChange('remove', section, i)}>Delete</button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addButton} onClick={() => handleFieldChange('add', section)}>
              Add+
            </button>
          </div>
        </div>
      ))}

      {/* Timings Section */}
      <h1>Timings</h1>
      {timings.map((time, index) => (
        <div key={index} className={styles.formdata}>
          <label>From</label>
          <input type="time" value={time.from} onChange={(e) => handleTimingChange(index, 'from', e.target.value)} required />

          <label>To</label>
          <input type="time" value={time.to} onChange={(e) => handleTimingChange(index, 'to', e.target.value)} required />

          {timings.length > 1 && (
            <button
              type="button"
              className={styles.deleteButton}
              onClick={() => handleFieldChange('remove', { state: timings, setState: setTimings }, index)}
            >
              Delete
            </button>
          )}

          <button type="button" className={styles.addButton} onClick={() => handleFieldChange('add', { state: timings, setState: setTimings })}>
            Add+
          </button>
        </div>
      ))}

      {/* Contact Info Section */}
      <h1>Contact Info</h1>
      <div className={styles.formdata}>
        <label>Phone Number</label>
        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>

      <div className={styles.formdata}>
        <label>Website URL</label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} required />
      </div>

      <div className={styles.formdata}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.formdataAdd} style={{ flexWrap: 'wrap' }}>
      <label>Urls</label>
      <div className={styles.multiInput}>
        {urls.map((url, i) => (
          <div key={i} className={styles.formdataAdd}>
            <input
              type="text"
              value={url}
              onChange={(e) => handleChange(i, urls, setUrls, e.target.value)}
              required
              width={'100%'}
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

      {/* Submit Button */ }
  <div className={styles.button}>
    <button type="submit" className={styles.submitButton}>Submit</button>
  </div>
    </form >
  )
}
