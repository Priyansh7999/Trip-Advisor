const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHotels() {
  try {
    // Fetch the HTML content from the website
    const { data } = await axios.get('https://www.makemytrip.com/hotels/shivpuri-hotels.html');

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Extract the required data
    const hotels = [];
    $('.hotel-card').each((index, element) => {
      const hotelName = $(element).find('.hotel-name').text().trim();
      const hotelPrice = $(element).find('.price').text().trim();
      hotels.push({ hotelName, hotelPrice });
    });

    console.log(hotels); // Output the extracted hotel data
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

scrapeHotels();
