import React, { useState, useEffect, useRef } from 'react';
import styles from './PlanTripHomePage.module.css';
import bg from "../../../assets/PlanTripBg.avif";
import TravelGrid from '../../../components/TravelGrid/TravelGrid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PlanTripHomePage() {
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [cities, setCities] = useState([]);
  const [filteredFrom, setFilteredFrom] = useState([]);
  const [filteredTo, setFilteredTo] = useState([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const images = [ 
    {
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoVfdBjF0hH45KB5XigU-M93f9dibGKF8lzw&s",
    },
    {
        img:"https://images.unsplash.com/photo-1548013146-72479768bada?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWElMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D",
    },
    {
        img:"https://thumbs.dreamstime.com/b/red-fort-lal-qila-indian-flag-delhi-india-famous-travel-tourist-landmark-symbol-world-heritage-site-71309387.jpg",
    },
    {
        img:"https://wallpapercat.com/w/full/f/d/7/32675-1920x1200-desktop-hd-india-background.jpg",
    },
    {
        img:"https://static.toiimg.com/photo/msid-115020789,width-96,height-65.cms",
    },
    {
        img:"https://c0.wallpaperflare.com/preview/643/801/277/india-jaipur-hawa-mahal-city.jpg",
    },
    {
        img:"https://media.istockphoto.com/id/1362644903/photo/kailash-himalaya-mountain-slopes-at-narkanda-himachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=P5OiP9QnX29KjoXZ0YLRmU9pmAHuV1KIoRy4mdD44DY=",
    },
    {
        img:"https://t3.ftcdn.net/jpg/02/69/50/12/360_F_269501282_bUgK33oNPNNTqPK32XUtuydUn2yQRfps.jpg",
    },
    {
        img:"https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-kapaleeshwarar-temple.jpg",
    },
    {
        img:"https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-jahangiri-palace-agra.jpg",
    },
    {
        img:"https://www.planetware.com/wpimages/2020/01/india-in-pictures-beautiful-places-to-photograph-tea-plantations.jpg",
    },
    {
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2DnXQbMOEFd8aEXjPQ-59qFfVoMAIdwrvvA&s",
    }
];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/get-city-data');
        setCities(response.data || []);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCities();
  }, []);

  const filterCities = (value) =>
    cities.filter(city =>
      city.cityname.toLowerCase().includes(value.toLowerCase())
    );

  const handleFromChange = (e) => {
    const value = e.target.value;
    setFrom(value);
    setFilteredFrom(filterCities(value));
    setShowFromDropdown(true);
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setTo(value);
    setFilteredTo(filterCities(value));
    setShowToDropdown(true);
  };

  const handleSearch = () => {
    if (from && to) {
      navigate(`/plantrip/${from}/${to}`, { state: { from, to } });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={styles.header}>
        <img src={bg} alt="" className={styles.planTripBg} />
        <div className={styles.overlay}>
          <h1>Discover the best routes, must-visit places, and top spots to stay & dine—your ultimate travel guide!</h1>
        </div>
        <div className={styles.contentbox}>
          <div className={styles.content}>
            <label>Travel from</label>
            <div className={styles.inputGroup} ref={fromRef}>
              <input
                placeholder="From"
                value={from}
                onChange={handleFromChange}
                onFocus={() => setShowFromDropdown(true)}
              />
              {showFromDropdown && from && (
                <ul className={styles.dropdown}>
                  {filteredFrom.length > 0 ? (
                    filteredFrom.map((city, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setFrom(city.cityname);
                          setShowFromDropdown(false);
                        }}
                        className={styles.dropdownItem}
                      >
                        <img
                          src={city.urls?.[0]?.urls}
                          width="30"
                          height="30"
                          alt={city.cityname}
                          className={styles.cityImage}
                        />
                        <span>{city.cityname}</span>
                      </li>
                    ))
                  ) : (
                    <li className={styles.notFound}>City not found</li>
                  )}
                </ul>
              )}
            </div>

            <label>Travel to</label>
            <div className={styles.inputGroup} ref={toRef}>
              <input
                placeholder="To"
                value={to}
                onChange={handleToChange}
                onFocus={() => setShowToDropdown(true)}
              />
              {showToDropdown && to && (
                <ul className={styles.dropdown}>
                  {filteredTo.length > 0 ? (
                    filteredTo.map((city, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setTo(city.cityname);
                          setShowToDropdown(false);
                        }}
                        className={styles.dropdownItem}
                      >
                        <img
                          src={city.urls?.[0]?.urls}
                          width="30"
                          height="30"
                          alt={city.cityname}
                          className={styles.cityImage}
                        />
                        <span>{city.cityname}</span>
                      </li>
                    ))
                  ) : (
                    <li className={styles.notFound}>City not found</li>
                  )}
                </ul>
              )}
            </div>

            <button className="glow-on-hover" onClick={handleSearch}>Let's Plan</button>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.main1}>
          <h2>Your itinerary and your map in one view</h2>
          <p>No more switching between different apps, tabs, and tools to keep track of your travel plans.</p>
        </div>
        <div className={styles.main2}>
          <TravelGrid />
        </div>
        <div className={styles.main3}>
          <h2>Explore hundreds of places to visit for every corner of the world</h2>
          {
            images.map((image, index) => (
              <img key={index} src={image.img} alt={`Image ${index}`} />
            ))
          }
        </div>
      </div>
    </>
  );
}
