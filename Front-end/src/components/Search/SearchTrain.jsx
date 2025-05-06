import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchTrain.module.css';
// Import station codes directly
import stationCodesData from './stationCodes.json';

const SearchTrain = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // For station dropdown
  const [stations, setStations] = useState([]);
  const [filteredFromStations, setFilteredFromStations] = useState([]);
  const [filteredToStations, setFilteredToStations] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [fromInputValue, setFromInputValue] = useState('');
  const [toInputValue, setToInputValue] = useState('');
  
  const fromDropdownRef = useRef(null);
  const toDropdownRef = useRef(null);

  // Load station data
  useEffect(() => {
    // Use the imported station codes JSON file
    setStations(stationCodesData.stations);
    
    // Add click outside listener
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

  // Filter stations based on input
  const filterStations = (input, setFilteredStations) => {
    const searchTerm = input.toLowerCase();
    const filtered = stations.filter(station => 
      station.name.toLowerCase().includes(searchTerm) || 
      station.code.toLowerCase().includes(searchTerm)
    );
    setFilteredStations(filtered);
  };

  // Handle from station input changes
  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromInputValue(value);
    filterStations(value, setFilteredFromStations);
    setShowFromDropdown(true);
  };

  // Handle to station input changes
  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToInputValue(value);
    filterStations(value, setFilteredToStations);
    setShowToDropdown(true);
  };

  // Handle station selection
  const selectFromStation = (station) => {
    setFromInputValue(`${station.name} | ${station.code}`);
    setFrom(station.code);
    setShowFromDropdown(false);
  };

  const selectToStation = (station) => {
    setToInputValue(`${station.name} | ${station.code}`);
    setTo(station.code);
    setShowToDropdown(false);
  };

  const formatDate = (inputDate) => {
    if (!inputDate) return '';
    // Convert "YYYY-MM-DD" to "YYYYMMDD"
    return inputDate.replace(/-/g, '');
  };

  const searchTrains = async () => {
    setLoading(true);
    try {
      const formattedDate = formatDate(date);
      if (!from || !to || !formattedDate) {
        alert('Please enter From, To, and Date');
        setLoading(false);
        return;
      }
      
      const res = await axios.get('http://localhost:5000/api/trains', {
        params: { from, to, date: formattedDate }
      });
      setTrains(res.data);
      console.log('Trains data:', res.data);
    } catch (err) {
      console.error('Error fetching train data:', err);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <h2 className={styles.searchTitle}>Search Trains</h2>
        <div className={styles.formContainer}>
          {/* From Station Dropdown */}
          <div className={styles.dropdownContainer} ref={fromDropdownRef}>
            <input
              type="text"
              placeholder="From Station"
              value={fromInputValue}
              onChange={handleFromInputChange}
              onFocus={() => {
                filterStations(fromInputValue, setFilteredFromStations);
                setShowFromDropdown(true);
              }}
              className={styles.inputField}
            />
            {showFromDropdown && (
              <div className={styles.dropdownMenu}>
                {filteredFromStations.length > 0 ? (
                  filteredFromStations.map((station, index) => (
                    <div
                      key={index}
                      onClick={() => selectFromStation(station)}
                      className={styles.dropdownItem}
                    >
                      {station.name} | {station.code}
                    </div>
                  ))
                ) : (
                  <div className={styles.dropdownNoResults}>No stations found</div>
                )}
              </div>
            )}
          </div>

          {/* To Station Dropdown */}
          <div className={styles.dropdownContainer} ref={toDropdownRef}>
            <input
              type="text"
              placeholder="To Station"
              value={toInputValue}
              onChange={handleToInputChange}
              onFocus={() => {
                filterStations(toInputValue, setFilteredToStations);
                setShowToDropdown(true);
              }}
              className={styles.inputField}
            />
            {showToDropdown && (
              <div className={styles.dropdownMenu}>
                {filteredToStations.length > 0 ? (
                  filteredToStations.map((station, index) => (
                    <div
                      key={index}
                      onClick={() => selectToStation(station)}
                      className={styles.dropdownItem}
                    >
                      {station.name} | {station.code}
                    </div>
                  ))
                ) : (
                  <div className={styles.dropdownNoResults}>No stations found</div>
                )}
              </div>
            )}
          </div>

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className={styles.dateField}
          />
          <button 
            onClick={searchTrains} 
            className={styles.searchButton}
          >
            Search Trains
          </button>
        </div>
      </div>

      {loading ? <p className={styles.loadingText}>Loading...</p>:

      trains.length > 0 && (
        <div className={styles.trainsContainer}>
          <h3 className={styles.availableTrainsTitle}>Available Trains</h3>
          <div>
            {trains.map((train, idx) => (
              <div key={idx} className={styles.trainCard}>
                <div className={styles.trainHeader}>
                  <h2 className={styles.trainName}>
                    {train.trainName}
                    <span className={styles.trainNumber}>({train.trainNumber})</span>
                  </h2>
                  <div className={styles.runsOn}>
                    Runs on: <span className={styles.runsOnBold}>{train.runsOn}</span>
                  </div>
                </div>

                <div className={styles.journeyInfo}>
                  <div className={styles.departureInfo}>
                    <p className={styles.timeDisplay}>{train.departure.time}</p>
                    <p className={styles.dateDisplay}>{train.departure.date}</p>
                    <p className={styles.stationName}>{train.departure.station}</p>
                  </div>
                  
                  <div className={styles.duration}>------------------{train.duration}------------------</div>
                  
                  <div className={styles.arrivalInfo}>
                    <p className={styles.timeDisplay}>{train.arrival.time}</p>
                    <p className={styles.dateDisplay}>{train.arrival.date}</p>
                    <p className={styles.stationName}>{train.arrival.station}</p>
                  </div>
                </div>

                <div className={styles.classesContainer}>
                  {train.classes && train.classes.map((cls, clsIdx) => {
                    const isAvailable = cls.status.includes('AVBL');
                    const isWaitlist = cls.status.includes('WL');
                    const isTatkal = cls.className.includes('Tatkal') || clsIdx > 2;
                    
                    let cardClass = styles.classCard;
                    if (isAvailable) cardClass += ` ${styles.available}`;
                    if (isWaitlist) cardClass += ` ${styles.waitlist}`;
                    if (isTatkal) cardClass += ` ${styles.tatkal}`;
                    
                    let statusClass = styles.status;
                    if (isAvailable) statusClass += ` ${styles.available}`;
                    if (isWaitlist) statusClass += ` ${styles.waitlist}`;
                    
                    // Extract chance percentage if available (using regex)
                    const chanceMatch = cls.status.match(/(\d+)%/);
                    const chancePercentage = chanceMatch ? chanceMatch[1] : null;
                    
                    return (
                      <div key={clsIdx} className={cardClass}>
                        {isTatkal && <div className={styles.tatkalBadge}>Tatkal</div>}
                        <div className={styles.className}>
                          {cls.className}
                          <span className={styles.price}>{cls.price}</span>
                        </div>
                        <div className={styles.statusInfo}>
                          <span className={statusClass}>{cls.status}</span>
                          <span className={styles.updated}>{cls.updated}</span>
                        </div>
                        {chancePercentage && (
                          <div className={`${styles.chance} ${parseInt(chancePercentage) > 70 ? styles.chanceHigh : styles.chanceMedium}`}>
                            {chancePercentage}%<span className={styles.chanceLabel}>Chance</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                 
                </div>
                
                <div className={styles.bookButtonContainer}>
                  <button className={styles.viewRoute}>
                    <span className={styles.viewRouteIcon}>ℹ️</span>
                    <a href='https://www.irctc.co.in/nget/train-search' target="_blank" rel="noopener noreferrer">Book Now</a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchTrain;