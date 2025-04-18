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
  const existing = await pool.query('SELECT * FROM PlacesDb WHERE name = $1', [data.name]);
  if (existing.rows.length > 0) {
    return { exists: true, message: 'Place already exists' };
  }
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

async function deletePlaceData(name) {
  const result = await pool.query('DELETE FROM PlacesDb WHERE name = $1', [name]);
  if (result.rowCount === 0) {
    throw new Error('Place not found');
  }
  return { message: 'Place deleted successfully' };
}
async function savePlaceReview({ name, username, review }) {
  try {
    // Fetch existing reviews for the place
    const result = await pool.query('SELECT reviews FROM PlacesDb WHERE name = $1', [name]);

    if (result.rows.length === 0) {
      return { error: true, message: 'Place not found' };
    }

    const existingReviews = result.rows[0].reviews || [];
    const updatedReviews = [...existingReviews, { username, review }];

    // Update the reviews field for the place
    await pool.query('UPDATE PlacesDb SET reviews = $1 WHERE name = $2', [
      JSON.stringify(updatedReviews),
      name,
    ]);

    return { success: true, message: 'Review saved successfully' };
  } catch (err) {
    console.error('Error saving place review:', err);
    return { error: true, message: 'Error saving review' };
  }
}
async function GivePlaceReview(name) {
  try {
    const result = await pool.query(
      'SELECT reviews FROM PlacesDb WHERE name = $1',
      [name]
    );

    if (result.rows.length === 0) {
      return { error: true, message: 'Place not found' };
    }

    const reviews = result.rows[0].reviews || [];
    return { success: true, reviews };
  } catch (err) {
    console.error('Error fetching place reviews:', err.message);
    return { error: true, message: 'Error fetching reviews' };
  }
}

async function SavePlaceRating(name, newRating) {
  try {
    const result = await pool.query(
      'SELECT rating, reviews FROM PlacesDb WHERE name = $1',
      [name]
    );
    if (result.rows.length === 0) {
      return { error: true, message: 'Place not found' };
    }

    let existingReviews = result.rows[0].reviews;

    if (!Array.isArray(existingReviews)) {
      try {
        existingReviews = JSON.parse(existingReviews);
        if (!Array.isArray(existingReviews)) existingReviews = [];
      } catch {
        existingReviews = [];
      }
    }
    existingReviews.push({ rating: newRating });
    const validRatings = existingReviews
      .map((r) => r.rating)
      .filter((r) => typeof r === 'number');
    const updatedAvg =
      validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length;
    await pool.query(
      'UPDATE PlacesDb SET rating = $1, reviews = $2 WHERE name = $3',
      [updatedAvg, JSON.stringify(existingReviews), name]
    );

    return { success: true, rating: updatedAvg };
  } catch (err) {
    console.error('Error saving place rating:', err.message);
    return { error: true, message: 'Error saving rating' };
  }
}


async function GetPlaceRating(name) {
  try {
    const result = await pool.query('SELECT rating FROM PlacesDb WHERE name = $1', [name]);

    if (result.rows.length === 0) {
      return { error: true, message: 'Place not found' };
    }

    return { success: true, rating: result.rows[0].rating || 0 };
  } catch (err) {
    console.error('Error fetching place rating:', err.message);
    return { error: true, message: 'Failed to fetch rating' };
  }
}


module.exports = {
  savePlaceData,
  getPlaceByName,
  updatePlaceData,
  getPlacesByCityName,
  deletePlaceData, 
  savePlaceReview,
  GivePlaceReview,
  SavePlaceRating,
  GetPlaceRating
};
