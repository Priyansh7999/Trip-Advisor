import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import HeroSection from './components/HeroSection/HeroSection';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Search from "./components/Search/Search";
import Trending from './components/Trending/Trending';
import AddCityDetails from './Pages/AddCityDetails/AddCityDetails';
import AllCityList from './Pages/AllCityList/AllCityList';
import SelectedCity from './Pages/SelectedCity/SelectedCity';
import PlanTripCategory from './Pages/PlanTripCategory/PlanTripCategory';
import Layout from './Layout';  
import PlanTripSelected from './Pages/PlanTripSelected/PlanTripSelected';
import MonthBased from './Pages/FilterByMonth/MonthBased';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import SplashCursor from './ui/SplashCursor';
import TrainSearch from './components/Search/TrainSearch';
import SelectedPlace from './Pages/SelectedPlace/SelectedPlace';
import PlanTripHomePage from './Pages/PlanTrip/HomePage/PlanTripHomePage';
import "./index.css"
import TripReview from './Pages/PlanTrip/TripReview/TripReview';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
export default function App() {
  return (
    <div>
<SplashCursor />
      <Router>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/hero" element={<HeroSection />} />
                        <Route path="/slider" element={<ImageSlider />} />
                        <Route path="/focus" element={<Trending />} />
                        <Route path="/cities" element={<AllCityList trending="trendingcity" />} />
                        <Route path="/places" element={<AllCityList trending="trendingplace" />} />
                        <Route path="/add-city" element={<AddCityDetails />} />
                        <Route path="/city/:cityName" element={<SelectedCity />} />
                        <Route path="/place/:cityName" element={<SelectedPlace />} />
                        <Route path="/PlanTripCategory" element={<PlanTripCategory />} />
                        <Route path="/PlanTripCategory/:placeName" element={<PlanTripSelected />} />
                        <Route path="/plantrip" element={<PlanTripHomePage />} />
                        <Route path="/plantrip/:from/:to" element={<TripReview />} />
                        <Route path="/month/:month" element={<MonthBased />} />
                        <Route path="/Search" element={<Search />} />
                        <Route path="/train" element={<TrainSearch />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Router>
    </div>
  )
}
