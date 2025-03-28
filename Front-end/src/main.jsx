import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TripPlanner from '../src/context/index.jsx';
import "./app.css";
ReactDOM.createRoot(document.getElementById('root')).render(
    <TripPlanner>
        <App />
    </TripPlanner>
);
