import axios from 'axios';
import showNotifications from '../components/showNotifications/showNotifications';

export async function putPostIdToUserConfig(id, selectedFriendName) {
    try{

        const config = {
            method: 'put',
            url: 'http://localhost:8080/api/putPostIdToUser',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ id: id, selectedFriendName: selectedFriendName })        }
        const response = await axios(config);
        console.log(response.data.message);
        showNotifications("Pigeon sent to " + selectedFriendName, "success")
        return true;

    } catch (error) {
        console.error("Fetch in Frontend failed", error);
        if (error.response.status === 400) {
            showNotifications("Something went wrong...", "error");
        }

        return false;
    }
}