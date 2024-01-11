//getPostsWithMachtingIDFromDatabaseConfig.js

import axios from 'axios';

export async function getPostsWithMachtingIDFromDatabaseConfig(messages) {
  try {
    const config = {
        method: "POST",
        url: "http://localhost:8080/api/getMatchingPostsMessages",
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
