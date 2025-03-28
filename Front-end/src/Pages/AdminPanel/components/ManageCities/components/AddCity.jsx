import React, { useState } from 'react'
import styles from './AddCity.module.css';

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
  
    // How to reach details
    const [byAir, setByAir] = useState('');
    const [byRail, setByRail] = useState('');
    const [byRoad, setByRoad] = useState('');
  
    const [attractions, setAttractions] = useState('');
    const [hotels, setHotels] = useState('');
  
    // Food to Try: dynamic fields
    const [foodToTry, setFoodToTry] = useState([{ name: '', description: '' }]);
    // Conclusion
    const [conclusion, setConclusion] = useState('');
    const [review, setReview] = useState(['']);
    const handleFoodChange = (index, field, value) => {
      const updatedFoodToTry = [...foodToTry];
      updatedFoodToTry[index][field] = value;
      setFoodToTry(updatedFoodToTry);
    };
  
    const addFoodItem = () => {
      setFoodToTry([...foodToTry, { name: '', description: '' }]);
    };
  
    // Things to Buy: dynamic fields
    const [thingsToBuy, setThingsToBuy] = useState([{ heading: '', description: '' }]);
  
    const handleThingsToBuyChange = (index, field, value) => {
      const updatedThingsToBuy = [...thingsToBuy];
      updatedThingsToBuy[index][field] = value;
      setThingsToBuy(updatedThingsToBuy);
    };
  
    const addThingToBuy = () => {
      setThingsToBuy([...thingsToBuy, { heading: '', description: '' }]);
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
        attractions: JSON.stringify(attractions || []),
        hotels: JSON.stringify(hotels || []),
        foodToTry: JSON.stringify(foodToTry || []),
        thingsToBuy: JSON.stringify(thingsToBuy || []),
        placeTypes: JSON.stringify(selectedPlaceTypes || []),
        conclusion,
        reviews: JSON.stringify(review || [])
      };
    
      try {
        const response = await fetch('http://localhost:7000/submit-city-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cityDetails),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('✅ City Details Submitted:', data);
      } catch (error) {
        console.error('❌ Error submitting city details:', error);
      }
    };
       
    
    return (
      <div className={styles.addCityContainer}>
        <h1>Add City Details</h1>
        <form onSubmit={handleSubmit}>
          {/* City Name */}
          <div className={styles.formGroup}>
            <label htmlFor='cityName'>City Name</label>
            <input
              type='text'
              id='cityName'
              value={cityName}
              style={{ width: '25%' }}
              onChange={(e) => setCityName(e.target.value)}
              required
            />
          </div>
  
          {/* Description */}
          <div className={styles.formGroup}>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              value={description}
              style={{ width: '65%' }}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Latitude & Longitude */}
        <div className={styles.formGroup}>
          <label>Latitude</label>
          <input type='text' style={{ width: '10%' }} value={latitude} onChange={(e) => setLatitude(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label>Longitude</label>
          <input type='text' style={{ width: '10%' }} value={longitude} onChange={(e) => setLongitude(e.target.value)} required />
        </div>
  
          {/* Best Time to Visit */}
          <div className={styles.formGroup}>
            <label htmlFor='bestTime'>Best Time to Visit</label>
            <input
              type='text'
              id='bestTime'
              value={bestTime}
              style={{ width: '65%' }}
              onChange={(e) => setBestTime(e.target.value)}
              required
            />
          </div>
          

        {/* Season Selection */}
        {['Peak', 'Moderate', 'Off'].map((season, index) => (
          <div key={index} className={styles.formGroup}>
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

         {/* Type of Place */}
         <div className={styles.checkBoxGroup}>
          <label>Type of Place</label>
          {placeTypes.map((type) => (
            <label key={type}>
              <input type="checkbox" checked={selectedPlaceTypes.includes(type)} onChange={() => handlePlaceTypeChange(type)} />
              {type}
            </label>
          ))}
        </div>
  
          {/* Overview Details */}
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='cityTitle'>City Title</label>
            <input
              type='text'
              id='cityTitle'
              value={cityTitle}
              style={{ width: '35%' }}
              onChange={(e) => setCityTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='cityHistory'>City History</label>
            <textarea
              id='cityHistory'
              style={{ width: '65%' }}
              value={cityHistory}
              onChange={(e) => setCityHistory(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='state'>State</label>
            <input
              type='text'
              id='state'
              value={state}
              style={{ width: '15%' }}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='touristPlaces'>Tourist Places</label>
            <input
              type='text'
              id='touristPlaces'
              value={touristPlaces}
              style={{ width: '65%' }}
              onChange={(e) => setTouristPlaces(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='famousFor'>Famous For</label>
            <input
              type='text'
              id='famousFor'
              style={{ width: '65%' }}
              value={famousFor}
              onChange={(e) => setFamousFor(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='weather'>Weather</label>
            <textarea
              id='weather'
              value={weather}
              style={{ width: '65%' }}
              onChange={(e) => setWeather(e.target.value)}
              required
            />
          </div>
  
          {/* How to Reach */}
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='byAir'>By Air</label>
            <textarea
              id='byAir'
              style={{ width: '65%' }}
              value={byAir}
              onChange={(e) => setByAir(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='byRail'>By Rail</label>
            <textarea
              id='byRail'
              value={byRail}
              style={{ width: '65%' }}
              onChange={(e) => setByRail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup} id='form-group'>
            <label htmlFor='byRoad'>By Road</label>
            <textarea
              style={{ width: '65%' }}
              id='byRoad'
              value={byRoad}
              onChange={(e) => setByRoad(e.target.value)}
              required
            />
          </div>
  

  
          {/* Food to Try - Dynamic Fields */}
          <div className={styles.formGroup}>
            <label>Food to Try</label>
            {foodToTry.map((food, index) => (
              <div key={index} className={styles.foodItem}>
                <input
                  type='text'
                  
                  placeholder='Food Name'
                  value={food.name}
                  onChange={(e) => handleFoodChange(index, 'name', e.target.value)}
                  required
                />
                <textarea
                  placeholder='Food Description'
                  value={food.description}
                  onChange={(e) => handleFoodChange(index, 'description', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type='button' className={styles.addButton} onClick={addFoodItem}>
              Add+
            </button>
          </div>
  
          {/* Things to Buy - Dynamic Fields */}
          <div className={styles.formGroup}>
            <label>Things to Buy</label>
            {thingsToBuy.map((item, index) => (
              <div key={index} className={styles.itemToBuy}>
                <input
                  type='text'
                  placeholder='Item Heading'
                  value={item.heading}
                  onChange={(e) => handleThingsToBuyChange(index, 'heading', e.target.value)}
                  required
                />
                <textarea
                  placeholder='Item Description'
                  value={item.description}
                  onChange={(e) => handleThingsToBuyChange(index, 'description', e.target.value)}
                  required
                />
              </div>
            ))}
            <button type='button' className={styles.addButton} onClick={addThingToBuy}>
              Add+
            </button>
          </div>
          {/* Conclusion */}
          <div className={styles.formGroup}>
            <label htmlFor='conclusion'>Conclusion</label>
            <textarea
              id='conclusion'
              style={{ width: '65%' }}
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              required
            />
          </div>
  
          {/* Submit Button */}
          <div className={styles.button}>
            <button type='submit' className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };
  