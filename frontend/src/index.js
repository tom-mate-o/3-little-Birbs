import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import {loadTheme} from './loadTheme';


const loadBackendResponse = async () => {



  try{
    const response = await axios.get('http://localhost:8080/health-check');
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


