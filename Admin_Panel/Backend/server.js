const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getDashboardCounts } = require('./models/ManageDashboard');
const { saveCityData, getCityByName,updateCityData, deleteCityData } = require('./models/ManageCity');
const { savePlaceData, getPlaceByName, updatePlaceData, getPlacesByCityName, deletePlaceData } = require('./models/ManagePlace');
const { saveHotelData, getHotelByName, updateHotelData, getHotelsByCity, deleteHotelData } = require('./models/ManageHotel');
const { saveRestaurantData, getRestaurantByName, updateRestaurant, deleteRestaurantData } = require('./models/ManageRestaurant');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get('/dashboard-counts', async (req, res) => {
  try {
    const counts = await getDashboardCounts();
    res.json(counts);
  } catch (error) {
    console.error('Error fetching dashboard counts:', error);
    res.json({ error: 'Failed to fetch dashboard data' });
  }
});

app.post('/add-city', async (req, res) => {
  try {
    const result = await saveCityData(req.body);
    if (result.exists) {
      return res.json({ error: 'City already exists' });
    }
    res.json({ message: 'City data saved!' });
  } catch (error) {
    console.error('Error saving city data:', error);
    res.json({ error: 'Failed to save city data' });
  }
});
app.get('/get-city/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const city = await getCityByName(name);
    res.json(city);
  } catch (error) {
    console.error('Error retrieving city data:', error);
    res.json({ error: 'Failed to fetch city data' });
  }
});
app.put('/update-city/:cityName', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const result = await updateCityData(cityName, req.body);
    if (result.error) {
      return res.json({ error: result.message });
    }
    res.json({ message: 'City updated successfully' });
  } catch (err) {
    console.error('City update failed:', err);
    res.json({ error: 'Update failed' });
  }
});

app.put('/delete-city/:cityName', async (req, res) => {
  try {
    const cityName = req.params.cityName;
    const result = await deleteCityData(cityName);
    res.json({ message: result.message });
  } catch (error) {
    console.error('City deletion failed:', error);
    res.json({ error: 'Failed to delete city' });
  }
});


app.post('/add-place', async (req, res) => {
  try {
    await savePlaceData(req.body);
    res.json({ message: 'Place data saved!' });
  } catch (error) {
    console.error('Error saving place data:', error);
    res.json({ error: 'Failed to save place data' });
  }
});

app.get('/get-place/:name', async (req, res) => {
  try {
    const place = await getPlaceByName(req.params.name);
    res.json(place);
  } catch (error) {
    console.error('Error retrieving place data:', error);
    res.json({ error: 'Failed to fetch place data' });
  }
});

app.put('/update-place/:name', async (req, res) => {
  try {
    const result = await updatePlaceData(req.params.name, req.body);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.json({ error: 'Update failed' });
  }
});
app.get('/get-place-list/:name', async (req, res) => {
  try {
    const places = await getPlacesByCityName(req.params.name);
    res.json(places);
  } catch (error) {
    console.error('Error fetching places list:', error);
    res.status(500).json({ error: 'Failed to fetch place list' });
  }
});
app.delete('/delete-place/:name', async (req, res) => {
  try {
    const result = await deletePlaceData(req.params.name);
    res.json(result);
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ error: 'Failed to delete place' });
  }
});


app.post('/add-hotel', async (req, res) => {
  try {
    await saveHotelData(req.body);
    res.json({ message: 'Hotel data saved!' });
  } catch (error) {
    console.error('Error saving hotel data:', error);
    res.json({ error: 'Failed to save hotel data' });
  }
});

app.get('/get-hotel/:name', async (req, res) => {
  try {
    const hotel = await getHotelByName(req.params.name);
    res.json(hotel);
  } catch (error) {
    console.error('Error retrieving hotel data:', error);
    res.json({ error: 'Failed to fetch hotel data' });
  }
});

app.put('/update-hotel/:name', async (req, res) => {
  try {
    const result = await updateHotelData(req.params.name, req.body);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json(result);
  } catch (err) {
    res.json({ error: 'Error updating hotel' });
  }
});

app.get('/get-hotel-list/:city', async (req, res) => {
  const city = req.params.city;
  try {
    const hotels = await getHotelsByCity(city);
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels by city:', error);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});


app.delete('/delete-hotel/:name', async (req, res) => {
  try {
    const result = await deleteHotelData(req.params.name);
    res.json(result);
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ error: 'Failed to delete hotel' });
  }
});

app.post('/add-restaurant', async (req, res) => {
  try {
    console.log(req.body)
    await saveRestaurantData(req.body);
    res.json({ message: 'Restaurant data saved!' });
  } catch (error) {
    console.error('Error saving restaurant data:', error);
    res.json({ error: 'Failed to save restaurant data' });
  }
});

app.get('/get-restaurant/:name', async (req, res) => {
  try {
    const restaurant = await getRestaurantByName(req.params.name);
    res.json(restaurant);
  } catch (error) {
    console.error('Error retrieving restaurant data:', error);
    res.json({ error: 'Failed to fetch restaurant data' });
  }
});

app.put('/update-restaurant/:name', async (req, res) => {
  try {
    console.log('Update request received:', req.body);
    const result = await updateRestaurant(req.params.name, req.body);
    
    if (result.modifiedCount === 0) {
      return res.json({ error: 'No matching restaurant found or no changes made.' });
    }

    res.json({ message: 'Restaurant updated successfully!' });
  } catch (error) {
    console.error('Error updating restaurant data:', error);
    res.status(500).json({ error: 'Failed to update restaurant data' });
  }
});
app.delete('/delete-restaurant/:name', async (req, res) => {
  try {
    const result = await deleteRestaurantData(req.params.name);
    res.json(result);
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
