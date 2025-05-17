import React, { useState } from 'react'
import styles from './AddPlaces.module.css'

export default function AddPlaces() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [suggestedDuration, setSuggestedDuration] = useState('');
  const [whatToExpect, setWhatToExpect] = useState('');
  const [tips, setTips] = useState(['']);
  const [history, setHistory] = useState('');
  const [highlights, setHighlights] = useState('');
  const [timings, setTimings] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [restrictedItems, setRestrictedItems] = useState('');
  const [moreAbout, setMoreAbout] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [urls, setUrls] = useState(['']);
  const [errors, setErrors] = useState({});

  const addField = (setState) => {
    setState((prev) => [...prev, '']);
  };
  
  const handleChange = (index, state, setState, value) => {
    const updatedFields = [...state];
    updatedFields[index] = value;
    setState(updatedFields);
  };
  
  const handleDelete = (index, state, setState) => {
    const updatedFields = state.filter((_, i) => i !== index);
    setState(updatedFields);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check required fields
    if (!name) newErrors.name = 'Name is required';
    if (!city) newErrors.city = 'City is required';
    if (!state) newErrors.state = 'State is required';
    
    // Validate latitude and longitude
    if (latitude === '') {
      newErrors.latitude = 'Latitude is required';
    } else if (isNaN(parseFloat(latitude))) {
      newErrors.latitude = 'Latitude must be a valid number';
    }
    
    if (longitude === '') {
      newErrors.longitude = 'Longitude is required';
    } else if (isNaN(parseFloat(longitude))) {
      newErrors.longitude = 'Longitude must be a valid number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the form errors before submitting');
      return;
    }
  
    const placeData = {
      name,
      desc,
      city,
      state,
      latitude: parseFloat(latitude) || 0, // Convert to number, default to 0 if empty
      longitude: parseFloat(longitude) || 0, // Convert to number, default to 0 if empty
      suggestedDuration,
      whatToExpect,
      tips,
      overview: {
        history,
        highlights,
        timings,
        entryFee,
        restrictedItems,
      },
      moreAbout,
      bestTime,
      urls,
    };
    console.log(placeData);
  
    try {
      const res = await fetch('http://localhost:5000/add-place', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placeData),
      });
      
      const data = await res.json();
      console.log('Place saved:', data);
      alert(data.error || data.message);
      if(data.message){
        setName('');
        setDesc('');
        setCity('');
        setState('');
        setLatitude('');
        setLongitude('');
        setSuggestedDuration('');
        setWhatToExpect('');
        setHistory('');
        setHighlights('');
        setTimings('');
        setEntryFee('');
        setRestrictedItems('');
        setMoreAbout('');
        setBestTime('');
        setUrls(['']);
        setTips(['']);
      }
    } catch (err) {
      console.error('Error submitting place data:', err);
    }
  };
  
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1>Basic Details</h1>
      <div className={styles.formdata}>
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className={errors.name ? styles.errorInput : ''}
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.formdata}>
        <label>City</label>
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          className={errors.city ? styles.errorInput : ''}
        />
        {errors.city && <span className={styles.errorText}>{errors.city}</span>}
        
        <label>State</label>
        <input 
          type="text" 
          value={state} 
          onChange={(e) => setState(e.target.value)} 
          className={errors.state ? styles.errorInput : ''}
        />
        {errors.state && <span className={styles.errorText}>{errors.state}</span>}
      </div>

      <div className={styles.formdata}>
        <label>Description</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      </div>

      <div className={styles.formdata}>
        <label>Latitude</label>
        <input 
          type="text" 
          value={latitude} 
          onChange={(e) => setLatitude(e.target.value)} 
          className={errors.latitude ? styles.errorInput : ''}
        />
        {errors.latitude && <span className={styles.errorText}>{errors.latitude}</span>}
        
        <label>Longitude</label>
        <input 
          type="text" 
          value={longitude} 
          onChange={(e) => setLongitude(e.target.value)} 
          className={errors.longitude ? styles.errorInput : ''}
        />
        {errors.longitude && <span className={styles.errorText}>{errors.longitude}</span>}
      </div>

      <div className={styles.formdata}>
        <label>Suggested Duration</label>
        <input type="text" value={suggestedDuration} onChange={(e) => setSuggestedDuration(e.target.value)} />
      </div>

      <h1>Others</h1>
      <div className={styles.formdata}>
        <label>What to Expect</label>
        <textarea value={whatToExpect} onChange={(e) => setWhatToExpect(e.target.value)} />
      </div>

      <h1>Overview</h1>
      {[
        { label: 'History', state: history, setState: setHistory },
        { label: 'Highlights', state: highlights, setState: setHighlights },
        { label: 'Timings', state: timings, setState: setTimings },
        { label: 'Entry Fee', state: entryFee, setState: setEntryFee },
        { label: 'Restricted Items', state: restrictedItems, setState: setRestrictedItems },
      ].map((section, index) => (
        <div key={index} className={styles.formdata}>
          <label>{section.label}</label>
          {section.label === 'History' ? (
            <textarea value={section.state} onChange={(e) => section.setState(e.target.value)} />
          ) : (
            <input value={section.state} onChange={(e) => section.setState(e.target.value)} />
          )}
        </div>
      ))}
      <div className={styles.formdata}>
        <label>More About</label>
        <textarea value={moreAbout} onChange={(e) => setMoreAbout(e.target.value)} />
      </div>

      <div className={styles.formdata}>
        <label>Best Time to Visit</label>
        <input value={bestTime} onChange={(e) => setBestTime(e.target.value)} />
      </div>

      <div className={styles.formdataAdd} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {urls.map((url, i) => (
          <div key={i} className={styles.formdataAdd}>
            <label>Url {i + 1}</label>
            <div>
              <input
                type="text"
                value={url}
                onChange={(e) => handleChange(i, urls, setUrls, e.target.value)}
              />
              {urls.length > 1 && (
                <button type="button" onClick={() => handleDelete(i, urls, setUrls)} className={styles.deleteButton}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className={styles.addButton} onClick={() => addField(setUrls)}>
          Add+
        </button>
      </div>
      <div className={styles.button}>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
}