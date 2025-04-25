import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './TripReview.module.css'
import Train from './Components/Train';
import CityMap from "../../../components/CityMap/CityMap";
import Restaurants from './Components/Restaurants';
import Hotels from "./Components/Hotels.jsx";
export default function TripReview() {
    const { from, to } = useParams();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    useEffect(() => {
        fetch(`https://maps-data.p.rapidapi.com/geocoding.php?query=${to}&lang=en&country=fr`, {
            method: "Post",
            headers: {
                "x-rapidapi-key": "732f7b9f89mshaaa0c84a58e8176p1ff2abjsn15cd24fe7292",
                "x-rapidapi-host": "maps-data.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
                if (data?.data?.lat && data?.data?.lng) {
                    setLatitude(data.data.lat);
                    setLongitude(data.data.lng);
                } else {
                    console.warn("No valid lat/lng data found.");
                }
            })
            .catch(error => console.error("Error:", error));
    }, [to]);

    const DistanceMapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&origin=${from}&destination=${to}`;
    const cityMapurl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&center=${latitude},${longitude}&zoom=12`;
    const navList = ['Trains', 'Flights', 'Places To Vist', 'Hotels'];
    const [activeTab, setActiveTab] = useState('Trains');
    const urls = "https://www.google.com/maps/place/data=!3m1!4b1!4m2!3m1!1s0x3970b9002587de51:0x7e8a61624913d6a8";
    function handleSearch(item) {
        setActiveTab(item);
    }
    return (
        <div className={styles.TripReview}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.heading}>
                        <h1>{to}</h1>
                        <p>Jaipur is a truly incredible destination. A visit to the Pink City will reveal its magnificent palaces, temples and parks, and is not complete without taking a ride in a horse-drawn carriage through the winding streets of the old walled city. Soak in Jaipur’s rich cultural landscape, with its famed handicrafts stalls and vibrant markets bursting with life.</p>
                        <div className={styles.btn}>
                            <button className='glow-on-hover'>Know More About {to}</button>
                        </div>
                    </div>
                    <div className={styles.navbar}>
                        <nav>
                            <ul>
                                {navList.map((item, index) => (
                                    <li onClick={() => handleSearch(item)} key={index}>{item}</li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className={styles.train}>
                        {activeTab === 'Trains' && <Train latitude={latitude} longitude={longitude} />}
                        {activeTab === 'Flights' && <h1>Flights</h1>}
                        {activeTab === 'Places To Vist' && <h1>Places To Vist</h1>}
                        {activeTab === 'Hotels' && <Hotels city={to} />}
                        {activeTab === 'Restaurants' && <Restaurants latitude={latitude} longitude={longitude} />}

                    </div>
                </div>

                <div className={styles.containerRight}>
                    <h2>Location Map</h2>
                    <iframe
                        title="City Map"
                        width="100%"
                        height="700px%"
                        style={{ border: 0, borderRadius: "10px" }}
                        loading="lazy"
                        allowFullScreen
                        src={DistanceMapUrl}
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
