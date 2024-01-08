// getUserDataFromDatabase.js

import axios from 'axios';

export async function getUserDataFromDatabase(setCallBackFunction) {
    try{
        const config = {
            method: "GET",
            url: "http://localhost:8080/api/getuserdata",
            headers: {
                "Content-Type": "multipart/form-data",
        }
    };
    const response = await axios(config);
    setCallBackFunction(response.data.message); // Set the state with der fetched data

    } catch (error) {
        console.error(error);
    }
}