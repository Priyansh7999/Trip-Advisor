import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchCity() {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/get-city-data');
        setCities(response.data || []);
        console.log('Fetched cities:', response.data);
        setFilteredCities(response.data || []);
      } catch (error) {
        console.error('Failed to fetch cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    setShowDropdown(true);

    const filtered = cities.filter(city =>
      city.cityname.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCities(filtered);
  };

  const handleSelect = (name) => {
    setQuery(name);
    navigate(`/city/${name}`);
    setShowDropdown(false);
  };


  return (
    <div style={{ width: '80%', margin: '20px auto', position: 'relative' }}>
      <input
        type="text"
        placeholder="Search cities..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        style={{ width: '100%', padding: '15px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
      />
      {showDropdown && query && (
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          border: '1px solid #ccc',
          borderTop: 'none',
          maxHeight: '200px',
          overflowY: 'auto',
          position: 'absolute',
          width: '100%',
          backgroundColor: '#fff',
          zIndex: 1000
        }}>
          {filteredCities.length > 0 ? (
            filteredCities.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSelect(city.cityname)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                  color: '#000',
                  backgroundColor: '#fff'
                }}
              >
                <img
                  src={city.urls[0]?.urls}
                  width="30"
                  height="30"
                  alt={city.cityname}
                  style={{ objectFit: 'cover', borderRadius: '4px' }}
                />
                {city.cityname}
              </li>

            ))
          ) : (
            <li style={{ padding: '8px', color: '#888' }}>
              City not found
            </li>
          )}
        </ul>
      )}

    </div>
  );
}
