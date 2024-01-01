import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotifications';

export async function addPostToDatabaseConfig(newPost) {
    try{

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(newPost)
        }
        const response = await axios(config);
        console.log(response.data.message);
        showNotifications("Birbs have been sent!", "success")
        return true;
    } catch (error) {
        console.error("Fetch in Frontend failed", error);
        return false;
    }
}