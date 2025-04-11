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
    JSON.stringify(data.amenities),
    JSON.stringify(data.roomAmenities),
    JSON.stringify(data.propertyRules),
    JSON.stringify(data.urlsList),
    JSON.stringify(data.reviews),
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

module.exports = {
  saveHotelData,
  getHotelByName,
  updateHotelData,
  getHotelsByCity // ✅ Exported properly
};
