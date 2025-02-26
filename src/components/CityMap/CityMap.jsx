import React from "react";

const CityMap = ({ latitude, longitude }) => {
  // Google Maps Embed URL with dynamic latitude and longitude
  const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao&center=${latitude},${longitude}&zoom=12`;

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
        src={mapUrl}
      ></iframe>
    </div>
  );
};

export default CityMap;
