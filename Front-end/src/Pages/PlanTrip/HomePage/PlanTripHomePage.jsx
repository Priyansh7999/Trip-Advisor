import React, { useState } from 'react'
import styles from './PlanTripHomePage.module.css';
import bg from "../../../assets/PlanTripBg.avif"
// import Trending from '../../../components/Trending/Trending';
import TravelGrid from '../../../components/TravelGrid/TravelGrid';
import { useNavigate } from 'react-router-dom';

export default function PlanTripHomePage() {
  const navigate = useNavigate();
  const  [from, setFrom] = useState('');
  const [ to, setTo] = useState('');
  
  function handleSearch() {
    navigate(`/plantrip/${from}/${to}`, { state: { from, to } });
  }
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
          <input
            placeholder='From'
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <label>Travel to</label>
          <input
            placeholder='To'
            type='text'
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <button className='glow-on-hover' onClick={handleSearch}>Let's Plan</button>
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
        <h2>Explore hundreds of places to visit
        for every corner of the world</h2> 
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
        <img src={bg} alt="" />
      </div>
    </div>
  </>
  )
}
