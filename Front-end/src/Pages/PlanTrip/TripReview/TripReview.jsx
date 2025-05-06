import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './TripReview.module.css'
import Train from './Components/Train';
import HotelList from '../../../components/HotelsList/HotelList.jsx';
import PlaceToVisitList from '../../../components/PlaceToVisitList/PlaceToVisitList.jsx';
import Flight from './Components/Flight.jsx';

export default function TripReview() {
    const navigate = useNavigate();
    const { from, to } = useParams();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [cityData, setCityData] = useState(null);

    useEffect(() => {
        // Fetch city data from our backend API instead of external API
        fetch(`http://localhost:5000/get-city/${to}`)
            .then(response => response.json())
            .then(data => {
                // Set city data state
                setCityData(data);
                
                // Extract latitude and longitude if available
                if (data?.lat && data?.lng) {
                    setLatitude(data.lat);
                    setLongitude(data.lng);
                } else {
                    console.warn("No valid lat/lng data found in the response.");
                }
            })
            .catch(error => console.error("Error fetching city data:", error));
    }, [to]);

    const formattedto = to.charAt(0).toUpperCase() + to.slice(1);

    const DistanceMapUrl = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&origin=${from}&destination=${to}`;
    const cityMapurl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&center=${latitude},${longitude}&zoom=12`;
    const navList = ['Places To Vist', 'Hotels', 'Trains', 'Flights'];
    const [activeTab, setActiveTab] = useState('Places To Vist');

    function handleSearch(item) {
        setActiveTab(item);
    }

    return (
        <div className={styles.TripReview}>
            <div className={styles.container}>
                <div className={styles.containerLeft}>
                    <div className={styles.heading}>
                        <h1>{to}</h1>
                        <p>
                            {cityData?.description}
                        </p>
                        <div className={styles.btn}>
                            <button className='glow-on-hover' onClick={() => navigate(`/city/${formattedto}`)}>Know More About {to}</button>
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
                        {activeTab === 'Trains' && <Train />}
                        {activeTab === 'Flights' && <Flight />}
                        {activeTab === 'Places To Vist' && <PlaceToVisitList cityname={to} />}
                        {activeTab === 'Hotels' && <HotelList cityname={to}/>}
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