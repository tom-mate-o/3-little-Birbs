//updateNotificationReadInDatabase.js

import axios from "axios";
import showNotifications from "../components/showNotifications/showNotificationsToastify";

export default async function updateNotificationReadInDatabase(dataToUpdate) {
    try{

     
        const config = {
            method: "PUT",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/updateReadNotification`,
            headers: {
                "Content-Type": "application/json",
            },
            data: dataToUpdate,
        };
        const response = await axios(config);
    
        if (response.status === 201){
            showNotifications("Notification READ", "success");
        }
        return true; // User Data was successfully updatetd
    } catch (error) {

        showNotifications("Update Userdata failed!", "error");
        
        return false; //
    }
}