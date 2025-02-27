import React from 'react'
// import CityMap from '../../../components/CityMap/CityMap'
import { useParams } from 'react-router-dom'
import styles from './TripReview.module.css'

export default function TripReview() {
    const { from, to } = useParams();  // Extract parameters from the URL
    const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&origin=${from}&destination=${to}`;

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.heading}>
                        <h1>Jaipur</h1>
                        <p>Jaipur is a truly incredible destination. A visit to the Pink City will reveal its magnificent palaces, temples and parks, and is not complete without taking a ride in a horse-drawn carriage through the winding streets of the old walled city. Soak in Jaipur’s rich cultural landscape, with its famed handicrafts stalls and vibrant markets bursting with life.</p>
                    </div>
                </div>

                <div className={styles.containerRight}>
                    <iframe
                        title="City Map"
                        width="100%"
                        height="500"
                        style={{ border: 0, borderRadius: "10px" }}
                        loading="lazy"
                        allowFullScreen
                        src={mapUrl}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
