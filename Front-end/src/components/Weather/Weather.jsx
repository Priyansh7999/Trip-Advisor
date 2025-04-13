import React, { useState, useEffect } from 'react';
import './Weather.css';
// Import custom weather images
import sunnyIcon from './images/sunny.png';
import partlyCloudyIcon from './images/partly_cloudy.png';
import cloudyIcon from './images/cloudy.png';
import rainIcon from './images/rain.png';
import thunderstormIcon from './images/thunderstorm.png';
import snowIcon from './images/snow.png';
import windyIcon from './images/windy.png';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [weatherLocation, setWeatherLocation] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'e2add103a6bd4977991123722252402';
  
  // Format the city name to avoid extra spaces
  const formattedCity = city.trim();

  // Construct the API URL for current weather and forecast
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${formattedCity}&days=4&aqi=no`;
  useEffect(() => {
    if (city) {
      // Reset error before making a new request
      setError(null);

      // Fetch weather data
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(`City not found: ${data.error.message}`);
          } else {
            setWeatherData(data.current); // Set current weather
            setForecastData(data.forecast.forecastday); // Set 4-day forecast (includes today)
            setWeatherLocation(data.location);
          }
        })
        .catch((err) => {
          setError('Error fetching weather data');
          console.error(err);
        });
    }
  }, [city]);

  // Function to get custom icon based on weather condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
      case 'Clear':
        return sunnyIcon; // Custom sunny icon
      case 'Partly Cloudy':
        return partlyCloudyIcon; // Custom partly cloudy icon
      case 'Cloudy':
        return cloudyIcon; // Custom cloudy icon
      case 'Rain':
      case 'Light Rain':
        return rainIcon; // Custom rain icon
      case 'Thunderstorm':
        return thunderstormIcon; // Custom thunderstorm icon
      case 'Snow':
        return snowIcon; // Custom snow icon
      case 'Windy':
        return windyIcon; // Custom windy icon
      default:
        return sunnyIcon; // Default icon if no match
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="current-weather">
          <h2 className="city-name">
            {weatherLocation.name}, {weatherLocation.region}, {weatherLocation.country}
          </h2>
          <div className="weather-image">
            <img 
              src={getWeatherIcon(weatherData.condition.text)} 
              alt={weatherData.condition.text} 
            />
          </div>
          <div className="weather-info">
            <p className="temperature">{weatherData.temp_c}°C</p>
            <p className="condition">{weatherData.condition.text}</p>
            <p className="wind-speed">Wind Speed: {weatherData.wind_kph} kph</p>
            <p className="humidity">Humidity: {weatherData.humidity}%</p>
          </div>
        </div>
      )}

{forecastData && (
        <div className="forecast">
          <h3>Next 3 Days Forecast</h3>
          <div className="forecast-boxes">
            {forecastData.map((forecast, index) => (
              <div key={index} className="forecast-box">
                <h4>{new Date(forecast.date).toLocaleDateString()}</h4>
                <div className="forecast-image">
                  <img 
                    src={getWeatherIcon(forecast.day.condition.text)} 
                    alt={forecast.day.condition.text} 
                  />
                </div>
                <p className="forecast-temp">{forecast.day.avgtemp_c}°C</p>
                <p className="forecast-condition">{forecast.day.condition.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;