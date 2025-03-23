import React, { useState } from 'react';
import styles from './AddPlace.module.css';

export default function AddPlace() {
  // State for Basic Details
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [suggestedDuration, setSuggestedDuration] = useState('');

  // State for What to Expect
  const [whatToExpect, setWhatToExpect] = useState('');

  // State for Tips (Dynamic Input Fields)
  const [tips, setTips] = useState(['']);

  // State for Overview
  const [history, setHistory] = useState('');
  const [highlights, setHighlights] = useState('');
  const [timings, setTimings] = useState('');
  const [entryFee, setEntryFee] = useState('');
  const [restrictedItems, setRestrictedItems] = useState('');

  // State for More About
  const [moreAbout, setMoreAbout] = useState('');

  // State for Best Time to Visit
  const [bestTime, setBestTime] = useState('');

  // State for Image URLs
  const [urls, setUrls] = useState(['']);

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

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const placeData = {
      name,
      desc,
      city,
      state,
      latitude,
      longitude,
      suggestedDuration,
      whatToExpect,
      tips,
      overview: { history, highlights, timings, entryFee, restrictedItems },
      moreAbout,
      bestTime,
      urls,
    };

    console.log('Place Data:', placeData);
  };

  return (
    <div className={styles.addPlaceContainer}>
      <h1>Add Place</h1>
      <form onSubmit={handleSubmit}>

        {/* Basic Details */}
        <h2>Basic Details</h2>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div className={styles.formGroup}>
          <label>State</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>

        <div className={styles.coordinates}>
          <div className={styles.formGroup}>
            <label>Latitude</label>
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Longitude</label>
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Suggested Duration</label>
          <input type="text" value={suggestedDuration} onChange={(e) => setSuggestedDuration(e.target.value)} />
        </div>

        {/* What to Expect */}
        <h2>What to Expect</h2>
        <div className={styles.formGroup}>
          <label>What to Expect</label>
          <textarea value={whatToExpect} onChange={(e) => setWhatToExpect(e.target.value)} />
        </div>

        {/* Tips (Dynamic Fields) */}
        <h2>Tips</h2>
        <div className={styles.formGroup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  {tips.map((tip, i) => (
    <div key={i} style={{ display: 'flex',alignItems: 'center', marginBottom: '10px', width: '100%' }}>
      <label>Tip {i + 1}</label>
      <input 
        type="text" 
        value={tip} 
        onChange={(e) => handleChange(i, tips, setTips, e.target.value)} 
        style={{ width: '60%' }} 
      />
    </div>
  ))}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <button type="button" className={styles.addButton} onClick={() => addField(setTips)}>Add+</button>
  </div>
</div>


        {/* Overview Section */}
        <h2>Overview</h2>
        {[
          { label: 'History', state: history, setState: setHistory },
          { label: 'Highlights', state: highlights, setState: setHighlights },
          { label: 'Timings', state: timings, setState: setTimings },
          { label: 'Entry Fee', state: entryFee, setState: setEntryFee },
          { label: 'Restricted Items', state: restrictedItems, setState: setRestrictedItems },
        ].map((section, index) => (
          <div key={index} className={styles.formGroup}>
            <label>{section.label}</label>
            <textarea value={section.state} onChange={(e) => section.setState(e.target.value)} />
          </div>
        ))}

        {/* More About */}
        <h2>More About</h2>
        <div className={styles.formGroup}>
          <label>More About</label>
          <textarea value={moreAbout} onChange={(e) => setMoreAbout(e.target.value)} />
        </div>

        {/* Best Time to Visit */}
        <h2>Best Time to Visit</h2>
        <div className={styles.formGroup}>
          <label>Best Time to Visit</label>
          <textarea value={bestTime} onChange={(e) => setBestTime(e.target.value)} />
        </div>

        {/* Image URLs (Dynamic Fields) */}
        <h2>Image URLs</h2>
        <div className={styles.formGroup}>
          {urls.map((url, i) => (
            <input key={i} type="text" value={url} onChange={(e) => handleChange(i, urls, setUrls, e.target.value)} />
          ))}
          <button type="button" className={styles.addButton} onClick={() => addField(setUrls)}>Add+</button>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>Submit</button>

      </form>
    </div>
  );
}
