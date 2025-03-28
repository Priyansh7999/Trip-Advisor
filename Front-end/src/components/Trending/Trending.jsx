import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import TrendingSlider from '../../ui/TrendingSlider'; // Assuming FocusCard component is imported
import "./Trending.css";
import useFetch from "../../components/hooks/useFetch"
import SkeletonLoader from './SkeletonLoader';
export default function Trending() {
  const navigate = useNavigate();

  // Use the useFetch hook for fetching places and cities
  const { data: places, loading: placesLoading, error: placesError } = useFetch("http://localhost:7000/api/trendingplace");
  const { data: cities, loading: citiesLoading, error: citiesError } = useFetch("http://localhost:7000/api/trendingcity");

  if (placesLoading || citiesLoading || placesError || citiesError) {
    return <SkeletonLoader />
  }  
  return (
    <>
      <div className='Trending-Container-city'>
          <div className='section-one'>
            <h2>FAMOUS DESTINATIONS</h2>
            <h3 style={{textAlign: "center"}} className="sub">worth a thousand stories</h3>
            <p>These luxury India Cities are simply suggestions for the kind of holiday you might have. Yours will be tailored, altered, and refined until it matches you completely.</p>
          </div>
          <div className='section-two'>
            <TrendingSlider cards={cities.slice(0, 6)} text="city" />
          </div>
      </div>
      <div className='Trending-Container-places'>
          <div className='section-one'>
            <h2>FAMOUS ATTRACTIONS</h2>
            <h3 style={{textAlign: "center"}} className="sub">Come And Fall In Love</h3>
            <p>These luxurious destinations in India are just a starting point for your dream getaway. Your journey will be personalized, customized, and fine-tuned to perfectly suit your preferences.</p>
          </div>
          <div className='section-two'>
            <TrendingSlider cards={places.slice(0, 6) } text="place" />
          </div>
      </div>
    </>
  );
}
