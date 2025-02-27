import React from "react";

const CityMap = ({ url }) => {
  // Google Maps Embed URL with dynamic latitude and longitude

  return (
    <div className="city-map-container">
      <h2>Location Map</h2>
      <iframe
        title="City Map"
        width="100%"
        height="500"
        style={{ border: 0, borderRadius: "10px" }}
        loading="lazy"
        allowFullScreen
        src={url}
      ></iframe>
    </div>
  );
};

export default CityMap;
