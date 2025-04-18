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
async function saveHotelData(data) {
  // Basic validation
  if (
    !data.cityName || !data.hotelState || !data.hotelName ||
    !data.aboutHotel || !data.hotelAddress || !data.star
  ) {
    throw new Error('Missing required fields');
  }

  const existing = await pool.query('SELECT * FROM HotelsDb WHERE hotelName = $1', [data.hotelName]);
  if (existing.rows.length > 0) {
    return { exists: true, message: 'Hotel already exists' };
  }

  const query = `
    INSERT INTO HotelsDb (
      cityName, hotelState, hotelName, aboutHotel, hotelAddress, star,
      amenities, roomAmenities, propertyRules, urlsList, reviews
    ) VALUES (
      $1, $2, $3, $4, $5, $6,
      $7, $8, $9, $10, $11
    )
  `;

  const values = [
    data.cityName,
    data.hotelState,
    data.hotelName,
    data.aboutHotel,
    data.hotelAddress,
    data.star,
    JSON.stringify(data.amenities || []),
    JSON.stringify(data.roomAmenities || []),
    JSON.stringify(data.propertyRules || []),
    JSON.stringify(data.urlsList || []),
    JSON.stringify(data.reviews || []),
  ];

  await pool.query(query, values);
}

async function getHotelByName(hotelName) {
  const result = await pool.query('SELECT * FROM HotelsDb WHERE hotelName = $1', [hotelName]);
  return result.rows[0];
}

async function updateHotelData(hotelName, data) {
  const exists = await pool.query('SELECT 1 FROM HotelsDb WHERE hotelName = $1', [hotelName]);
  if (exists.rowCount === 0) return { error: 'Hotel does not exist' };

  const query = `
    UPDATE HotelsDb SET
      cityName = $1,
      hotelState = $2,
      aboutHotel = $3,
      hotelAddress = $4,
      star = $5,
      amenities = $6,
      roomAmenities = $7,
      propertyRules = $8,
      urlsList = $9,
      reviews = $10
    WHERE hotelName = $11
  `;
  const values = [
    data.cityName, data.hotelState, data.aboutHotel, data.hotelAddress, data.star,
    JSON.stringify(data.amenities),
    JSON.stringify(data.roomAmenities),
    JSON.stringify(data.propertyRules),
    JSON.stringify(data.urlsList),
    JSON.stringify(data.reviews),
    hotelName
  ];
  await pool.query(query, values);
  return { message: 'Hotel updated successfully' };
}
async function getHotelsByCity(cityName) {
  const result = await pool.query(
    'SELECT hotelname, urlslist, abouthotel FROM HotelsDb WHERE cityName = $1',
    [cityName]
  );
  return result.rows;
}

async function deleteHotelData(hotelName) {
  const result = await pool.query('DELETE FROM HotelsDb WHERE hotelName = $1', [hotelName]);
  if (result.rowCount === 0) {
    throw new Error('Hotel not found');
  }
  return { message: 'Hotel deleted successfully' };
}
async function saveHotelReview({ hotelName, username, review }) {
  try {
    // Fetch existing reviews for the hotel
    const result = await pool.query('SELECT reviews FROM HotelsDb WHERE hotelName = $1', [hotelName]);

    if (result.rows.length === 0) {
      return { error: true, message: 'Hotel not found' };
    }

    const existingReviews = result.rows[0].reviews || []; // Default to empty array if no reviews
    const updatedReviews = [...existingReviews, { username, review }];

    // Update the reviews field for the hotel
    await pool.query('UPDATE HotelsDb SET reviews = $1 WHERE hotelName = $2', [
      JSON.stringify(updatedReviews), // Store the updated reviews as a JSON string
      hotelName,
    ]);

    return { success: true, message: 'Review saved successfully' };
  } catch (err) {
    console.error('Error saving hotel review:', err.message); // More specific error logging
    return { error: true, message: 'Error saving review' };
  }
}
async function GiveHotelReview(hotelName) {
  try {
    const result = await pool.query(
      'SELECT reviews FROM HotelsDb WHERE hotelName = $1',
      [hotelName]
    );

    if (result.rows.length === 0) {
      return { error: true, message: 'Hotel not found' };
    }

    const reviews = result.rows[0].reviews || [];
    return { success: true, reviews };
  } catch (err) {
    console.error('Error fetching hotel reviews:', err.message);
    return { error: true, message: 'Error fetching reviews' };
  }
}


module.exports = {
  saveHotelData,
  getHotelByName,
  updateHotelData,
  getHotelsByCity,
  deleteHotelData ,
  saveHotelReview,
  GiveHotelReview
};
