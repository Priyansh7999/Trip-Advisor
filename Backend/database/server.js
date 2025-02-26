// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Import the CORS package
// const app = express();
// const PORT = 3000;

// app.use(cors({
//   origin: 'http://localhost:5173',  // Allow only this frontend URL to access the backend
//   methods: ['GET', 'POST'],        // Allow only GET and POST requests
//   allowedHeaders: ['Content-Type'] // Allow only specific headers
// }));

// // Middleware to parse JSON
// app.use(express.json());

// // Replace this connection string with the one from MongoDB Atlas
// // const atlasConnectionString = 'mongodb+srv://Minor2:Minor2@cluster0.hliyk.mongodb.net/';

// const atlasConnectionString="mongodb+srv://Minor2:Minor2@tripplanner.hliyk.mongodb.net/";

// // Connect to MongoDB Atlas
// mongoose.connect(atlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch(err => {
//     console.error('Error connecting to MongoDB Atlas:', err);
//   });

// // Define the city schema
// const citySchema = new mongoose.Schema({
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   city_desc: { type: String, required: true },
//   best_time_to_visit: {
//     MAR_JUN: String,
//     JUL_SEP: String,
//     OCT_FEB: String
//   },
//   places_to_visit: [String],
//   hotels: [String],
//   festivals_and_events: [
//     { name: String, month: String }
//   ],
//   city_card: {
//     city_title: String,
//     city_more_desc: String,
//     city_is_famous_for: String,
//     tourist_places_in_city: [String],
//   },
//   best_time_to_visit_city: String,
//   when_to_visit: String,
//   how_to_reach: String,
//   things_to_see_and_do: String,
//   food_to_try_in_places_to_visit: String,
//   conclusion: String
// });

// let CityModel;
// try {
//   CityModel = mongoose.model('City');
// } catch (error) {
//   CityModel = mongoose.model('City', citySchema);
// }

// // Route to handle city data submission (POST)
// app.post('/cities', async (req, res) => {
//   const cityData = req.body;

//   try {
//     const newCity = new CityModel(cityData);
//     await newCity.save();
//     res.status(201).json({ message: 'City data saved successfully!', city: newCity });
//   } catch (error) {
//     console.error('Error saving city data:', error);
//     res.status(500).json({ message: 'Failed to save city data', error });
//   }
// });

// // Route to fetch city data by name (GET)
// app.get('/cities/:cityName', async (req, res) => {
//   const cityName = req.params.cityName;

//   try {
//     const cityData = await CityModel.findOne({ city: cityName });

//     if (!cityData) {
//       return res.status(404).json({ message: 'City not found' });
//     }

//     res.json({ city: cityData });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const City = require('./models/City'); // Adjust the path based on where your city model is

const app = express();
const port = 3000;

// MongoDB Atlas connection string
const atlasConnectionString = "mongodb+srv://Minor2:Minor2@tripplanner.hliyk.mongodb.net/";

// Connect to MongoDB Atlas
mongoose.connect(atlasConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,  // 30 seconds timeout
  socketTimeoutMS: 45000    // 45 seconds socket timeout
}).then(() => {
  console.log('Successfully connected to MongoDB!');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(cors()); // To allow cross-origin requests from the frontend
app.use(bodyParser.json()); // To parse JSON request bodies

// POST request to add city data
app.post('/cities', async (req, res) => {
  const {
    basicInfo,
    history,
    seasons,
    geographicalDetails,
    tripDetails,
    accessibility,
    localEvents,
    attractions,
    experiences,
    conclusion,
  } = req.body;

  try {
    const city = new City({
      basicInfo,
      history,
      seasons,
      geographicalDetails,
      tripDetails,
      accessibility,
      localEvents,
      attractions,
      experiences,
      conclusion,
    });

    // Save the city to the database
    await city.save();
    res.status(201).json({ message: 'City data saved successfully' });
  } catch (err) {
    console.error('Error saving city data:', err);
    res.status(500).json({ message: 'Server error while saving city data', error: err });
  }
});


app.get('/cities/:cityName', async (req, res) => {
  const cityName = req.params.cityName;

  try {
    const cityData = await City.findOne({ "basicInfo.CityName": cityName }); // Ensure the query matches your data structure
    if (!cityData) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json({ city: cityData });
  } catch (error) {
    console.error('Error fetching city data:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});
// Server listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
