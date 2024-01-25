//getPostsWithMachtingIDFromDatabaseConfig.js

import axios from 'axios';

export async function getPostsWithMachtingIDFromDatabaseConfig(messages) {
  try {
    const config = {
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/getMatchingPostsMessages`,
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            recievedPostIDs: messages
        },
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Fetching data from backend failed!");
    return [];
  }
}
