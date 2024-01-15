//updateUserInDatabase.js

import axios from "axios";
import showNotifications from "../components/showNotifications/showNotifications";

export default async function updateUserInDatabase(dataToUpdate) {
    try{

     
        const config = {
            method: "PUT",
            url: "http://localhost:8080/api/updateUser",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: dataToUpdate,
        };
        const response = await axios(config);
        console.log(response.data);
        if (response.status === 201){
            showNotifications("Update Userdata successful!", "success");
        }
        return true; // User Data was successfully updatetd
    } catch (error) {

        if (error.response.status === 409) {
            console.error("Response Error", error.response.data);
            showNotifications("Username already taken", "error");
        } else if (error.response.status === 400) { 
            showNotifications("Password does not meet the requirements!", "error");
        } else if (error.response.status === 401) { 
            showNotifications("Username must be between 3 and 20 characters!", "error");
    
        } else {
            showNotifications("Update Userdata failed!", "error");
        }
        return false; //
    }
}