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


// Function to insert restaurant details
const insertRestaurantDetails = async (restaurantDetails) => {
  const {
    name, city, state, address, about, features, timings, contactInfo, review
  } = restaurantDetails;

  try {
    const result = await pool.query(
      `INSERT INTO restaurants (
        name, city, state, address, about, features, timings, contact_info, reviews
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [name, city, state, address, about, 
        JSON.stringify(features), JSON.stringify(timings),
        JSON.stringify(contactInfo), JSON.stringify(review)]
    );

    return result.rows[0].id;
  } catch (error) {
    console.error('❌ Error inserting restaurant details:', error);
    throw error;
  }
};
const viewRestaurantDetails = async (restaurantName, cityName) => {
  try {
    const result = await pool.query(
      `SELECT * FROM restaurants WHERE LOWER(name) = LOWER($1) AND LOWER(city) = LOWER($2)`,
      [restaurantName, cityName]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (error) {
    console.error('❌ Error fetching restaurant details:', error);
    throw error;
  }
};


module.exports = { insertRestaurantDetails, viewRestaurantDetails };
