export async function getFriends(decodedTokenId) {
    const response = await fetch("http://localhost:8080/api/getFriends", {
      headers: {
        "decoded-token": decodedTokenId,
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.friendUsernames.map((username, index) => ({
      username,
      avatarUrl: data.friendAvatars[index]
    }));
  }