import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage';
import HeroSection from './components/HeroSection/HeroSection';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Search from "./components/Search/Search";
import Trending from './components/Trending/Trending';
import AddCityDetails from './Pages/AddCityDetails/AddCityDetails';
import SelectedCity from './Pages/SelectedCity/SelectedCity';
import PlanTripCategory from './Pages/PlanTripCategory/PlanTripCategory';
import Layout from './Layout';
import PlanTripSelected from './Pages/PlanTripSelected/PlanTripSelected';
import MonthBased from './Pages/FilterByMonth/MonthBased';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import SplashCursor from './ui/SplashCursor';
// import TrainSearch from './components/Search/TrainSearch';
import SelectedPlace from './Pages/SelectedPlace/SelectedPlace';
import PlanTripHomePage from './Pages/PlanTrip/HomePage/PlanTripHomePage';
import "./index.css"
import TripReview from './Pages/PlanTrip/TripReview/TripReview';
import UserPanel from './Pages/UserPanel/Userpanel';
import SelectedHotel from './Pages/SelectedHotel/SelectedHotel';
import AllCityList from './Pages/AllCityList/AllCityList';
import AllPlaceList from './Pages/AllCityList/AllPlaceList';
import Login from './Auth/Login';
import { ToastContainer } from 'react-toastify';
import Register from './Auth/Register';
import Profile from './Auth/Profile';
import { auth } from './Firebase/Firebase';
// import FlightSearch from './components/Search/FlightSearch';
// import "/index.css";
export default function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  }, [])
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/hero" element={<HeroSection />} />
            <Route path="/slider" element={<ImageSlider />} />
            <Route path="/focus" element={<Trending />} />
            <Route path="/cities" element={<AllCityList trending="trendingcity" />} />
            <Route path="/places" element={<AllPlaceList trending="trendingplace" />} />
            <Route path="/add-city" element={<AddCityDetails />} />
            <Route path="/city/:cityName" element={<SelectedCity />} />
            <Route path="/place/:placeName" element={<SelectedPlace />} />
            <Route path="/PlanTripCategory" element={<PlanTripCategory />} />
            <Route path="/PlanTripCategory/:placeName" element={<PlanTripSelected />} />
            <Route path='/hotel/:name' element={<SelectedHotel />} />
            <Route path="/plantrip" element={<PlanTripHomePage />} />
            <Route path="/month/:month" element={<MonthBased />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/login" element={user ? <Profile /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
          <Route path="/plantrip/:from/:to" element={<TripReview />} />
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  )
}
