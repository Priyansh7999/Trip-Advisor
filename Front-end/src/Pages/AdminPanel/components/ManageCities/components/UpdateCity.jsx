import React, { useState } from 'react';

export default function UpdateCity() {
    const [cityName, setCityName] = useState('');
    const [cityDetails, setCityDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchCity = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:7000/get-city-details/${cityName}`);
            if (!response.ok) {
                throw new Error('City not found or error fetching data');
            }
            const data = await response.json();
            setCityDetails(data);
            setError(null);
        } catch (err) {
            console.error('❌ Error fetching city details:', err);
            setError(err.message);
            setCityDetails(null);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Search City Details</h2>
            <form onSubmit={handleFetchCity}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    required
                    style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
                />
                <button type="submit" style={{ padding: '8px', width: '100%', cursor: 'pointer' }}>
                    Fetch City Details
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>❌ {error}</p>}

            {cityDetails && (
                <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                    <h3>{cityDetails.cityTitle}</h3>
                    <p><strong>State:</strong> {cityDetails.state}</p>
                    <p><strong>History:</strong> {cityDetails.cityHistory}</p>
                    <p><strong>Best Time to Visit:</strong> {cityDetails.bestTime}</p>
                    <p><strong>Tourist Places:</strong> {cityDetails.touristPlaces}</p>
                    <p><strong>Famous For:</strong> {cityDetails.famousFor}</p>
                    <p><strong>Weather:</strong> {cityDetails.weather}</p>
                </div>
            )}
        </div>
    );
}
