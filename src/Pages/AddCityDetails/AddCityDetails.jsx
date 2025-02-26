import React, { useState } from 'react';
import axios from 'axios';
import './AddCityDetails.css';

const AddCityDetails = () => {
  const [cityName, setCityName] = useState('');
  const [cityState, setCityState] = useState('');
  const [cityTitle, setCityTitle] = useState('');
  const [cityBriefDesc, setCityBriefDesc] = useState('');
  const [cityDetailedDesc, setCityDetailedDesc] = useState('');
  const [cityCategory, setCityCategory] = useState('');
  const [history, setHistory] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');
  const [peakSeason, setPeakSeason] = useState('');
  const [moderateSeason, setModerateSeason] = useState('');
  const [offSeason, setOffSeason] = useState('');
  const [region, setRegion] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const [averageTripLength, setAverageTripLength] = useState('');
  const [bestTimeToVisitCity, setBestTimeToVisitCity] = useState('');
  const [whenToVisitCity, setWhenToVisitCity] = useState('');
  const [howToReachByAir, setHowToReachByAir] = useState('');
  const [howToReachByRail, setHowToReachByRail] = useState('');
  const [howToReachByRoad, setHowToReachByRoad] = useState('');
  const [attractions, setAttractions] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [thingsToSeeAndDo, setThingsToSeeAndDo] = useState('');
  const [foodSpecialties, setFoodSpecialties] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newCityData = {
      cityName,
      cityState,
      cityTitle,
      cityBriefDesc,
      cityDetailedDesc,
      cityCategory,
      history,
      establishedYear,
      seasons: {
        peakSeason,
        moderateSeason,
        offSeason,
      },
      geographicalDetails: {
        region,
        latitude,
        longitude,
        location,
      },
      tripDetails: {
        averageTripLength,
        bestTimeToVisitCity,
        whenToVisitCity,
      },
      accessibility: {
        howToReachByAir,
        howToReachByRail,
        howToReachByRoad,
      },
      attractions,
      localEvents: festivals,
      experiences: {
        thingsToSeeAndDo,
        foodSpecialties,
      },
    };

    try {
      await axios.post('http://localhost:5000/api/cities', newCityData);
      alert('City added successfully!');
    } catch (error) {
      console.error('Error adding city:', error);
      alert('Failed to add city.');
    }
  };

  return (
    <div className="add-city-container">
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <h2>Add City Details</h2>

        <label htmlFor="cityName">City Name</label>
        <input
          type="text"
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          required
        />

        <label htmlFor="cityState">City State</label>
        <input
          type="text"
          id="cityState"
          value={cityState}
          onChange={(e) => setCityState(e.target.value)}
          required
        />

        <label htmlFor="cityTitle">City Title</label>
        <input
          type="text"
          id="cityTitle"
          value={cityTitle}
          onChange={(e) => setCityTitle(e.target.value)}
          required
        />

        <label htmlFor="cityBriefDesc">City Brief Description</label>
        <textarea
          id="cityBriefDesc"
          value={cityBriefDesc}
          onChange={(e) => setCityBriefDesc(e.target.value)}
          required
        />

        <label htmlFor="cityDetailedDesc">City Detailed Description</label>
        <textarea
          id="cityDetailedDesc"
          value={cityDetailedDesc}
          onChange={(e) => setCityDetailedDesc(e.target.value)}
          required
        />

        <label htmlFor="cityCategory">City Category</label>
        <input
          type="text"
          id="cityCategory"
          value={cityCategory}
          onChange={(e) => setCityCategory(e.target.value)}
          required
        />

        <label htmlFor="history">City History</label>
        <textarea
          id="history"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />

        <label htmlFor="establishedYear">Established Year</label>
        <input
          type="number"
          id="establishedYear"
          value={establishedYear}
          onChange={(e) => setEstablishedYear(e.target.value)}
        />

        <label htmlFor="peakSeason">Peak Season</label>
        <input
          type="text"
          id="peakSeason"
          value={peakSeason}
          onChange={(e) => setPeakSeason(e.target.value)}
        />

        <label htmlFor="moderateSeason">Moderate Season</label>
        <input
          type="text"
          id="moderateSeason"
          value={moderateSeason}
          onChange={(e) => setModerateSeason(e.target.value)}
        />

        <label htmlFor="offSeason">Off Season</label>
        <input
          type="text"
          id="offSeason"
          value={offSeason}
          onChange={(e) => setOffSeason(e.target.value)}
        />

        <label htmlFor="region">Region</label>
        <input
          type="text"
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <label htmlFor="latitude">Latitude</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />

        <label htmlFor="longitude">Longitude</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="averageTripLength">Average Trip Length</label>
        <input
          type="number"
          id="averageTripLength"
          value={averageTripLength}
          onChange={(e) => setAverageTripLength(e.target.value)}
        />

        <label htmlFor="bestTimeToVisitCity">Best Time To Visit City</label>
        <input
          type="text"
          id="bestTimeToVisitCity"
          value={bestTimeToVisitCity}
          onChange={(e) => setBestTimeToVisitCity(e.target.value)}
        />

        <label htmlFor="whenToVisitCity">When To Visit City</label>
        <input
          type="text"
          id="whenToVisitCity"
          value={whenToVisitCity}
          onChange={(e) => setWhenToVisitCity(e.target.value)}
        />

        <label htmlFor="howToReachByAir">How to Reach By Air</label>
        <input
          type="text"
          id="howToReachByAir"
          value={howToReachByAir}
          onChange={(e) => setHowToReachByAir(e.target.value)}
        />

        <label htmlFor="howToReachByRail">How to Reach By Rail</label>
        <input
          type="text"
          id="howToReachByRail"
          value={howToReachByRail}
          onChange={(e) => setHowToReachByRail(e.target.value)}
        />

        <label htmlFor="howToReachByRoad">How to Reach By Road</label>
        <input
          type="text"
          id="howToReachByRoad"
          value={howToReachByRoad}
          onChange={(e) => setHowToReachByRoad(e.target.value)}
        />

        <label htmlFor="attractions">City Attractions</label>
        <textarea
          id="attractions"
          value={attractions}
          onChange={(e) => setAttractions(e.target.value)}
        />

        <label htmlFor="festivals">Local Festivals</label>
        <textarea
          id="festivals"
          value={festivals}
          onChange={(e) => setFestivals(e.target.value)}
        />

        <label htmlFor="thingsToSeeAndDo">Things To See and Do</label>
        <textarea
          id="thingsToSeeAndDo"
          value={thingsToSeeAndDo}
          onChange={(e) => setThingsToSeeAndDo(e.target.value)}
        />

        <label htmlFor="foodSpecialties">Food Specialties</label>
        <textarea
          id="foodSpecialties"
          value={foodSpecialties}
          onChange={(e) => setFoodSpecialties(e.target.value)}
        />

        <button type="submit">Submit City Details</button>
      </form>
    </div>
  );
};

export default AddCityDetails;
