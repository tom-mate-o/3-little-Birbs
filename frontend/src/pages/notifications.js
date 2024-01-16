import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import showNotifications from "../components/showNotifications/showNotifications";
import {jwtDecode} from 'jwt-decode';


//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { NotificationGrid } from "../styledComponents/notificationGrid";

import { birbImages } from "../assets/birbs/birbsimgs";
import { HiOutlineXCircle } from "react-icons/hi";
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";




export default function Notifications() {
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [notifications, setNotifications] = useState([]);


  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const UserID = decodedToken.id;

  const {userData} = useMongoDBUserData();

  useEffect(() => {
    if (userData) {
      // Finde die Daten des eingeloggten Benutzers
      const currentUserData = userData.find(user => user.id === UserID);
  
      if (currentUserData) {
        const newNotifications = [];
      
        // Überprüfen die recievedPostsIds, wenn sie existieren
        if (currentUserData.recievedPostsIds) {
          currentUserData.recievedPostsIds.forEach(post => {
            if (!post.read) {
              newNotifications.push({ id: post.id, message: "You've got a new message!", type: 'post' });
            }
          });
        }
      
        // Überprüfen die friendIds, wenn sie existieren
        if (currentUserData.friendIds) {
          currentUserData.friendIds.forEach(friend => {
            if (!friend.read) {
              newNotifications.push({ id: friend._id, message: 'You have a new friend!', type: 'friend' });
            }
          });
        }
      
        // Setze die neuen Benachrichtigungen
        setNotifications(newNotifications);
      }
    }
  }, [userData, UserID]); // Fügen UserID zu den Abhängigkeiten hinzu, damit der useEffect-Hook ausgeführt wird, wenn sich UserID ändert

  const handleShowNotification = (message, type) => {
    showNotifications(message, type);
    setNotifications(prevNotifications => [...prevNotifications, { id: Date.now(), message, type }]);
  };

  



  return (
    <div>
      <Title>Notifications</Title>
     

      <MainContainer>
  {notifications.map(notification => (
    <NotificationGrid key={notification.id}>
      <div className="avatar">
        <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img>
      </div>
      <div className="time">25 minutes ago</div>
      <div className="event">{notification.message}</div>
      <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
  ))}
</MainContainer>

    </div>
  );
}
