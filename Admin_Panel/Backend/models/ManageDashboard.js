const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

async function getDashboardCounts() {
  try {
    const cityCount = await pool.query('SELECT COUNT(*) FROM CitiesDb');
    const placeCount = await pool.query('SELECT COUNT(*) FROM PlacesDb');
    const hotelCount = await pool.query('SELECT COUNT(*) FROM HotelsDb');
    const restaurantCount = await pool.query('SELECT COUNT(*) FROM RestaurantsDb');

    return {
      totalCities: parseInt(cityCount.rows[0].count, 10),
      totalPlaces: parseInt(placeCount.rows[0].count, 10),
      totalHotels: parseInt(hotelCount.rows[0].count, 10),
      totalRestaurants: parseInt(restaurantCount.rows[0].count, 10),
    };
  } catch (error) {
    console.error('Dashboard count error:', error);
    return {
      totalCities: 0,
      totalPlaces: 0,
      totalHotels: 0,
      totalRestaurants: 0,
    };
  }
}

module.exports = { getDashboardCounts };
