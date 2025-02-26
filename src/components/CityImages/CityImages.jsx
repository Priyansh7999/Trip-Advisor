import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CityImages = ({ cityName }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your Pixabay API Key
  const API_KEY = '48900817-a25f894261d65e6b6d3272516'; // Replace this with your actual key

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(cityName + ' city')}&image_type=photo&per_page=10`
        );
        setImages(response.data.hits);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch images when the city name changes
    fetchImages();
  }, [cityName]);

  return (
    <div className="city-images-container">
      <h2>Images of {cityName}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="images-grid">
          {images.length === 0 ? (
            <p>No images found for {cityName}.</p>
          ) : (
            images.map((image) => (
              <div key={image.id} className="image-card">
                <img src={image.webformatURL} alt={image.tags} />
                <p>{image.tags}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CityImages;
