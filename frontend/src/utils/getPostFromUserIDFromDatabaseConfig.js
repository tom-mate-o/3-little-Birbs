//getPostsFromUserIDFromDataBaseConfig.js

import axios from 'axios';

export async function getPostFromUserIDFromDatabaseConfig(userId) {
  try {
    const config = {
        method: "POST",
        url: "http://localhost:8080/api/getPostsFromUserId",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            userId: userId
        },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Fetching data from backend failed!");
    return [];
  }
}
