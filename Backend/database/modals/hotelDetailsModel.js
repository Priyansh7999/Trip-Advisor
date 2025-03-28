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

const insertHotelDetails = async (hotelData) => {
    const {
        cityName,
        hotelState,
        hotelName,
        aboutHotel,
        hotelAddress,
        star,
        amenities,
        roomAmenities,
        propertyRules,
        urlsList,
        reviews
    } = hotelData;

    try {
        const query = `
            INSERT INTO hotels 
            (city_name, hotel_state, hotel_name, about_hotel, hotel_address, star, 
             amenities, room_amenities, property_rules, urls_list, reviews)
            VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `;

        const values = [
            cityName,
            hotelState,
            hotelName,
            aboutHotel,
            hotelAddress,
            star,
            JSON.stringify(amenities), 
            JSON.stringify(roomAmenities), 
            JSON.stringify(propertyRules), 
            urlsList, 
            reviews
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting hotel details:", error);
        throw error;
    }
};
// Get hotel details by ID
const viewHotelDetails = async (hotelName, cityName) => {
  try {
      const query = `SELECT * FROM hotels WHERE hotel_name = $1 AND city_name = $2;`;
      const values = [hotelName, cityName];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
          return null; // No hotel found
      }

      const hotel = result.rows[0];

      // ✅ No need to parse JSONB fields, they are already objects
      return hotel;
  } catch (error) {
      console.error("🚨 Error fetching hotel details:", error);
      throw error;
  }
};

module.exports = { insertHotelDetails, viewHotelDetails };









// CREATE TABLE hotels (
//   id SERIAL PRIMARY KEY,
//   city_name TEXT NOT NULL,
//   hotel_state TEXT NOT NULL,
//   hotel_name TEXT NOT NULL,
//   about_hotel TEXT,
//   hotel_address TEXT NOT NULL,
//   star INT CHECK (star BETWEEN 1 AND 5), 
//   amenities JSONB,
//   room_amenities JSONB,
//   property_rules JSONB,
//   urls_list TEXT[],
//   reviews TEXT[]
// );  my table of hotels


