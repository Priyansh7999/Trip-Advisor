import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrendingSlider from '../../ui/TrendingSlider';
import "./Trending.css";
import SkeletonLoader from './SkeletonLoader';

export default function Trending() {
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setLoading(true);

        const [placesRes, citiesRes] = await Promise.all([
          fetch("http://localhost:5000/api/get-place-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }),
          fetch("http://localhost:5000/api/get-city-data", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        ]);

        const [placesData, citiesData] = await Promise.all([
          placesRes.json(),
          citiesRes.json()
        ]);

        setPlaces(placesData);
        setCities(citiesData);
      } catch (err) {
        console.error("Error fetching trending data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <>
      <div className='Trending-Container-city'>
        <div className='section-one'>
          <h2>FAMOUS DESTINATIONS</h2>
          <h3 style={{ textAlign: "center" }} className="sub">worth a thousand stories</h3>
          <p>These luxury India Cities are simply suggestions for the kind of holiday you might have. Yours will be tailored, altered, and refined until it matches you completely.</p>
        </div>
        <div className='section-two'>
          <TrendingSlider cards={cities.slice(0, 6)} text="city" />
        </div>
      </div>
      <div className='Trending-Container-places'>
        <div className='section-one'>
          <h2>FAMOUS ATTRACTIONS</h2>
          <h3 style={{ textAlign: "center" }} className="sub">Come And Fall In Love</h3>
          <p>These luxurious destinations in India are just a starting point for your dream getaway. Your journey will be personalized, customized, and fine-tuned to perfectly suit your preferences.</p>
        </div>
        <div className='section-two'>
          <TrendingSlider cards={places.slice(0, 6)} text="place" />
        </div>
      </div>
    </>
  );
}
