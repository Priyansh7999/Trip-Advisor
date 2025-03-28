const axios = require('axios');

const url = 'https://api.makcorps.com/citysearch/{cityname}/{page}/{currency}/{num_of_rooms}/{num_of_adults}/{check_in_date}/{check_out_date}';
const apiKey = 'YOUR-API-KEY';

const cityname = 'London';
const page = '0';
const currency = 'USD';
const num_of_rooms = '1';
const num_of_adults = '3';
const check_in_date = '2023-10-03';
const check_out_date = '2023-10-04';

const formattedUrl = url
  .replace('{cityname}', cityname)
  .replace('{page}', page)
  .replace('{currency}', currency)
  .replace('{num_of_rooms}', num_of_rooms)
  .replace('{num_of_adults}', num_of_adults)
  .replace('{check_in_date}', check_in_date)
  .replace('{check_out_date}', check_out_date);

const urlWithApiKey = `${formattedUrl}?api_key=${apiKey}`;

axios
  .get(urlWithApiKey)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
