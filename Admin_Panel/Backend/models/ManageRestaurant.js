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

async function saveRestaurantData(data) {
  const existing = await pool.query('SELECT * FROM RestaurantsDb WHERE name = $1', [data.name]);
  if (existing.rows.length > 0) {
    return { exists: true, message: 'Restaurant already exists' };
  }
  const query = `
    INSERT INTO RestaurantsDb (
      name, city, state, address, about, features,
      timings, contactInfo, reviews,urls
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10
    )
  `;

  const values = [
    data.name,
    data.city,
    data.state,
    data.address,
    data.about,
    JSON.stringify(data.features),
    data.timings,
    JSON.stringify(data.contactInfo),
    JSON.stringify(data.review),
    JSON.stringify(data.urls),
  ];

  await pool.query(query, values);
}

async function getRestaurantByName(name) {
  const result = await pool.query('SELECT * FROM RestaurantsDb WHERE name = $1', [name]);
  return result.rows[0];
}

async function updateRestaurant(name, data) {
  const exists = await pool.query('SELECT 1 FROM RestaurantsDb WHERE name = $1', [name]);
  if (exists.rowCount === 0) return { error: 'Restaurant not found' };

  const query = `
    UPDATE RestaurantsDb SET
      city = $1,
      state = $2,
      address = $3,
      about = $4,
      features = $5,
      timings = $6,
      contactInfo = $7,
      reviews = $8,
      urls = $9
    WHERE name = $10
  `;

  const values = [
    data.city,
    data.state,
    data.address,
    data.about,
    JSON.stringify(data.features),
    JSON.stringify(data.timings),
    JSON.stringify(data.contactInfo),
    JSON.stringify(data.review),
    JSON.stringify(data.urls), // ✅ This will now work
    name,
  ];

  await pool.query(query, values);
  return { message: 'Restaurant updated successfully' };
}

async function deleteRestaurantData(name) {
  const result = await pool.query('DELETE FROM RestaurantsDb WHERE name = $1', [name]);
  if (result.rowCount === 0) {
    throw new Error('Restaurant not found');
  }
  return { message: 'Restaurant deleted successfully' };
}

module.exports = { saveRestaurantData, getRestaurantByName, updateRestaurant, deleteRestaurantData };
