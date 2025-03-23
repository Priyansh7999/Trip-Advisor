import React, { useState } from 'react';
import styles from './AddCityDetails.module.css';

const AddCityDetails = () => {
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

  // Conclusion
  const [conclusion, setConclusion] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cityDetails = {
      cityName,
      description,
      bestTime,
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
      attractions,
      hotels,
      foodToTry,
      thingsToBuy,
      conclusion,
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
      console.log('City Details Submitted:', data);
    } catch (error) {
      console.error('Error submitting city details:', error);
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
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Best Time to Visit */}
        <div className={styles.formGroup}>
          <label htmlFor='bestTime'>Best Time to Visit</label>
          <input
            type='text'
            id='bestTime'
            value={bestTime}
            onChange={(e) => setBestTime(e.target.value)}
            required
          />
        </div>
        
        {/* Peak Season */}
        <div className='form-group'>
          <label htmlFor='peakSeasonStart'>Peak Season Start</label>
          <input
            type='date'
            id='peakSeasonStart'
            value={peakSeasonStart}
            onChange={(e) => setPeakSeasonStart(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='peakSeasonEnd'>Peak Season End</label>
          <input
            type='date'
            id='peakSeasonEnd'
            value={peakSeasonEnd}
            onChange={(e) => setPeakSeasonEnd(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='peakSeasonDesc'>Peak Season Description</label>
          <textarea
            id='peakSeasonDesc'
            value={peakSeasonDesc}
            onChange={(e) => setPeakSeasonDesc(e.target.value)}
            required
          />
        </div>

        {/* Moderate Season */}
        <div className='form-group'>
          <label htmlFor='moderateSeasonStart'>Moderate Season Start</label>
          <input
            type='date'
            id='moderateSeasonStart'
            value={moderateSeasonStart}
            onChange={(e) => setModerateSeasonStart(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='moderateSeasonEnd'>Moderate Season End</label>
          <input
            type='date'
            id='moderateSeasonEnd'
            value={moderateSeasonEnd}
            onChange={(e) => setModerateSeasonEnd(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='moderateSeasonDesc'>Moderate Season Description</label>
          <textarea
            id='moderateSeasonDesc'
            value={moderateSeasonDesc}
            onChange={(e) => setModerateSeasonDesc(e.target.value)}
            required
          />
        </div>

        {/* Off Season */}
        <div className='form-group'>
          <label htmlFor='offSeasonStart'>Off Season Start</label>
          <input
            type='date'
            id='offSeasonStart'
            value={offSeasonStart}
            onChange={(e) => setOffSeasonStart(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='offSeasonEnd'>Off Season End</label>
          <input
            type='date'
            id='offSeasonEnd'
            value={offSeasonEnd}
            onChange={(e) => setOffSeasonEnd(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='offSeasonDesc'>Off Season Description</label>
          <textarea
            id='offSeasonDesc'
            value={offSeasonDesc}
            onChange={(e) => setOffSeasonDesc(e.target.value)}
            required
          />
        </div>

        {/* Overview Details */}
        <div className='form-group'>
          <label htmlFor='cityTitle'>City Title</label>
          <input
            type='text'
            id='cityTitle'
            value={cityTitle}
            onChange={(e) => setCityTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='cityHistory'>City History</label>
          <textarea
            id='cityHistory'
            value={cityHistory}
            onChange={(e) => setCityHistory(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='state'>State</label>
          <input
            type='text'
            id='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='touristPlaces'>Tourist Places</label>
          <textarea
            id='touristPlaces'
            value={touristPlaces}
            onChange={(e) => setTouristPlaces(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='famousFor'>Famous For</label>
          <input
            type='text'
            id='famousFor'
            value={famousFor}
            onChange={(e) => setFamousFor(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='weather'>Weather</label>
          <textarea
            id='weather'
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            required
          />
        </div>

        {/* How to Reach */}
        <div className='form-group'>
          <label htmlFor='byAir'>By Air</label>
          <textarea
            id='byAir'
            value={byAir}
            onChange={(e) => setByAir(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='byRail'>By Rail</label>
          <textarea
            id='byRail'
            value={byRail}
            onChange={(e) => setByRail(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='byRoad'>By Road</label>
          <textarea
            id='byRoad'
            value={byRoad}
            onChange={(e) => setByRoad(e.target.value)}
            required
          />
        </div>

        {/* Attractions */}
        <div className='form-group'>
          <label htmlFor='attractions'>Attractions</label>
          <textarea
            id='attractions'
            value={attractions}
            onChange={(e) => setAttractions(e.target.value)}
            required
          />
        </div>

        {/* Hotels */}
        <div className='form-group'>
          <label htmlFor='hotels'>Hotels</label>
          <textarea
            id='hotels'
            value={hotels}
            onChange={(e) => setHotels(e.target.value)}
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

        {/* Famous Restaurants */}
        {/* <div className='form-group'>
          <label htmlFor='famousRestaurants'>Famous Restaurants</label>
          <textarea
            id='famousRestaurants'
            value={fa}
            onChange={(e) => setFamousRestaurants(e.target.value)}
            required
          />
        </div> */}

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
            value={conclusion}
            onChange={(e) => setConclusion(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className={styles.formGroup}>
          <button type='submit' className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddCityDetails;
