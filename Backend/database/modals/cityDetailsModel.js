// modals/cityDetailsModel.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'city_details_db',
  password: 'FnW$3H216', 
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release(); 
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const insertCityDetails = async (cityDetails) => {
    try {
      const result = await pool.query(
        `INSERT INTO city_details (
          city_name, description, best_time, latitude, longitude, 
          peak_season_start, peak_season_end, peak_season_desc, 
          moderate_season_start, moderate_season_end, moderate_season_desc, 
          off_season_start, off_season_end, off_season_desc, 
          city_title, city_history, state, tourist_places, 
          famous_for, weather, by_air, by_rail, by_road, 
          attractions, hotels, food_to_try, things_to_buy, place_types, 
          conclusion, reviews
        ) VALUES (
          $1, $2, $3, $4, $5, 
          $6, $7, $8, 
          $9, $10, $11, 
          $12, $13, $14, 
          $15, $16, $17, $18, 
          $19, $20, $21, $22, $23, 
          $24, $25, $26, $27, $28, 
          $29, $30
        ) RETURNING id`,
        [
          cityDetails.cityName,
          cityDetails.description,
          cityDetails.bestTime,
          cityDetails.latitude || null,
          cityDetails.longitude || null,
  
          cityDetails.peakSeason.start,
          cityDetails.peakSeason.end,
          cityDetails.peakSeason.description,
  
          cityDetails.moderateSeason.start,
          cityDetails.moderateSeason.end,
          cityDetails.moderateSeason.description,
  
          cityDetails.offSeason.start,
          cityDetails.offSeason.end,
          cityDetails.offSeason.description,
  
          cityDetails.overview.cityTitle,
          cityDetails.overview.cityHistory,
          cityDetails.overview.state,
          cityDetails.overview.touristPlaces,
  
          cityDetails.overview.famousFor,
          cityDetails.overview.weather,
          cityDetails.howToReach.byAir,
          cityDetails.howToReach.byRail,
          cityDetails.howToReach.byRoad,
  
          JSON.stringify(cityDetails.attractions) || "[]",
          JSON.stringify(cityDetails.hotels) || "[]",
          JSON.stringify(cityDetails.foodToTry) || "[]",
          JSON.stringify(cityDetails.thingsToBuy) || "[]",
          JSON.stringify(cityDetails.placeTypes) || "[]",
  
          cityDetails.conclusion,
          JSON.stringify(cityDetails.reviews) || "[]"
        ]
      );
  
      console.log('Inserted city details with ID:', result.rows[0].id);
      return result.rows[0].id;
  
    } catch (error) {
      console.error('Error inserting city details:', error);
      throw error;
    }
  };
  const viewCityDetails = async (cityName) => {
    try {
      const result = await pool.query('SELECT * FROM city_details WHERE city_name = $1', [cityName]);
  
      if (result.rows.length === 0) {
        return null;  // City not found
      }
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching city details:', error);
      throw error;
    }
  };
  
  module.exports = {
    insertCityDetails,
    viewCityDetails,  // Export the new function
  };