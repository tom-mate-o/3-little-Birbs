import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotificationsToastify';

export async function putFriendcodeToDatabaseConfig(friendCode, userId, friendCodeToAdd) {
    try{

        const data = {
            friendCode: friendCode,
            userId: userId,
            friendCodeToAdd: friendCodeToAdd
          };
          
          const config = {
            method: 'put',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/putFriends`,
            headers: {
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
          }
          
        const response = await axios(config);
        console.log(response.data.message);
        showNotifications("Friend added!", "success")
        return true;

    } catch (error) {
        console.error("Fetch in Frontend failed", error);
        if (error.response.status === 400) {
            showNotifications("Friendcode is not valid!", "warn");
        }
        if (error.response.status === 404) {
            showNotifications("User not found!", "warn");
        }
        if (error.response.status === 409) {
            showNotifications("Friend already in your friendlist! \nYou already are Besties! 😉", "warn");
        }
        if (error.response.status === 410) {
            showNotifications("You can't add yourself! 🙄", "warn");
            
        }

        return false;
    }
}