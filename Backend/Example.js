const puppeteer = require('puppeteer');

(async () => {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false }); // Set to false for debugging
    const page = await browser.newPage();

    // Open the target URL
    await page.goto('https://www.nativeplanet.com/trains/from-guna-to-gwalior-jn/', {
        waitUntil: 'networkidle2',
        timeout: 0
    });

    // Wait for the train list to appear
    await page.waitForSelector('.train-list-row', { timeout: 10000 });

    // Scrape train data
    const trains = await page.evaluate(() => {
        let trainList = [];
        document.querySelectorAll('.train-list-row').forEach(train => {
            let trainNumber = train.querySelector('.train-no')?.innerText.trim() || 'N/A';
            let trainName = train.querySelector('.train-name a')?.innerText.trim() || 'N/A';
            let departureTime = train.querySelector('.departure-time')?.innerText.trim() || 'N/A';
            let arrivalTime = train.querySelector('.arrival-time')?.innerText.trim() || 'N/A';
            let travelTime = train.querySelector('.travel-time')?.innerText.trim() || 'N/A';
            let frequency = train.querySelector('.train-days')?.innerText.trim() || 'N/A';

            trainList.push({ trainNumber, trainName, departureTime, arrivalTime, travelTime, frequency });
        });
        return trainList;
    });

    console.log('Scraped Train Data:', trains);

    await browser.close();
})();
