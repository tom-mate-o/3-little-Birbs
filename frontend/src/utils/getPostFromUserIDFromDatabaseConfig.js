//getPostsFromUserIDFromDataBaseConfig.js

import axios from 'axios';

export async function getPostFromUserIDFromDatabaseConfig(userId) {
  try {
    const config = {
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/getPostsFromUserId`,
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
