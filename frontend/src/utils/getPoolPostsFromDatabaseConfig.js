//getPoolPostsFromDatabaseConfig.js

import axios from 'axios';

export async function getPoolPostsFromDatabaseConfig(setCallbackFunction) {
  try {
    const config = {
        method: "get",
        url: "http://localhost:8080/api/getPool",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios(config);
    setCallbackFunction(response.data); // Set the State with the fetched data
  } catch (error) {
    console.error("Fetching data from backend failed!");
  }
}
