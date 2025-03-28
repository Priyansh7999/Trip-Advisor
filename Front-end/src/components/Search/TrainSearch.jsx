// TrainSearch.jsx
import React, { useState } from 'react';
import axios from 'axios';
import "./TrainSearch.css"
const TrainSearch = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [trainData, setTrainData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!from || !to) {
            setError('Please enter both "From" and "To" stations.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:7000/train-data`, {
                params: { from, to }
            });
            setTrainData(response.data);
        } catch (error) {
            setError('Error fetching train data.');
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="train-search-container">
        <div className='train-search-box'>
        <h1>Train Search</h1>
  
        <div className="input-container">
          <label htmlFor="from-station">From:</label>
          <input
            type="text"
            id="from-station"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter departure station"
          />
        </div>
  
        <div className="input-container">
          <label htmlFor="to-station">To:</label>
          <input
            type="text"
            id="to-station"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter arrival station"
          />
        </div>
  
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search Trains'}
        </button>
        </div>
        {trainData.length > 0 && (
  <div className="train-list">
    <h2>Available Trains</h2>
    {trainData.map((train, index) => (
      <div key={index} className="train-card">
        {/* Train Name & Number at Top Right */}
        <div className="train-header">
          <span>{train.trainName}</span>
          <span className="train-number">#{train.trainNumber}</span>
        </div>

        {/* Train Timings & Stations */}
        <div className="train-details">
          <div className="station">
            <p className="time">{train.departureTime}</p>
            <p>{train.departureStation}</p>
          </div>

          {/* Travel Time & Distance */}
          <div className="train-info">
            <p className="time">{train.travelTime}</p>
            <p>{train.travelDistance} km</p>
          </div>

          <div className="station">
            <p className="time">{train.arrivalTime}</p>
            <p>{train.arrivalStation}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

      </div>
    );
  };
  
  export default TrainSearch;