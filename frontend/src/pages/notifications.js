import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import showNotifications from "../components/showNotifications/showNotifications";
import { jwtDecode } from "jwt-decode";
import { DateTime } from "luxon";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { NotificationGrid } from "../styledComponents/notificationGrid";

import { birbImages } from "../assets/birbs/birbsimgs";
import { HiOutlineXCircle } from "react-icons/hi";
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";
import { getPostsWithMachtingIDFromDatabaseConfig } from "../utils/getPostsWithMachtingIDFromDatabaseConfig";

export default function Notifications({ notifications, setNotifications }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData } = useMongoDBUserData();
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const UserID = decodedToken.id;

  console.log(notifications.filter((notification) => notification.id));

  useEffect(() => {
    const fetchPostNotifications = async () => {
      const messageIds = notifications
        .filter((notification) => notification.id)
        .map((notification) => notification.id);
      console.log(messageIds);
      const data = await getPostsWithMachtingIDFromDatabaseConfig(messageIds);
      console.log(data);
      if (data && data.length > 0) {
        setPosts(data);
      }
    };
    if (notifications && notifications.length > 0) {
      fetchPostNotifications();
    }
    console.log(posts);
  }, [notifications]);

  console.log(posts);

  // const handleShowNotification = (message, type) => {
  //   showNotifications(message, type);
  //   setNotifications(prevNotifications => [...prevNotifications, { id: Date.now(), message, type }]);
  // };

  return (
    <div>
      <Title>Notifications</Title>

      <MainContainer>
      {notifications.length > 0 ? (
    notifications.map((notification, index) => {
      const user = userData.find(
        (user) =>
          user.id === notification.id ||
          user.friendcode === notification.friendcode
      );
      const post = posts.find((post) => post.id === notification.id);
      return (
        <NotificationGrid key={index}>
          <div className="avatar">
            <img
              className="writeImg"
              src={
                user
                  ? user.avatarUrl
                  : post
                  ? userData.find((u) => u.id === post.posterID)?.avatarUrl
                  : ""
              }
              alt={user ? user.username : post ? post.poster : ""}
            />
              </div>
              <div className="time">
                {DateTime.fromISO(
                  user ? notification.date : post ? post.date : ""
                )
                  .setLocale("en")
                  .toRelative()}
              </div>
              <div className="event">
                {" "}
                {user
                  ? `${user.username} ${notification.message}`
                  : post
                  ? `${post.poster} ${notification.message}`
                  : ""}
              </div>
              <div className="deleteButton">
                <HiOutlineXCircle />
                </div>
        </NotificationGrid>
      );
    })
  ) : (
    <><img className="noMessages" src={birbImages.nomessages} alt="no notifications" /><h3>No Notifications</h3></>
  )}
</MainContainer>
    </div>
  );
}
