import axios from "axios";
import showNotifications from "../components/showNotifications/showNotificationsToastify";

export default async function registerUserToDatabase(formData) {
    try{
        const config = {
            method: "POST",
            url: "http://localhost:8080/api/register",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
        };
        const response = await axios(config);
        console.log(response.data);
        if (response.status === 201){
            showNotifications("Registration successful! \nWelcome to 3LB! 🐦", "success");
        }
        return true; // User Data was successfully added to the database
        //navigate("/login");
    } catch (error) {
        console.error("Fetch in Frontend failed!", error);
        if (error.response.status === 409){
            showNotifications("Username already taken!", "warn");
        } else if (error.response.status === 422){
            showNotifications("Email already taken!", "warn");
        } else if (error.response.status === 400){
            showNotifications("Required Field is missing!", "warn");
        } else {
            showNotifications("Registration failed!", "error");
        }
        return false; // User Data was not added to the database
    }
}