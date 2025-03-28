import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const ImageSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch image slider data from the server
    fetch("http://localhost:3000/imageslider")
      .then((response) => response.json())
      .then((data) => setSliderData(data))
      .catch((error) => console.error("Error fetching slider data:", error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
   <>
    <div className="slider-container">
      {sliderData.length > 0 && (
        <>
          <div className="slider-image-container">
            <img
              src={`http://localhost:3000${sliderData[currentIndex].image}`}
              alt={sliderData[currentIndex].place}
            />
            <div className="slider-place-label">
              {sliderData[currentIndex].place}
            </div>
          </div>

          <button className="slider-navigation left" onClick={prevSlide}>
            &#9664;
          </button>
          <button className="slider-navigation right" onClick={nextSlide}>
            &#9654;
          </button>
        </>
      )}
      
    </div>
    <div className="slider-dots">
            {sliderData.map((_, index) => (
              <div
                key={index}
                className={`slider-dot ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
              ></div>
            ))}
    </div>
  </>
  );
};

export default ImageSlider;
