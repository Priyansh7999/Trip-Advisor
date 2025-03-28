const express = require('express');
const cors = require('cors');
const { insertCityDetails, viewCityDetails } = require('./modals/cityDetailsModel');
const { insertHotelDetails, viewHotelDetails} = require('./modals/hotelDetailsModel'); 
const { insertRestaurantDetails, viewRestaurantDetails } = require('./modals/restaurantDetailsModel');
const { insertPlaceDetails, viewPlaceDetails } = require('./modals/placeDetailsModel')

const app = express();
const port = 7000;

app.use(cors());
app.use(express.json()); 

// SUBMIT DEATILS
app.post('/submit-city-details', async (req, res) => {
  const cityDetails = req.body;
  console.log('Received city details:', cityDetails);  // Debugging log

  try {
    const insertedId = await insertCityDetails(cityDetails);
    res.status(201).json({ message: 'City details submitted successfully!', id: insertedId });
  } catch (error) {
    console.error('❌ Error inserting city details:', error);
    res.status(500).json({ message: 'Failed to submit city details', error: error.message });
  }
});

app.post('/submit-hotels-details', async (req, res) => {
  const hotelDetails = req.body;
  console.log('Received hotel details:', hotelDetails); // Debugging log

  try {
    const insertedId = await insertHotelDetails(hotelDetails);
    res.status(201).json({ message: 'Hotel details submitted successfully!', id: insertedId });
  } catch (error) {
    console.error('❌ Error inserting hotel details:', error);
    res.status(500).json({ message: 'Failed to submit hotel details', error: error.message });
  }
});

app.post('/submit-restaurant-details', async (req, res) => {
  const restaurantDetails = req.body;
  console.log('Received restaurant details:', restaurantDetails);

  try {
    const insertedId = await insertRestaurantDetails(restaurantDetails);
    res.status(201).json({ message: 'Restaurant details submitted successfully!', id: insertedId });
  } catch (error) {
    console.error('❌ Error inserting restaurant details:', error);
    res.status(500).json({ message: 'Failed to submit restaurant details', error: error.message });
  }
});

app.post('/submit-place-details', async (req, res) => {
  const placeDetails = req.body;
  console.log('✅ Received place details:', placeDetails);

  try {
    const insertedId = await insertPlaceDetails(placeDetails);
    res.status(201).json({ message: '✅ Place details submitted successfully!', id: insertedId });
  } catch (error) {
    res.status(500).json({ message: '❌ Failed to submit place details', error: error.message });
  }
});


// VIEW DEATILS
app.get('/get-city-details/:cityName', async (req, res) => {
  const { cityName } = req.params;

  try {
    const cityDetails = await viewCityDetails(cityName);
    if (!cityDetails) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(cityDetails);
  } catch (error) {
    console.error('❌ Error fetching city details:', error);
    res.status(500).json({ message: 'Failed to fetch city details', error: error.message });
  }
});

app.get('/get-hotel-details', async (req, res) => {
  const { hotelName, cityName } = req.query;

  if (!hotelName || !cityName) {
      return res.status(400).json({ error: "Missing hotelName or cityName" });
  }

  try {
      const hotel = await viewHotelDetails(hotelName, cityName);

      if (!hotel) {
          return res.status(404).json({ error: "Hotel not found" });
      }

      res.status(200).json(hotel);
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/get-place-details/:placeName/:cityName', async (req, res) => {
  const { placeName, cityName } = req.params;

  try {
    const placeDetails = await viewPlaceDetails(placeName, cityName);
    if (!placeDetails) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(placeDetails);
  } catch (error) {
    console.error('❌ Error fetching place details:', error);
    res.status(500).json({ message: 'Failed to fetch place details', error: error.message });
  }
});

app.get('/get-restaurant-details/:restaurantName/:cityName', async (req, res) => {
  const { restaurantName, cityName } = req.params;

  try {
    const restaurantDetails = await viewRestaurantDetails(restaurantName, cityName);
    if (!restaurantDetails) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurantDetails);
  } catch (error) {
    console.error('❌ Error fetching restaurant details:', error);
    res.status(500).json({ message: 'Failed to fetch restaurant details', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
