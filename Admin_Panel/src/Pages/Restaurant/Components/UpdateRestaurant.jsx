import React, { useState, useEffect } from 'react';
import styles from './AddRestaurant.module.css';

export default function UpdateRestaurant() {
  const [searchName, setSearchName] = useState('');
  const [restaurantData, setRestaurantData] = useState(null);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [about, setAbout] = useState('');

  const [cuisines, setCuisines] = useState(['']);
  const [mealTypes, setMealTypes] = useState(['']);
  const [specialDiets, setSpecialDiets] = useState(['']);
  const [restaurantFeatures, setRestaurantFeatures] = useState(['']);

  const [timings, setTimings] = useState([{ from: '', to: '' }]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [urls, setUrls] = useState(['']);
  const [email, setEmail] = useState('');
  const [review, setReview] = useState(['']);

  const handleFieldChange = (action, section, index = null) => {
    if (action === 'add') {
      section.setState((prev) => [...prev, '']);
    } else if (action === 'remove' && index !== null) {
      const updatedFields = [...section.state];
      updatedFields.splice(index, 1);
      section.setState(updatedFields);
    }
  };

  const handleChange = (index, state, setState, value) => {
    const updatedFields = [...state];
    updatedFields[index] = value;
    setState(updatedFields);
  };
  const addField = (setState) => setState((prev) => [...prev, '']);
  const handleDelete = (index, setArray) => {
    setArray(prev => prev.filter((_, i) => i !== index));
  };
  const handleTimingChange = (index, field, value) => {
    const updatedTimings = [...timings];
    updatedTimings[index][field] = value;
    setTimings(updatedTimings);
  };

  const fetchRestaurant = async () => {
    try {
      const res = await fetch(`http://localhost:5000/get-restaurant/${searchName}`);
      const data = await res.json();
      if (!data.name) throw new Error('Restaurant not found');
      setRestaurantData(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (restaurantData) {
      setTimings(Array.isArray(restaurantData.timings) ? restaurantData.timings : [{ from: '', to: '' }]);
      setName(restaurantData.name || '');
      setCity(restaurantData.city || '');
      setState(restaurantData.state || '');
      setAddress(restaurantData.address || '');
      setAbout(restaurantData.about || '');
      setCuisines(restaurantData.features?.cuisines || ['']);
      setMealTypes(restaurantData.features?.mealTypes || ['']);
      setSpecialDiets(restaurantData.features?.specialDiets || ['']);
      setRestaurantFeatures(restaurantData.features?.restaurantFeatures || ['']);
      setPhoneNumber(restaurantData.contactinfo?.phoneNumber || '');
      setWebsite(restaurantData.contactinfo?.website || '');
      setEmail(restaurantData.contactinfo?.email || '');
      setReview(restaurantData.review || ['']);
      setUrls(restaurantData.urls || [''])
    }
  }, [restaurantData]);

  const handleDeleteData = async (name) =>{
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
      features: { cuisines, mealTypes, specialDiets, restaurantFeatures },
      timings,
      contactInfo: { phoneNumber, website, email },
      review,
      urls,
    };

    try {
      const res = await fetch(`http://localhost:5000/delete-restaurant/${name}`, {
        method: 'DELETE',
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
      alert(data.message || data.error);
    } catch (err) {
      console.error('Error updating restaurant data:', err);
    }
  }
  const handleSubmit = async () => {

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
      features: { cuisines, mealTypes, specialDiets, restaurantFeatures },
      timings,
      contactInfo: { phoneNumber, website, email },
      review,
      urls,
    };

    try {
      const res = await fetch(`http://localhost:5000/update-restaurant/${name}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurantData),
      });

      const data = await res.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error('Error updating restaurant data:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Update Restaurant</h1>
      <form onSubmit={(e) => { e.preventDefault(); fetchRestaurant(); }} className={styles.formInput}>
        <input
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Enter Restaurant Name to Search"
        />
        <button type="submit" className={styles.submitButton}>Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!error && (
        <div>
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
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className={styles.formdata}>
            <label>About</label>
            <textarea value={about} onChange={(e) => setAbout(e.target.value)} required />
          </div>

          <h1>Restaurant Features</h1>
          {[{ label: 'Cuisines', state: cuisines, setState: setCuisines },
            { label: 'Meal Types', state: mealTypes, setState: setMealTypes },
            { label: 'Special Diets', state: specialDiets, setState: setSpecialDiets },
            { label: 'Features', state: restaurantFeatures, setState: setRestaurantFeatures }].map((section, index) => (
            <div key={index} className={styles.formdataAdd}>
              <label>{section.label}</label>
              {section.state.map((item, i) => (
                <div key={i} className={styles.inputGroup}>
                  <input type="text" value={item} onChange={(e) => handleChange(i, section.state, section.setState, e.target.value)} />
                  {section.state.length > 1 && (
                    <button type="button" className={styles.deleteButton} onClick={() => handleFieldChange('remove', section, i)}>Delete</button>
                  )}
                </div>
              ))}
              <button type="button" className={styles.addButton} onClick={() => handleFieldChange('add', section)}>Add+</button>
            </div>
          ))}

          <h1>Timings</h1>
          {timings.map((time, index) => (
            <div key={index} className={styles.formdataAdd}>
              <label>From</label>
              <input type="time" value={time.from} onChange={(e) => handleTimingChange(index, 'from', e.target.value)} />
              <label>To</label>
              <input type="time" value={time.to} onChange={(e) => handleTimingChange(index, 'to', e.target.value)} />
              {timings.length > 1 && (
                <button type="button" onClick={() => handleFieldChange('remove', { state: timings, setState: setTimings }, index)}>Delete</button>
              )}
              <button type="button" onClick={() => handleFieldChange('add', { state: timings, setState: setTimings })}>Add+</button>
            </div>
          ))}

          <h1>Contact Info</h1>
          <div className={styles.formdata}>
            <label>Phone Number</label>
            <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          </div>
          <div className={styles.formdata}>
            <label>Website URL</label>
            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className={styles.formdata}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
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
            <button onClick={()=>handleDeleteData(name)} className={styles.submitButton}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
