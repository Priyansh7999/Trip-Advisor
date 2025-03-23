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
        city_name, description, best_time, peak_season_start, peak_season_end, peak_season_desc, 
        moderate_season_start, moderate_season_end, moderate_season_desc, off_season_start, 
        off_season_end, off_season_desc, city_title, city_history, state, tourist_places, 
        famous_for, weather, by_air, by_rail, by_road, attractions, hotels, food_to_try, 
        things_to_buy, conclusion
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
        $19, $20, $21, $22, $23, $24, $25, $26
      ) RETURNING id`,
      [
        cityDetails.cityName,
        cityDetails.description,
        cityDetails.bestTime,
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
        cityDetails.attractions,
        cityDetails.hotels,
        cityDetails.foodToTry,
        cityDetails.thingsToBuy,
        cityDetails.conclusion,
      ]
    );

    console.log('Inserted city details with ID:', result.rows[0].id);

    return result.rows[0].id;
  } catch (error) {
    console.error('Error inserting city details:', error);
    throw error;
  }
};
// Export the function
module.exports = {
  insertCityDetails,
};