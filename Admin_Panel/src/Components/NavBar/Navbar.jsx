import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();  
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1]; // Extract the part of the URL after the '/'
    if (path) {
      setActiveButton(path.charAt(0).toUpperCase() + path.slice(1)); 
    }
  }, [location]); // Re-run when location changes

 
  const handleButtonClick = (label) => {
    setActiveButton(label);
    navigate(`/${label}`); // Navigate to the URL
  };

  return (
    <div className={styles.nav}>
      <div className={styles.logo} onClick={() => navigate('/Home')} >
        <h1><img width={30} src="https://codervent.com/maxton/demo/horizontal-menu/assets/images/logo-icon.png" alt="" />Trip Planner</h1>
        <p>Admin Panel</p>
      </div>
      <div className={styles.buttons}>
        {['Home', 'Dashboard', 'Cities', 'Hotels', 'Restaurants', 'Places'].map((label, index) => (
          <button
            key={index}
            className={activeButton === label ? styles.activeButton : ''}
            onClick={() => handleButtonClick(label)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
