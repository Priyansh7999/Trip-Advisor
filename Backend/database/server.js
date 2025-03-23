const express = require('express');
const cors = require('cors');
const { insertCityDetails } = require('./modals/cityDetailsModel'); 
const app = express();
const port = 7000;

app.use(cors());
app.use(express.json()); 

app.post('/submit-city-details', async (req, res) => {
  const cityDetails = req.body;

  try {
    // Call the function to insert the city details into the database
    const insertedId = await insertCityDetails(cityDetails);

    // Send a success response along with the inserted id
    res.status(201).json({
      message: 'City details submitted successfully!',
      id: insertedId,  // Return the inserted ID
    });
  } catch (error) {
    console.error('Error inserting city details:', error);
    res.status(500).json({ message: 'Failed to submit city details', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
