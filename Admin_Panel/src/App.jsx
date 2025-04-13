import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Pages/DashBoard/Dashboard';
import CityDetails from './Pages/Cities/CityDetails';
import Hotel from './Pages/Hotels/Hotel';
import Restaurant from './Pages/Restaurant/Restaurant';
import Places from './Pages/Places/Places';
import HomePage from './Pages/HomePage/HomePage';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Cities" element={<CityDetails />} />
          <Route path='/Hotels' element={<Hotel/>} />
          <Route path='/Restaurants' element={<Restaurant />} />
          <Route path='/Places' element={<Places />} />
        </Route>
      </Routes>
    </Router>
  );
}
