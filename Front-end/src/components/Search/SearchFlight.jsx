import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchFlight.module.css';
import airportCodesData from './airportCodes.json';
import { FlightCard } from './FlightCard'; // Import the FlightCard component

export default function SearchFlight() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [flightClass, setFlightClass] = useState('E');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [airportList, setAirportList] = useState([]);
  const [filteredFromAirports, setFilteredFromAirports] = useState([]);
  const [filteredToAirports, setFilteredToAirports] = useState([]);
  const [fromInputValue, setFromInputValue] = useState('');
  const [toInputValue, setToInputValue] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  useEffect(() => {
    setAirportList(airportCodesData.airports);

    const handleClickOutside = (event) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterAirports = (input, setFiltered) => {
    const term = input.toLowerCase();
    const filtered = airportList.filter(a =>
      a.name.toLowerCase().includes(term) || a.code.toLowerCase().includes(term)
    );
    setFiltered(filtered);
  };

  const handleFromChange = (e) => {
    const val = e.target.value;
    setFromInputValue(val);
    filterAirports(val, setFilteredFromAirports);
    setShowFromDropdown(true);
  };

  const handleToChange = (e) => {
    const val = e.target.value;
    setToInputValue(val);
    filterAirports(val, setFilteredToAirports);
    setShowToDropdown(true);
  };

  const selectFromAirport = (airport) => {
    setFrom(airport.code);
    setFromInputValue(`${airport.name} | ${airport.code}`);
    setShowFromDropdown(false);
  };

  const selectToAirport = (airport) => {
    setTo(airport.code);
    setToInputValue(`${airport.name} | ${airport.code}`);
    setShowToDropdown(false);
  };

  const searchFlights = async () => {
    if (!from || !to || !departDate || !adults) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/flights', {
        params: {
          from,
          to,
          departDate,
          adults,
          children,
          infants,
          flightClass
        }
      });
      setFlights(res.data);
      console.log('Flights:', res.data);
    } catch (err) {
      console.error('Flight search error:', err);
      alert('Failed to fetch flight data. Try again later.');
    }
    setLoading(false);
  };

  loading && <p className={styles.loadingText}>Loading...</p>


  return (
    <div className={styles.container}>

      <h2 className={styles.searchTitle}>Search Flights</h2>
      <div className={styles.form}>

        {/* From Airport */}
        <div className={styles.dropdownContainer} ref={fromDropdownRef}>
          <input
            type="text"
            placeholder="From Airport"
            value={fromInputValue}
            onChange={handleFromChange}
            onFocus={() => {
              filterAirports(fromInputValue, setFilteredFromAirports);
              setShowFromDropdown(true);
            }}
            className={styles.inputField}
          />
          {showFromDropdown && (
            <div className={styles.dropdownMenu}>
              {filteredFromAirports.map((airport, idx) => (
                <div key={idx} onClick={() => selectFromAirport(airport)} className={styles.dropdownItem}>
                  {airport.name} | {airport.code}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* To Airport */}
        <div className={styles.dropdownContainer} ref={toDropdownRef}>
          <input
            type="text"
            placeholder="To Airport"
            value={toInputValue}
            onChange={handleToChange}
            onFocus={() => {
              filterAirports(toInputValue, setFilteredToAirports);
              setShowToDropdown(true);
            }}
            className={styles.inputField}
          />
          {showToDropdown && (
            <div className={styles.dropdownMenu}>
              {filteredToAirports.map((airport, idx) => (
                <div key={idx} onClick={() => selectToAirport(airport)} className={styles.dropdownItem}>
                  {airport.name} | {airport.code}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className={styles.inputField}
        />

        {/* Passengers */}
        <div>
          <label htmlFor="">Adults </label>
          <input
            type="number"
            min={1}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            placeholder="Adults"
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="">Childrens </label>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            placeholder="Children"
            className={styles.inputField}
          />
        </div>
        <div>
          <label htmlFor="">Infants </label>
          <input
            type="number"
            min={0}
            value={infants}
            onChange={(e) => setInfants(Number(e.target.value))}
            placeholder="Infants"
            className={styles.inputField}
          />
        </div>

        {/* Flight Class */}
        <select value={flightClass} onChange={(e) => setFlightClass(e.target.value)} className={styles.selectField}>
          <option value="E">Economy</option>
          <option value="P">Premium Economy</option>
          <option value="B">Business</option>
        </select>

        <button onClick={searchFlights} className={styles.searchButton}>
          Search Flights
        </button>
      </div>
      {loading ? (
        <div>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      ) : (
        flights.length > 0 && (
          <div className={styles.results}>
            <h3>Available Flights</h3>
            {flights.map((flight, idx) => (
              <FlightCard key={idx} flight={flight} from={from} to={to} />
            ))}
          </div>
        )
      )}
    </div>
  );
}