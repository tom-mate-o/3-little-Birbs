import React, { useEffect, useState } from "react";
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
import updateNotificationReadInDatabase from "../utils/updateNotificationReadInDatabase";

export default function Notifications(props) {
  const {
    notifications,
    setNotifications,
    setParentNotifications,
    currentUserData,
    handleBellColorChange,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { userData, refetch } = useMongoDBUserData();
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const UserID = decodedToken.id;

  useEffect(() => {
    const fetchPostNotifications = async () => {
      const messageIds = notifications
        .filter((notification) => notification.id)
        .map((notification) => notification.id);
      const data = await getPostsWithMachtingIDFromDatabaseConfig(messageIds);
      if (data && data.length > 0) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    };
    if (notifications && notifications.length > 0) {
      fetchPostNotifications();
    }
  }, [notifications]);

  function handleDeleteFriendCodeNotification(friendcode) {
    updateNotificationReadInDatabase({
      userId: UserID,
      friendcode: friendcode,
    }).then(() => {
      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (notification) => notification.friendcode !== friendcode
        )
      );
      refetch();
    });
  }

  function handleDeletePosterIDNotification(postId) {
    updateNotificationReadInDatabase({
      userId: UserID,
      postId: postId,
    }).then(() => {
      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (notification) => notification.id !== postId
        )
      );
      refetch();
    });
  }

  useEffect(() => {
    // Wenn es Benachrichtigungen gibt, setzen Sie isBellRed auf true
    if (notifications.length > 0) {
      handleBellColorChange(true);
    } else {
      // Wenn es keine Benachrichtigungen gibt, setzen Sie isBellRed auf false
      handleBellColorChange(false);
    }
  }, [notifications, handleBellColorChange]);

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
                          ? user.avatarUrl
                          : birbImages.noavatar
                        : post
                        ? userData.find((u) => u.id === post.posterID)
                            ?.avatarUrl
                          ? userData.find((u) => u.id === post.posterID)
                              ?.avatarUrl
                          : birbImages.noavatar
                        : birbImages.noavatar
                    }
                    alt={user ? user.username : post ? post.poster : ""}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = birbImages.noavatar;
                    }}
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
                  <HiOutlineXCircle
                    onClick={() =>
                      post
                        ? handleDeletePosterIDNotification(post.id)
                        : handleDeleteFriendCodeNotification(user.friendcode)
                    }
                  />
                </div>
              </NotificationGrid>
            );
          })
        ) : (
          <>
            <img
              className="noMessages"
              src={birbImages.nomessages}
              alt="no notifications"
            />
            <h3>no notifications</h3>
          </>
        )}
      </MainContainer>
    </div>
  );
}
