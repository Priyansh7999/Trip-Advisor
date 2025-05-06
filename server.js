// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
