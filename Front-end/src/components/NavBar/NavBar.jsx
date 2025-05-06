import React, { useEffect, useState } from 'react';
import './NavBar.css';
import logo from "../../assets/images.png"
import Authentication from '../Login-Signup-Form/Authentication';
import User from "../../assets/User.jpg"
const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isNavBlack, setIsNavBlack] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsNavBlack(true);
      } else {
        setIsNavBlack(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  function handleAuthentication() {
    setIsAuthOpen(!isAuthOpen);
  }

  return (
      <nav className={isNavBlack ? 'black' : 'navbar'}>
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className={`nav-links ${isMobile ? 'active' : ''}`}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/search">Search</a></li>
            <li><a href="/PlanTripCategory">Trip Category</a></li>
            <li><a href="/plantrip">Plan Trip</a></li>
            {/* <li onClick={handleAuthentication}><img src={User} alt="" width={30} height={30} style={{cursor: 'pointer', borderRadius: '100%'}} /></li> */}
            <li><a href="/login"><img src={User} alt="" width={30} height={30} style={{cursor: 'pointer', borderRadius: '100%'}} /></a></li>
          </ul>
        </div>
        <div className="toggle-button" onClick={toggleMenu}>
          <i className={`fa fa-bars fa-2x`}></i>
        </div>
      </div>

      {isAuthOpen && (
        <div className='overlay' onClick={handleAuthentication}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <Authentication />
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
