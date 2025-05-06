import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchPlace() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch all places when the component mounts
    const fetchPlaces = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/get-place-data');
        setPlaces(response.data || []);
        setFilteredPlaces(response.data || []);
      } catch (error) {
        console.error('Failed to fetch places:', error);
      }
    };

    fetchPlaces();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    const filtered = places.filter(place =>
      place.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPlaces(filtered);
  };

  const handleSelect = (name) => {
    setQuery(name);

    setShowDropdown(false);
  };

  return (
    <div style={{ width: '80%', margin: '20px auto', position: 'relative' }}>
      <input
        type="text"
        placeholder="Search places..."
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
    {filteredPlaces.length > 0 ? (
      filteredPlaces.map((place, index) => (
        <li
        key={index}
        onClick={() => navigate(`/place/${place.name}`)}
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
          src={place?.urls?.[0] || '/placeholder.jpg'}
          width="30"
          height="30"
          alt={place.name}
          style={{
            objectFit: 'cover',
            borderRadius: '4px',
            flexShrink: 0
          }}
        />
        <span style={{ fontFamily: 'var(--ta-Raleway)' }}>
          {place.name}, {place.city}
        </span>
      </li>
      
      ))
    ) : (
      <li style={{ padding: '8px', color: '#888' }}>
        Place not found
      </li>
    )}
  </ul>
)}

    </div>
  );
}
