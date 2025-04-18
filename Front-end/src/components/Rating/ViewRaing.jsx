import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewRating.css';
export default function ViewRating({ type, name }) {
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/get-rating-${type.toLowerCase()}`, {
          name
        });

        if (response.data.rating !== undefined) {
          setRating(response.data.rating.toFixed(1));
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, [type, name]);

  return (
    <div className='rating'>
      {rating !== null ? (
        <p>{rating} / 5</p>
      ) : (
        <p>No rating available</p>
      )}
    </div>
  );
}
