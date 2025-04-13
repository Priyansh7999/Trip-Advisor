import React, { useState, useEffect } from 'react';
import styles from './CityDetails.module.css'; // replace with your actual stylesheet

export default function UpdateCity() {
  const [cityName, setCityName] = useState('');
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState('');

  // Form state
  const [description, setDescription] = useState('');
  const [state, setState] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [bestTime, setBestTime] = useState('');
  const [peakSeasonStart, setPeakSeasonStart] = useState('');
  const [peakSeasonEnd, setPeakSeasonEnd] = useState('');
  const [peakSeasonDesc, setPeakSeasonDesc] = useState('');
  const [moderateSeasonStart, setModerateSeasonStart] = useState('');
  const [moderateSeasonEnd, setModerateSeasonEnd] = useState('');
  const [moderateSeasonDesc, setModerateSeasonDesc] = useState('');
  const [offSeasonStart, setOffSeasonStart] = useState('');
  const [offSeasonEnd, setOffSeasonEnd] = useState('');
  const [offSeasonDesc, setOffSeasonDesc] = useState('');
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState([]);
  const [cityTitle, setCityTitle] = useState('');
  const [cityHistory, setCityHistory] = useState('');
  const [touristPlaces, setTouristPlaces] = useState('');
  const [famousFor, setFamousFor] = useState('');
  const [weather, setWeather] = useState('');
  const [byAir, setByAir] = useState('');
  const [byRail, setByRail] = useState('');
  const [byRoad, setByRoad] = useState('');
  const [foodToTry, setFoodToTry] = useState([]);
  const [thingsToBuy, setThingsToBuy] = useState([]);
  const [conclusion, setConclusion] = useState('');
  const [urls, setUrls] = useState([]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const handlePlaceTypeChange = (type) => {
    setSelectedPlaceTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const fetchCityData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/get-city/${cityName}`);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setCityData(data);
      console.log('Received city details:', data);
      setError('');
    } catch (err) {
      setError("City not found or error fetching data");
      setCityData(null);
    }
  };

  useEffect(() => {
    if (cityData) {
      setDescription(cityData.description || '');
      setState(cityData.overview?.state || '');
      setLatitude(cityData.latitude || '');
      setLongitude(cityData.longitude || '');
      setBestTime(cityData.besttime || '');

      setPeakSeasonStart(cityData.peakseason?.start || '');
      setPeakSeasonEnd(cityData.peakseason?.end || '');
      setPeakSeasonDesc(cityData.peakseason?.description || '');

      setModerateSeasonStart(cityData.moderateseason?.start || '');
      setModerateSeasonEnd(cityData.moderateseason?.end || '');
      setModerateSeasonDesc(cityData.moderateseason?.description || '');

      setOffSeasonStart(cityData.offseason?.start || '');
      setOffSeasonEnd(cityData.offseason?.end || '');
      setOffSeasonDesc(cityData.offseason?.description || '');

      // setSelectedPlaceTypes(JSON.parse(cityData.placetypes || '[]'));

      setCityTitle(cityData.overview?.cityTitle || '');
      setCityHistory(cityData.overview?.cityHistory || '');
      setTouristPlaces(cityData.overview?.touristPlaces || '');
      setFamousFor(cityData.overview?.famousFor || '');
      setWeather(cityData.overview?.weather || '');

      setByAir(cityData.howtoreach?.byAir || '');
      setByRail(cityData.howtoreach?.byRail || '');
      setByRoad(cityData.howtoreach?.byRoad || '');
      setConclusion(cityData.conclusion || '');

      setSelectedPlaceTypes(
        Array.isArray(cityData.placetypes)
          ? cityData.placetypes
          : JSON.parse(cityData.placetypes || '[]')
      );

      setFoodToTry(
        Array.isArray(cityData.foodtotry)
          ? cityData.foodtotry
          : JSON.parse(cityData.foodtotry || '[]')
      );

      setThingsToBuy(
        Array.isArray(cityData.thingstobuy)
          ? cityData.thingstobuy
          : JSON.parse(cityData.thingstobuy || '[]')
      );

      setUrls(
        Array.isArray(cityData.urls)
          ? cityData.urls
          : JSON.parse(cityData.urls || '[]')
      );

    }
  }, [cityData]);

  const handleCityFetch = (e) => {
    e.preventDefault();
    if (cityName.trim()) {
      fetchCityData();
    }
  };
  const handleDelete = async (cityName) => {

    try {
      const res = await fetch(`http://localhost:5000/delete-city/${cityName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
      alert(data.message || data.error);
  
      if (data.message) {
        // Clear form fields
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
  
      console.log('City deleted:', data);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };
  

  const handleUpdateSubmit = async (cityName) => {

    const cityDetails = {
      cityName,
      description,
      bestTime,
      latitude,
      longitude,
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
      foodToTry,
      thingsToBuy,
      placeTypes: selectedPlaceTypes,
      conclusion,
      urls,
      reviews: [],
    };

    try {
      const res = await fetch(`http://localhost:5000/update-city/${cityName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cityDetails),
      });
      const data = await res.json();
      alert(data.message || data.error);
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
  
      console.log('City updated:', data);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };
  const handleChange = (index, array, updatedValue, setArray) => {
    const updatedArray = array.map((item, i) =>
      i === index ? { ...item, ...updatedValue } : item
    );
    setArray(updatedArray);
  };
  const handleFieldChange = (action, array, index, setArray) => {
    if (action === 'add') {
      const newItem = array.length > 0
        ? Object.fromEntries(Object.keys(array[0]).map((k) => [k, '']))
        : {};
      setArray([...array, newItem]);
    } else if (action === 'remove') {
      const updatedArray = array.filter((_, i) => i !== index);
      setArray(updatedArray);
    }
  };


  return (
    <div className={styles.container}>
      <h1>Update City</h1>
      <form onSubmit={handleCityFetch} className={styles.formInput}>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get City Details</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {cityData && (
        <div>
          <h1>Update City Info</h1>

          <div className={styles.formdata}>
            <label>City Name</label>
            <input value={cityName} onChange={(e) => setCityName(e.target.value)} />
          </div>


          <div className={styles.formdata}>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className={styles.formdata}>
            <label>State</label>
            <input value={state} onChange={(e) => setState(e.target.value)} />
          </div>
          <div className={styles.formdata}>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Enter City Description' />
          </div>
          <div className={styles.formdata}>
            <label>Latitude</label>
            <input value={latitude} onChange={(e) => setLatitude(e.target.value)} type="text" placeholder='Enter Latitude' />
            <label>Longitude</label>
            <input value={longitude} onChange={(e) => setLongitude(e.target.value)} type="text" placeholder='Enter Longitude' />
          </div>

          <h1>Time To Visit</h1>
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


          <h1>City Overview</h1>
          <div className={styles.cityoverview}>
            <div className={styles.formdata}>
              <label>City Title</label>
              <input
                value={cityTitle}
                onChange={(e) => setCityTitle(e.target.value)}
                type="text"
                placeholder="Enter City Title"
              />
            </div>

            <div className={styles.formdata}>
              <label>City History</label>
              <textarea
                value={cityHistory}
                onChange={(e) => setCityHistory(e.target.value)}
                placeholder="Enter City History"
              />
            </div>

            <div className={styles.formdata}>
              <label>Tourist Place To Visit</label>
              <input
                value={touristPlaces}
                onChange={(e) => setTouristPlaces(e.target.value)}
                type="text"
                placeholder="Tourist Place To Visit"
              />
            </div>

            <div className={styles.formdata}>
              <label>City Famous For</label>
              <input
                value={famousFor}
                onChange={(e) => setFamousFor(e.target.value)}
                type="text"
                placeholder="City Famous For"
              />
            </div>

            <div className={styles.formdata}>
              <label>Weather</label>
              <input
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                type="text"
                placeholder="Type Of Weather"
              />
            </div>
          </div>
          <h1>How To Reach</h1>
          <div className={styles.howtoreach}>
            <div className={styles.formdata}>
              <label htmlFor='byAir'>By Air</label>
              <textarea value={byAir} onChange={(e) => setByAir(e.target.value)} type="text" name="" id="byAir" placeholder='By Air' />
            </div>
            <div className={styles.formdata}>
              <label htmlFor='byAir'>By Train</label>
              <textarea value={byRail} onChange={(e) => setByRail(e.target.value)} type="text" name="" id="byTrain" placeholder='By Train' />
            </div>
            <div className={styles.formdata}>
              <label htmlFor='byAir'>By Road</label>
              <textarea value={byRoad} type="text" name="" onChange={(e) => setByRoad(e.target.value)} id="byRoad" placeholder='By Road' />
            </div>
          </div>
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
            <button onClick={()=>handleUpdateSubmit(cityName)} className={styles.submitButton}>Update</button>
          </div>
          <div className={styles.button}>
            <button onClick={()=>handleDelete(cityName)} className={styles.submitButton}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
