const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeHotelDetails() {
  try {
    const url = 'https://www.makemytrip.com/hotels/shivpuri-hotels.html'; // Replace with the actual hotel page URL
    const { data } = await axios.get(url);

    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Hotel Name
    const hotelName = $('#hlistpg_hotel_name').text().trim();

    // Hotel Image
    const hotelImage = $('.imgGalleryCont img').attr('data-src');

    // Location
    const location = $('.addrContainer .blueText').first().text().trim();
    const distance = $('.addrContainer .latoRegular').first().text().trim();

    // Amenities
    const amenities = [];
    $('.persuasion__item.pc__amenity').each((index, element) => {
      const amenity = $(element).text().trim();
      amenities.push(amenity);
    });

    // Address
    const fullAddress = $('.tile__placeHolder.font12.pc__middle .pc__html').text().trim();

    // Combine all the extracted data
    const hotelData = {
      hotelName,
      hotelImage,
      location,
      distance,
      amenities,
      fullAddress
    };

    console.log(hotelData); // Output the extracted hotel data
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

scrapeHotelDetails();
