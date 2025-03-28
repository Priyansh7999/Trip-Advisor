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


// Function to insert place details
const insertPlaceDetails = async (placeDetails) => {
  const {
    name, desc, city, state, latitude, longitude, suggestedDuration,
    whatToExpect, tips, overview, moreAbout, bestTime, urls
  } = placeDetails;

  try {
    const result = await pool.query(
      `INSERT INTO places (
        name, description, city, state, latitude, longitude, suggested_duration,
        what_to_expect, tips, overview, more_about, best_time, urls
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        name, desc, city, state, latitude, longitude, suggestedDuration,
        whatToExpect, tips, JSON.stringify(overview), moreAbout, bestTime, urls
      ]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('❌ Error inserting place details:', error);
    throw error;
  }
};

// Function to view place details
const viewPlaceDetails = async (placeName, cityName) => {
  try {
    const query = `
      SELECT * FROM places 
      WHERE LOWER(name) = LOWER($1) 
      AND LOWER(city) = LOWER($2)
    `;
    const result = await pool.query(query, [placeName, cityName]);

    if (result.rows.length === 0) {
      return null;  // Place not found
    }
    return result.rows[0];
  } catch (error) {
    console.error('❌ Error fetching place details:', error);
    throw error;
  }
};
module.exports = { insertPlaceDetails,viewPlaceDetails };





// CREATE TABLE places (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   description TEXT NOT NULL,
//   city VARCHAR(255) NOT NULL,
//   state VARCHAR(255) NOT NULL,
//   latitude DOUBLE PRECISION NOT NULL,
//   longitude DOUBLE PRECISION NOT NULL,
//   suggested_duration VARCHAR(255),
//   what_to_expect TEXT,
//   tips TEXT[],  -- Array of tips
//   overview JSONB NOT NULL,
//   more_about TEXT,
//   best_time VARCHAR(255),
//   urls TEXT[]  -- Array of image URLs
// );
