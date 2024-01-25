import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export async function addPostToDatabaseConfig(newPost) {
    try{

        const config = {
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/post`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newPost)
        }
        const response = await axios(config);
        console.log(response.data.message);
        if(response.status === 201){
            showNotifications("Birbs have been sent!", "success")
        return true;
        }
    } catch (error) {
        if(error.response.status === 400){
            showNotifications("Fields cannot be empty!", "warn")
            return false;
        }
        if(error.response.status === 401){
            showNotifications("Fields must be between 3 and 60 characters long!", "warn")
            return false;
        }
        if(error.response.status === 402){
            showNotifications("Message must be between 3 and 100 characters long!", "warn")
            return false;
        }
        if(error.response.status === 403){
            showNotifications("Reciever cannot be empty!", "warn")
            return false;
        }
        console.error("Fetch in Frontend failed", error);
        return false;
    }
}