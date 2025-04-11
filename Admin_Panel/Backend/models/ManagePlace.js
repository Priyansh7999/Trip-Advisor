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

async function savePlaceData(data) {
  const query = `
    INSERT INTO PlacesDb (
      name, description, city, state, latitude, longitude,
      suggestedDuration, whatToExpect, tips, overview,
      moreAbout, bestTime, urls
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10,
      $11, $12, $13
    )
  `;

  const values = [
    data.name,
    data.desc,
    data.city,
    data.state,
    data.latitude,
    data.longitude,
    data.suggestedDuration,
    data.whatToExpect,
    data.tips,
    JSON.stringify(data.overview),
    data.moreAbout,
    data.bestTime,
    JSON.stringify(data.urls),
  ];

  await pool.query(query, values);
}

async function getPlaceByName(name) {
  const result = await pool.query('SELECT * FROM PlacesDb WHERE name = $1', [name]);
  return result.rows[0];
}


async function updatePlaceData(name, data) {
  const exists = await pool.query('SELECT 1 FROM PlacesDb WHERE name = $1', [name]);
  if (exists.rowCount === 0) return { error: 'Place does not exist' };

  const query = `
    UPDATE PlacesDb SET
      description = $1,
      city = $2,
      state = $3,
      latitude = $4,
      longitude = $5,
      suggestedDuration = $6,
      whatToExpect = $7,
      tips = $8,
      overview = $9,
      moreAbout = $10,
      bestTime = $11,
      urls = $12
    WHERE name = $13
  `;
  const values = [
    data.desc, data.city, data.state, data.latitude, data.longitude,
    data.suggestedDuration, data.whatToExpect, JSON.stringify(data.tips),
    JSON.stringify(data.overview), data.moreAbout, data.bestTime,
    JSON.stringify(data.urls), name
  ];
  await pool.query(query, values);
  return { message: 'Place updated successfully' };
}
async function getPlacesByCityName(cityName) {
  const result = await pool.query(
    'SELECT * FROM PlacesDb WHERE city = $1',
    [cityName]
  );
  return result.rows;
}

module.exports = { savePlaceData, getPlaceByName, updatePlaceData, getPlacesByCityName };

