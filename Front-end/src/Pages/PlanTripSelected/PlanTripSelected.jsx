import { useParams } from 'react-router-dom';
import styles from "./WhereToSelected.module.css";
import AllCity from "../../components/CityList/AllCity";
import { TripPlannerContext } from '../../context';
import { useContext, useEffect, useState } from 'react';
import AllCitySkeleton from './AllCitySkeleton';

export default function PlanTripSelected() {
    const { TripCategory } = useContext(TripPlannerContext);
    const { placeName } = useParams(); // Get placeName from route
    const [filteredCities, setFilteredCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/get-city-data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({}) // if you need to send something in body, do it here
                });

                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();

                const matchedCities = data.filter(city =>
                    Array.isArray(city.placetypes) &&
                    city.placetypes.includes(placeName)
                );

                setFilteredCities(matchedCities);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching city list:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchCities();
    }, [placeName]);

    return (
        <div className="where-to-container" id='where-to-container'>
            <div className="place-card-content" id="place-card-content">
                <div className="where-to-header" id="where-to-header">
                    <img src={TripCategory?.image} alt="" />
                    <h1 className="where-to-title" id="where-to-title">{TripCategory?.name}</h1>
                    <p className="where-to-description" id="where-to-description">{TripCategory?.description}</p>
                </div>
            </div>
            <div className={styles["where-to-content"]} id="where-to-content">
                {loading || error ? (
                    <AllCitySkeleton />
                ) : (
                    <AllCity cities={filteredCities} navigate={null} />
                )}
            </div>
        </div>
    );
};
