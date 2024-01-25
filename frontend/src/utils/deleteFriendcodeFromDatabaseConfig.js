import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export async function deleteFriendcodeFromDatabaseConfig(userId, friendcodeToDelete) {
    try{

        const config = {
            method: 'put',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/deleteFriends`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({userId, friendcodeToDelete})
        }
        const response = await axios(config);
        console.log(response.data.message);
        if (response.status === 201) {
            showNotifications("You're not Friends anymore... 😥", "success");
        } else {
            showNotifications("Error while deleting friend!", "error");
        }
        return true;

    } catch (error) {
        console.error("Fetch in Frontend failed", error);
        showNotifications("Error while deleting friend!", "error");

        return false;
    }
}