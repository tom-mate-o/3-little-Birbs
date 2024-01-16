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
  if (!data || !data.friendcode || data.friendcode.length === 0) {
    return [];
  }
  return data.friendcode.map((friendcode, index) => ({
    friendcode: friendcode,
    username: data.friendUsernames[index],
    avatar: data.friendAvatars[index]
  }));
}