const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function saveCityData(data) {
  // Check if city already exists
  const existing = await pool.query('SELECT 1 FROM CitiesDb WHERE cityName = $1', [data.cityName]);
  if (existing.rows.length > 0) {
    return { exists: true, message: 'City already exists' };
  }

  const query = `
    INSERT INTO CitiesDb (
      cityName, description, bestTime, latitude, longitude,
      peakSeason, moderateSeason, offSeason, overview,
      howToReach, foodToTry, thingsToBuy, placeTypes,
      conclusion, urls, reviews
    ) VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9,
      $10, $11, $12, $13,
      $14, $15, $16
    )
  `;

  const values = [
    data.cityName,
    data.description,
    data.bestTime,
    data.latitude,
    data.longitude,
    JSON.stringify(data.peakSeason),
    JSON.stringify(data.moderateSeason),
    JSON.stringify(data.offSeason),
    JSON.stringify(data.overview),
    JSON.stringify(data.howToReach),
    JSON.stringify(data.foodToTry),
    JSON.stringify(data.thingsToBuy),
    JSON.stringify(data.placeTypes),
    data.conclusion,
    JSON.stringify(data.urls),
    JSON.stringify(data.reviews),
  ];

  await pool.query(query, values);
  return { success: true };
}

  

async function getCityByName(name) {
  const result = await pool.query('SELECT * FROM CitiesDb WHERE cityName = $1', [name]);
  return result.rows[0];
}

async function updateCityData(cityName, data) {
  // Check if the city exists
  const existing = await pool.query('SELECT 1 FROM CitiesDb WHERE cityName = $1', [cityName]);
  if (existing.rows.length === 0) {
    return { error: true, message: 'City does not exist' };
  }

  const query = `
    UPDATE CitiesDb SET
      description = $1,
      bestTime = $2,
      latitude = $3,
      longitude = $4,
      peakSeason = $5,
      moderateSeason = $6,
      offSeason = $7,
      overview = $8,
      howToReach = $9,
      foodToTry = $10,
      thingsToBuy = $11,
      placeTypes = $12,
      conclusion = $13,
      urls = $14,
      reviews = $15
    WHERE cityName = $16
  `;

  const values = [
    data.description,
    data.bestTime,
    data.latitude,
    data.longitude,
    JSON.stringify(data.peakSeason),
    JSON.stringify(data.moderateSeason),
    JSON.stringify(data.offSeason),
    JSON.stringify(data.overview),
    JSON.stringify(data.howToReach),
    JSON.stringify(data.foodToTry),
    JSON.stringify(data.thingsToBuy),
    JSON.stringify(data.placeTypes),
    data.conclusion,
    JSON.stringify(data.urls),
    JSON.stringify(data.reviews || []),
    cityName,
  ];

  await pool.query(query, values);
  return { success: true };
}

module.exports = {
  saveCityData,
  getCityByName,
  updateCityData, // 👈 export the new function
};




























// CREATE TABLE CitiesDb (
//   id SERIAL PRIMARY KEY,
//   cityName VARCHAR(100),
//   description TEXT,
//   bestTime VARCHAR(100),
//   latitude FLOAT,
//   longitude FLOAT,
//   peakSeason JSON,
//   moderateSeason JSON,
//   offSeason JSON,
//   overview JSON,
//   howToReach JSON,
//   foodToTry JSON,
//   thingsToBuy JSON,
//   placeTypes JSON,
//   conclusion TEXT,
//   urls JSON,
//   reviews JSON
// );
