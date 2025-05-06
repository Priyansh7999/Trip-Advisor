import React from 'react';
import styles from './SearchFlight.module.css';

export const FlightCard = ({ flight, from, to }) => {
  return (
    <div className={styles.flightCard}>
      {/* Main flight information */}
      <div className={styles.flightContent}>
        {/* Airline info */}
        <div className={styles.airlineInfo}>
          <div className={styles.airlineName}>{flight.airline}</div>
        </div>
        
        {/* Departure info */}
        <div className={styles.departureInfo}>
          <div className={styles.departureTime}>
            {flight.departureTime.split(' ')[0]}
            <span className={styles.timeAmPm}>{flight.departureTime.split(' ')[1]}</span>
          </div>
          <div className={styles.cityName}>{from}</div>
        </div>
        
        {/* Duration info */}
        <div className={styles.durationInfo}>
          <span className={styles.duration}>— {flight.duration}</span>
        </div>
        
        {/* Arrival info */}
        <div className={styles.arrivalInfo}>
          <div className={styles.departureTime}>
            {flight.arrivalTime.split(' ')[0]}
            <span className={styles.timeAmPm}>{flight.arrivalTime.split(' ')[1]}</span>
          </div>
          <div className={styles.cityName}>{to}</div>
        </div>
        
        {/* Price info */}
        <div className={styles.priceInfo}>
          <span>₹</span>{Number(flight.price).toLocaleString()}
        </div>
        
        {/* Button container */}
        <div className={styles.buttonContainer}>
          <button className={styles.viewFareButton} ><a href='https://www.cleartrip.com/flights' target='_blank' style={{color:'white', textDecoration:'none'}}>Book Now</a></button>
        </div>
      </div>
    </div>
  );
};