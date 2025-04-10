const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getDashboardCounts } = require('./models/ManageDashboard');
const { saveCityData, getCityByName,updateCityData } = require('./models/ManageCity');
const { savePlaceData, getPlaceByName, updatePlaceData } = require('./models/ManagePlace');
const { saveHotelData, getHotelByName, updateHotelData } = require('./models/ManageHotel');
const { saveRestaurantData, getRestaurantByName, updateRestaurant } = require('./models/ManageRestaurant');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Dashboard Endpoints
app.get('/dashboard-counts', async (req, res) => {
  try {
    const counts = await getDashboardCounts();
    res.json(counts);
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.json({ error: 'Failed to fetch dashboard data' });
  }
});

// City Endpoints
app.post('/add-city', async (req, res) => {
  try {
    const result = await saveCityData(req.body);
    if (result.exists) {
      return res.status(409).json({ error: 'City already exists' });
    }
    res.status(200).json({ message: 'City data saved!' });
  } catch (error) {
    console.error('Error saving city data:', error);
    res.status(500).json({ error: 'Failed to save city data' });
  }
});
app.get('/get-city/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const city = await getCityByName(name);
    res.json(city);
  } catch (error) {
    console.error('Error retrieving city data:', error);
    res.status(500).json({ error: 'Failed to fetch city data' });
  }
});
app.put('/update-city/:cityName', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const result = await updateCityData(cityName, req.body);

    if (result.error) {
      return res.status(404).json({ error: result.message });
    }

    res.status(200).json({ message: 'City updated successfully' });
  } catch (err) {
    console.error('City update failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
});


// Place Endpoints
app.post('/add-place', async (req, res) => {
  try {
    await savePlaceData(req.body);
    res.status(200).json({ message: 'Place data saved!' });
  } catch (error) {
    console.error('Error saving place data:', error);
    res.status(500).json({ error: 'Failed to save place data' });
  }
});

app.get('/get-place/:name', async (req, res) => {
  try {
    const place = await getPlaceByName(req.params.name);
    res.json(place);
  } catch (error) {
    console.error('Error retrieving place data:', error);
    res.status(500).json({ error: 'Failed to fetch place data' });
  }
});

app.put('/update-place/:name', async (req, res) => {
  try {
    const result = await updatePlaceData(req.params.name, req.body);
    if (result.error) return res.status(404).json({ error: result.error });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
});


// Hotel Endpoints
app.post('/add-hotel', async (req, res) => {
  try {
    await saveHotelData(req.body);
    res.status(200).json({ message: 'Hotel data saved!' });
  } catch (error) {
    console.error('Error saving hotel data:', error);
    res.status(500).json({ error: 'Failed to save hotel data' });
  }
});

app.get('/get-hotel/:name', async (req, res) => {
  try {
    const hotel = await getHotelByName(req.params.name);
    res.json(hotel);
  } catch (error) {
    console.error('Error retrieving hotel data:', error);
    res.status(500).json({ error: 'Failed to fetch hotel data' });
  }
});

app.put('/update-hotel/:name', async (req, res) => {
  try {
    const result = await updateHotelData(req.params.name, req.body);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error updating hotel' });
  }
});


// Restaurant Endpoints
app.post('/add-restaurant', async (req, res) => {
  try {
    await saveRestaurantData(req.body);
    res.status(200).json({ message: 'Restaurant data saved!' });
  } catch (error) {
    console.error('Error saving restaurant data:', error);
    res.status(500).json({ error: 'Failed to save restaurant data' });
  }
});

app.get('/get-restaurant/:name', async (req, res) => {
  try {
    const restaurant = await getRestaurantByName(req.params.name);
    res.json(restaurant);
  } catch (error) {
    console.error('Error retrieving restaurant data:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant data' });
  }
});

app.put('/update-restaurant/:name', async (req, res) => {
  try {
    const result = await updateRestaurant(req.params.name, req.body);
    if (result.error) return res.status(404).json(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
