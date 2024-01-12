import axios from "axios";
import showNotifications from "../components/showNotifications/showNotifications";

export async function compareLoginToDatabase(data){
    try{
        
        const config = {
            method: "POST",
            url: "http://localhost:8080/api/login",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        }
        const response = await axios(config);
        console.log(response.data);
        if (response.status === 200) {
            showNotifications("Login successful! 🐦", "success");
            return response.data; // Comparing User Data to DB was successful
        }
        

    }
    catch (error){
        console.error("Fetch in Frontend failed!", error);
        if (error.response.status === 401){
            showNotifications("Password is incorrect!", "warn");
        } else if (error.response.status === 404){
            showNotifications("User does not exist!", "warn");
        } else if (error.response.status === 400){
            showNotifications("Length of Username and/or \nPassword is incorrect!", "warn");
        } else {
            showNotifications("Login failed!", "error");
        }
        return false; // Comparing User Data to DB was not successful
    }
}