import axios from 'axios';
import { load } from 'cheerio';

export const scrapeTrainData = async (from, to) => {
  try {
    const url = `https://www.makemytrip.com/railways/${from}-${to}-train-tickets.html`;
    const { data } = await axios.get(url);
    const $ = load(data);  // Use load() from cheerio
    
    const trains = [];
    
    $('li.trainList').each((index, element) => {
      const trainName = $(element).find('.trainName').text().trim() || "N/A";
      const trainNumber = $(element).find('.trainNumber').text().trim() || "N/A";
      const departureTime = $(element).find('.startDepartTime .timeText').first().text().trim() || "N/A";
      const departureStation = $(element).find('.startDepartTime .stationName').first().text().trim() || "N/A";
      const arrivalTime = $(element).find('.startDepartTime .timeText').last().text().trim() || "N/A";
      const arrivalStation = $(element).find('.startDepartTime .stationName').last().text().trim() || "N/A";
      const travelTime = $(element).find('.travelHrs').text().trim() || "N/A";
      const travelDistance = $(element).find('.travelHrs .durationPart .value').last().text().trim() || "N/A";

      // Scraping the departure days
      const departDaysText = $(element).find('.trainInfo .departsDays .weeklySchedule');
      const departDays = departDaysText.map((i, el) => $(el).text().trim()).get().join(", ");
      
      if (trainName !== "N/A" && trainNumber !== "N/A" && departureTime !== "N/A" && departureStation !== "N/A") {
        trains.push({
          trainName,
          trainNumber,
          departureTime,
          departureStation,
          arrivalTime,
          arrivalStation,
          travelTime,
          travelDistance,
          departDays 
        });
      }
    });

    return trains;
  } catch (error) {
    console.error('Error scraping train data:', error);
    return [];
  }
};
