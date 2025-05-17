import React, { useState } from 'react'
import styles from './CityDetails.module.css'
export default function AddCity() {
  // Define state for each input field
  const [cityName, setCityName] = useState('');
  const [description, setDescription] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // Seasons data with start and end date
  const [peakSeasonStart, setPeakSeasonStart] = useState('');
  const [peakSeasonEnd, setPeakSeasonEnd] = useState('');
  const [peakSeasonDesc, setPeakSeasonDesc] = useState('');

  const [moderateSeasonStart, setModerateSeasonStart] = useState('');
  const [moderateSeasonEnd, setModerateSeasonEnd] = useState('');
  const [moderateSeasonDesc, setModerateSeasonDesc] = useState('');

  const [offSeasonStart, setOffSeasonStart] = useState('');
  const [offSeasonEnd, setOffSeasonEnd] = useState('');
  const [offSeasonDesc, setOffSeasonDesc] = useState('');

  // Overview details split into multiple fields
  const [cityTitle, setCityTitle] = useState('');
  const [cityHistory, setCityHistory] = useState('');
  const [state, setState] = useState('');
  const [touristPlaces, setTouristPlaces] = useState('');
  const [famousFor, setFamousFor] = useState('');
  const [weather, setWeather] = useState('');
  const [byAir, setByAir] = useState('');
  const [byRail, setByRail] = useState('');
  const [byRoad, setByRoad] = useState('');
  const [conclusion, setConclusion] = useState('');
  const [review, setReview] = useState(['']);
  const [foodToTry, setFoodToTry] = useState([{ name: '', description: '' }]);

  const [thingsToBuy, setThingsToBuy] = useState([{ heading: '', description: '' }]);

  const [urls, setUrls] = useState([{ url: '', description: '' }]);


  const handleFieldChange = (action, field, index, setState) => {
    const updatedFields = [...field];
    if (action === 'add') {
      updatedFields.push({ name: '', description: '' });
    } else if (action === 'remove') {
      updatedFields.splice(index, 1); // Remove field at index
    }
    setState(updatedFields);
  };

  // Handle changes for dynamic fields (Food to Try, Things to Buy, etc.)
  const handleChange = (index, field, value, setState) => {
    const updatedFields = [...field];
    updatedFields[index] = { ...updatedFields[index], ...value };
    setState(updatedFields);
  };


  const placeTypes = [
    'Romantic Vacation',
    'Foodies',
    'Heritage Walk',
    'Hills and Mountains',
    'Adventure Seekers',
    'Honeymoon Hotspots',
    'Beach Retreat',
    'Places To Relax'
  ];
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState([]);
  const handlePlaceTypeChange = (type) => {
    setSelectedPlaceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const cityDetails = {
      cityName,
      description,
      bestTime,
      latitude: latitude || null,
      longitude: longitude || null,
      peakSeason: { start: peakSeasonStart, end: peakSeasonEnd, description: peakSeasonDesc },
      moderateSeason: { start: moderateSeasonStart, end: moderateSeasonEnd, description: moderateSeasonDesc },
      offSeason: { start: offSeasonStart, end: offSeasonEnd, description: offSeasonDesc },
      overview: {
        cityTitle,
        cityHistory,
        state,
        touristPlaces,
        famousFor,
        weather,
      },
      howToReach: { byAir, byRail, byRoad },
      foodToTry: foodToTry || [],
      thingsToBuy: thingsToBuy || [],
      placeTypes: selectedPlaceTypes || [],
      conclusion,
      urls: urls || [],
      reviews: review || [],
    };
    console.log(cityDetails);
  
    try {
      const res = await fetch('http://localhost:5000/add-city', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityDetails),
      });
  
      const data = await res.json();
      console.log(data);
      alert(data.error || data.message);
      if(data.message){
      setCityName('');
      setDescription('');
      setBestTime('');
      setLatitude('');
      setLongitude('');  
      setPeakSeasonStart('');
      setPeakSeasonEnd('');
      setPeakSeasonDesc('');  
      setModerateSeasonStart('');
      setModerateSeasonEnd('');
      setModerateSeasonDesc('');  
      setOffSeasonStart('');
      setOffSeasonEnd('');
      setOffSeasonDesc('');  
      setCityTitle('');
      setCityHistory('');
      setState('');
      setTouristPlaces('');
      setFamousFor('');
      setWeather('');  
      setByAir('');
      setByRail('');
      setByRoad('');  
      setFoodToTry([{ name: '', description: '' }]);
      setThingsToBuy([{ heading: '', description: '' }]);
      setSelectedPlaceTypes([]);
      setConclusion('');
      setUrls([{ url: '', description: '' }]);
      setReview([]);        
      }

    } catch (err) {
      console.error('Submission error:', err);
    }
  };
  
  
  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1>Enter Basic Information</h1>

      {/* City Name */}
      <div className={styles.formdata}>
        <label>City Name</label>
        <input onChange={(e) => setCityName(e.target.value)} type="text" placeholder='Enter City Name' />
      </div>

      {/* State */}
      <div className={styles.formdata}>
        <label>State</label>
        <input onChange={(e) => setState(e.target.value)} type="text" placeholder='Enter State' />
      </div>

      {/* Description */}
      <div className={styles.formdata}>
        <label>Description</label>
        <textarea onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Enter City Description' />
      </div>

      {/* Longitude and Latitude */}
      <div className={styles.formdata}>
        <label>Latitude</label>
        <input onChange={(e) => setLatitude(e.target.value)} type="text" placeholder='Enter Latitude' />
        <label>Longitude</label>
        <input onChange={(e) => setLongitude(e.target.value)} type="text" placeholder='Enter Longitude' />
      </div>

      <h1>Time To Visit</h1>
      {/* Best Time to Visit */}
      <div className={styles.formdata}>
        <label>Best Time to Visit</label>
        <input onChange={(e) => setBestTime(e.target.value)} type="text" placeholder='Enter Best Time to Visit' />
      </div>
      <div>
        {['Peak', 'Moderate', 'Off'].map((season, index) => (
          <div key={index} className={styles.formdata}>
            <label>{season} Season Start</label>
            <select value={season === 'Peak' ? peakSeasonStart : season === 'Moderate' ? moderateSeasonStart : offSeasonStart}
              onChange={(e) => {
                if (season === 'Peak') setPeakSeasonStart(e.target.value);
                else if (season === 'Moderate') setModerateSeasonStart(e.target.value);
                else setOffSeasonStart(e.target.value);
              }} required>
              <option value="">Select Month</option>
              {months.map((month) => <option key={month} value={month}>{month}</option>)}
            </select>

            <label>{season} Season End</label>
            <select value={season === 'Peak' ? peakSeasonEnd : season === 'Moderate' ? moderateSeasonEnd : offSeasonEnd}
              onChange={(e) => {
                if (season === 'Peak') setPeakSeasonEnd(e.target.value);
                else if (season === 'Moderate') setModerateSeasonEnd(e.target.value);
                else setOffSeasonEnd(e.target.value);
              }} required>
              <option value="">Select Month</option>
              {months.map((month) => <option key={month} value={month}>{month}</option>)}
            </select>

            <label>{season} Season Description</label>
            <textarea value={season === 'Peak' ? peakSeasonDesc : season === 'Moderate' ? moderateSeasonDesc : offSeasonDesc}
              style={{ width: '30%' }}
              onChange={(e) => {
                if (season === 'Peak') setPeakSeasonDesc(e.target.value);
                else if (season === 'Moderate') setModerateSeasonDesc(e.target.value);
                else setOffSeasonDesc(e.target.value);
              }} required />
          </div>
        ))}
      </div>

      {/* Type of Place */}
      <div className={styles.checkBoxGroup}>
        <p>Type of Place</p>
        <div className={styles.options}>
          {placeTypes.map((type) => (
            <label key={type}>
              <input type="checkbox" checked={selectedPlaceTypes.includes(type)} onChange={() => handlePlaceTypeChange(type)} />
              {type}
            </label>
          ))}
        </div>
      </div>

      <h1>City Overview</h1>
      {/* City Overview */}
      <div className={styles.cityoverview}>
        <div className={styles.formdata}>
          <label>City Title</label>
          <input onChange={(e) => setCityTitle(e.target.value)} type="text" name="" id="" placeholder='Enter City Title' />
        </div>

        <div className={styles.formdata}>
          <label>City History</label>
          <textarea onchange={(e) => setCityHistory(e.target.value)} type="text" name="" id="" placeholder='Enter City History' />
        </div>

        <div className={styles.formdata}>
          <label>Tourist Place To visit</label>
          <input onchange={(e) => setTouristPlaces(e.target.value)} type="text" name="" id="" placeholder='Tourist Place To visit' />
        </div>

        <div className={styles.formdata}>
          <label>City Famous For</label>
          <input onchange={(e) => setFamousFor(e.target.value)} type="text" name="" id="" placeholder='City Famous For' />
        </div>

        <div className={styles.formdata}>
          <label>Weather</label>
          <input onchange={(e) => setWeather(e.target.value)} type="text" name="" id="" placeholder='Type Of Weather' />
        </div>
      </div>

      {/* How To Reach */}
      <h1>How To Reach</h1>
      <div className={styles.howtoreach}>
        <div className={styles.formdata}>
          <label htmlFor='byAir'>By Air</label>
          <textarea onchange={(e) => setByAir(e.target.value)} type="text" name="" id="byAir" placeholder='By Air' />
        </div>
        <div className={styles.formdata}>
          <label htmlFor='byAir'>By Train</label>
          <textarea onchange={(e) => setByRail(e.target.value)} type="text" name="" id="byTrain" placeholder='By Train' />
        </div>
        <div className={styles.formdata}>
          <label htmlFor='byAir'>By Road</label>
          <textarea type="text" name="" onchange={(e) => setByRoad(e.target.value)} id="byRoad" placeholder='By Road' />
        </div>
      </div>

      {/* Dynamic fields: Food to Try */}
      <h1>Food To Try</h1>
      <div className={styles.formdataAdd}>
        {foodToTry.map((food, index) => (
          <div key={index} className={styles.multiInput}>
            <input
              type='text'
              placeholder='Food Name'
              value={food.name}
              onChange={(e) => handleChange(index, foodToTry, { name: e.target.value }, setFoodToTry)}
            />
            <textarea
              placeholder='Food Description'
              value={food.description}
              onChange={(e) => handleChange(index, foodToTry, { description: e.target.value }, setFoodToTry)}
            />
            {foodToTry.length > 1 && (
              <button
                type='button'
                onClick={() => handleFieldChange('remove', foodToTry, index, setFoodToTry)}
              >
                Delete
              </button>
            )}
            <button
              type='button'
              onClick={() => handleFieldChange('add', foodToTry, null, setFoodToTry)}
            >
              Add+
            </button>
          </div>
        ))}

      </div>
      <h1>Things To Buy</h1>
      <div className={styles.formdataAdd}>
        {thingsToBuy.map((item, index) => (
          <div key={index} className={styles.multiInput}>
            <input
              type='text'
              placeholder='Item Heading'
              value={item.heading}
              onChange={(e) => handleChange(index, thingsToBuy, { heading: e.target.value }, setThingsToBuy)}
            />
            <textarea
              placeholder='Item Description'
              value={item.description}
              onChange={(e) => handleChange(index, thingsToBuy, { description: e.target.value }, setThingsToBuy)}
            />
            {thingsToBuy.length > 1 && (
              <button
                type='button'
                onClick={() => handleFieldChange('remove', thingsToBuy, index, setThingsToBuy)}
              >
                Delete
              </button>
            )}
            <button
              type='button'
              onClick={() => handleFieldChange('add', thingsToBuy, null, setThingsToBuy)}
            >
              Add+
            </button>
          </div>
        ))}

      </div>

      {/* Conclusion */}
      <h1>Conclusion</h1>
      <div className={styles.formdata}>
        <label htmlFor='conclusion'>Conclusion</label>
        <textarea
          id='conclusion'
          style={{ width: '65%' }}
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          required
        />
      </div>

      {/* Dynamic fields: Urls */}
      <h1>Urls</h1>
      <div className={styles.formdataAdd}>
        {urls.map((url, index) => (
          <div key={index} className={styles.multiInput}>
            <input
              type='text'
              placeholder='Url'
              value={url.url}
              onChange={(e) => handleChange(index, urls, { url: e.target.value }, setUrls)}
            />
            <textarea
              placeholder='Description'
              value={url.description}
              onChange={(e) => handleChange(index, urls, { description: e.target.value }, setUrls)}
            />
            {urls.length > 1 && (
              <button
                type='button'
                onClick={() => handleFieldChange('remove', urls, index, setUrls)}
              >
                Delete
              </button>
            )}
            <button
              type='button'
              onClick={() => handleFieldChange('add', urls, null, setUrls)}
            >
              Add+
            </button>
          </div>
        ))}
      </div>
      <div className={styles.button}>
        <button type='submit' className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  )
}
