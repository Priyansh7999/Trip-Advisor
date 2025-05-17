const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const dotenv = require('dotenv');
const { getDashboardCounts } = require('./models/ManageDashboard');
const { saveCityData, getCityByName,updateCityData, deleteCityData, saveCityReview, GiveCityReview, SaveRating, GetRating, showAllCityList } = require('./models/ManageCity');
const { savePlaceData, getPlaceByName, updatePlaceData, getPlacesByCityName, deletePlaceData, savePlaceReview, GivePlaceReview, GetPlaceRating, SavePlaceRating, showAllPlaceList  } = require('./models/ManagePlace');
const { saveHotelData, getHotelByName, updateHotelData, getHotelsByCity, deleteHotelData, saveHotelReview, GiveHotelReview } = require('./models/ManageHotel');
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

app.post('/api/get-city-data', async (req, res) => {
  try {
    const cities = await showAllCityList();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching city list:', error);
    res.status(500).json({ error: 'Failed to fetch city list' });
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

app.post('/api/get-place-data', async (req, res) => {
  try {
    const places = await showAllPlaceList();
    res.json(places);
  } catch (error) {
    console.error('Error fetching all place data:', error);
    res.status(500).json({ error: 'Failed to fetch all place data' });
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



// REVIEWS
app.post('/store-review-city', async (req, res) => {
  const { name, username, review } = req.body;

  if (!name || !username || !review) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await saveCityReview({ name, username, review });
    if (result.error) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /store-review-city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/store-review-place', async (req, res) => {
  const { name, username, review } = req.body;
  console.log(req.body); 

  if (!name || !username || !review) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await savePlaceReview({ name, username, review });

    if (result.error) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /store-review-place:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/store-review-hotel', async (req, res) => {
  const { name, username, review } = req.body;
  const hotelName = name; 
  console.log(req.body);
  if (!hotelName || !username || !review) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await saveHotelReview({ hotelName, username, review });
    if (result.error) {
      return res.status(500).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /store-review-hotel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// VIEW REVIEWS

app.post('/view-review-city', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const result = await GiveCityReview(name);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /view-review-city:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/view-review-hotel', async (req, res) => {
  const { name } = req.body; 

  if (!name) {
    return res.status(400).json({ error: 'Hotel name is required' });
  }

  try {
    const result = await GiveHotelReview(name);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /view-review-hotel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/view-review-place', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Place name is required' });
  }

  try {
    const result = await GivePlaceReview(name);

    if (result.error) {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    console.error('Error in /view-review-place:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/view-rating-city', async (req, res) => {
  const { name, rating } = req.body;

  const result = await SaveRating({ name, rating });
  if (result.error) {
    return res.status(400).json({ message: result.message });
  }
  return res.json({ message: result.message, average: result.average });
});

app.post('/get-rating-city', async (req, res) => {
  const { name } = req.body;

  const result = await GetRating(name);

  if (result.error) {
    return res.status(404).json({ message: result.message });
  }

  res.json({ rating: result.rating });
})

app.post('/view-rating-place', async (req, res) => {
  const { name, rating } = req.body;
  
  if (!name || typeof rating !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  
  try {
    const result = await SavePlaceRating(name, rating);
    
    if (result.error) {
      return res.status(500).json({ message: result.message });
    }
    
    res.json({ message: 'Place rating submitted!', newRating: result.rating });
  } catch (err) {
    console.error('Error in rating endpoint:', err);
    res.status(500).json({ message: 'Server error processing your request' });
  }
});


app.post('/get-rating-place', async (req, res) => {
  const { name } = req.body;
  const result = await GetPlaceRating(name);
  if (result.error) {
    return res.status(404).json({ message: result.message });
  }
  res.json({ rating: result.rating });
});

const lesser_known=[
  {
    name: "Tawang",
    state: "Arunachal Pradesh",
    img:"https://media.istockphoto.com/id/187510803/photo/ancient-buddhist-monastery-tawang-arunachal-pradesh-india.jpg?s=612x612&w=0&k=20&c=9D5fAOcKj_sRhBOzNIxEhvhE8h38KbhvFWA9iagrcqw=",
  },
  {
    name: "Yercaud",
    state: "Tamil Nadu",
    img:"https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201008201313094951-9b81a6b8881611eda3a30a58a9feac02.jpg"
  },
  {
    name: "Saputara",
    state: "Gujarat",
    img:"https://hblimg.mmtcdn.com/content/hubble/img/tvdestinationimages/mmt/activities/m_Saputara_tv_destination_img_6_l_667_1000.jpg",
  },
]

app.get('/api/lesserknown', (req, res) => {
  res.json(lesser_known);
});








// TRIAN SERVER
app.get('/api/trains', async (req, res) => {
    const { from, to, date } = req.query;

  if (!from || !to || !date) {
    return res.status(400).json({ error: 'Missing query parameters: from, to, date' });
  }

  const url = `https://tickets.paytm.com/trains/searchTrains/${from}_${encodeURIComponent(from)}/${to}_${encodeURIComponent(to)}/${date}`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for train cards to load
    await page.waitForSelector('div[id^="srpCard-"]');

    const trains = await page.evaluate(() => {
      const trainCards = document.querySelectorAll('div[id^="srpCard-"]');
      const data = [];

      trainCards.forEach(card => {
        const trainNameElem = card.querySelector('h1');
        const trainNumberElem = card.querySelector('span.qW4yv');
        const runsOnElem = card.querySelector('div.GcEn7 span.nrevx');
        const departureTimeElem = card.querySelector('div.nnGXi span.enfHN');
        const departureDateElem = card.querySelector('div.nnGXi span.rqIJl');
        const departureStationElem = card.querySelector('div.pYpdU');
        const durationElem = card.querySelector('div.GVfQw div:nth-child(2)');
        const arrivalDateElem = card.querySelectorAll('div.goeYR span.rqIJl')[0];
        const arrivalTimeElem = card.querySelectorAll('div.goeYR span.enfHN')[0];
        const arrivalStationElem = card.querySelectorAll('div.goeYR div.pYpdU')[0];

        const classes = [];
        const classCards = card.querySelectorAll('div[id^="trainClassCard-"]');

        classCards.forEach(cls => {
          const classNameElem = cls.querySelector('div.Vi8Po.bGfcC');
          const statusElem = cls.querySelector('div.Vi8Po.qiwrN');
          const priceElem = cls.querySelector('div.Vi8Po.SHHaW');
          const updatedTimeElem = cls.querySelector('div.Vi8Po.qpubR');

          if (classNameElem && statusElem && priceElem && updatedTimeElem) {
            classes.push({
              className: classNameElem.textContent.trim(),
              status: statusElem.textContent.trim(),
              price: priceElem.textContent.trim(),
              updated: updatedTimeElem.textContent.trim()
            });
          }
        });

        data.push({
          trainName: trainNameElem ? trainNameElem.textContent.trim() : '',
          trainNumber: trainNumberElem ? trainNumberElem.textContent.trim().replace(/[()]/g, '') : '',
          runsOn: runsOnElem ? runsOnElem.textContent.trim() : '',
          departure: {
            time: departureTimeElem ? departureTimeElem.textContent.trim() : '',
            date: departureDateElem ? departureDateElem.textContent.trim() : '',
            station: departureStationElem ? departureStationElem.textContent.trim() : ''
          },
          arrival: {
            time: arrivalTimeElem ? arrivalTimeElem.textContent.trim() : '',
            date: arrivalDateElem ? arrivalDateElem.textContent.trim() : '',
            station: arrivalStationElem ? arrivalStationElem.textContent.trim() : ''
          },
          duration: durationElem ? durationElem.textContent.trim() : '',
          classes
        });
      });

      return data;
    });

    await browser.close();
    res.json(trains);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).json({ error: 'Failed to scrape train data' });
  }
});







app.get('/api/flights', async (req, res) => {
  const { from, to, departDate, adults, children = 0, infants = 0, flightClass } = req.query;

  if (!from || !to || !departDate || !adults || !flightClass) {
    return res.status(400).json({ 
      error: 'Missing query parameters: from, to, departDate, adults, flightClass' 
    });
  }

  const url = `https://tickets.paytm.com/flights/flightSearch/${from}-${encodeURIComponent(from)}/${to}-${encodeURIComponent(to)}/${adults}/${children}/${infants}/${flightClass}/${departDate}?referer=home`;

  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    await page.waitForSelector('div.CvUja');

    const flights = await page.evaluate(() => {
      const flightCards = document.querySelectorAll('div.CvUja');
      const data = [];

      flightCards.forEach(card => {
        const airlineElem = card.querySelector('div.amk5q');
        const departureElem = card.querySelector('div.mbdEt span.ZLquk');
        const arrivalElem = card.querySelectorAll('div.mbdEt span.ZLquk')[1];
        const durationElem = card.querySelector('div.JVeqq span.tsRPP');
        const priceElem = card.querySelector('div.CvxdD');
        const refundableElem = card.querySelector('div.PS1Hf');

        data.push({
          airline: airlineElem?.textContent.trim() || '',
          departureTime: departureElem?.textContent.trim() || '',
          arrivalTime: arrivalElem?.textContent.trim() || '',
          duration: durationElem?.textContent.trim() || '',
          price: priceElem?.textContent.replace(/[^\d]/g, '') || '',
          refundable: refundableElem?.textContent.trim() || '',
          from: '', // optionally fill if needed
          to: '',   // optionally fill if needed
          flightClass: '', // optionally fill if needed
        });
      });

      return data;
    });

    await browser.close();
    res.json(flights);
  } catch (error) {
    console.error('Error scraping flight data:', error);
    res.status(500).json({ error: 'Failed to scrape flight data' });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
