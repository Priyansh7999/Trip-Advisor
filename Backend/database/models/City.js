const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  basicInfo: {
    CityName: { type: String, required: true },
    CityState: { type: String, required: true },
    CityTitle: { type: String, required: true },
    CityBriefDesc: { type: String, required: true },
    CityDetailedDesc: { type: String, required: true },
    CityCategory: { type: String, required: true },
  },
  history: {
    History: { type: String },
    EstablishedYear: { type: Number },
  },
  seasons: {
    PeakSeason: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      whatToExpect: { type: String },
      thingsYoullLove: { type: String },
    },
    ModerateSeason: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      whatToExpect: { type: String },
      thingsYoullLove: { type: String },
    },
    OffSeason: {
      from: { type: String, required: true },
      to: { type: String, required: true },
      whatToExpect: { type: String },
      thingsYoullLove: { type: String },
    },
  },
  geographicalDetails: {
    Region: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    Location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
  tripDetails: {
    AverageTripLength: { type: Number, required: true },
    BestTimeToVisitCity: { type: String, required: true },
    WhenToVisitCity: { type: String, required: true },
  },
  accessibility: {
    HowToReach: {
      ByAir: { type: String, required: true },
      ByRail: { type: String, required: true },
      ByRoad: { type: String, required: true },
    },
  },
  localEvents: [
    {
      FestivalName: { type: String },
      Description: { type: String },
    },
  ],
  attractions: {
    CityIsFamousFor: {
      ImgUrl: { type: String, required: true },
      Name: { type: String, required: true },
      Desc: { type: String, required: true },
    },
  },
  experiences: {
    ThingsToSeeAndDo: { type: String, required: true },
    FoodToTryInPlacesToVisit: [
      {
        ImgUrl: { type: String, required: true },
        FoodName: { type: String, required: true },
        FoodDesc: { type: String, required: true },
      },
    ],
  },
  conclusion: { type: String },
});

module.exports = mongoose.model('City', citySchema);
