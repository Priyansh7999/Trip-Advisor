// routes/cityDetailsRoute.js
const express = require('express');
const router = express.Router();
const { insertCityDetails } = require('../modals/cityDetailsModel');  // Correct path

// Handle form submission (POST request)
router.post('/submit-city-details', async (req, res) => {
  const cityDetails = req.body;
  
  try {
    const id = await insertCityDetails(cityDetails);
    res.status(201).json({
      message: 'City details saved successfully!',
      id: id,
    });
  } catch (error) {
    console.error('Error saving city details:', error);
    res.status(500).json({ error: 'Failed to save city details.' });
  }
});

module.exports = router;
