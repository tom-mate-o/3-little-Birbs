import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import {loadTheme} from './loadTheme';


const loadBackendResponse = async () => {

console.log(`${process.env.REACT_APP_BACKEND_URL}/health-check`)

  try{
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/health-check`);
    console.log("✅ Backend and frontend are connected!");
  } catch (error) {
    console.log("Error connecting with the Backend:", error);
  }
};


loadBackendResponse();
loadTheme();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


