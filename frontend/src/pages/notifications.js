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




export default function Notifications() {
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [notifications, setNotifications] = useState([]);
  const [messageCount, setMessageCount] = useState(0);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const UserID = decodedToken.id;


  const handleShowNotification = (message, type) => {
    showNotifications(message, type);
    setNotifications(prevNotifications => [...prevNotifications, { id: Date.now(), message, type }]);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/getMessagesCount', {
      headers: {
        'decoded-token': UserID
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.messagesCount > messageCount) {
          showNotifications('Sie haben eine neue Nachricht', 'info');
        }
        setMessageCount(data.messagesCount);
        console.log('messageCount nach fetch:', data.messagesCount); // Protokollieren Sie messageCount nach dem fetch
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Nachrichtenanzahl:', error);
      });
  }, [messageCount]);

  return (
    <div>
      <Title>Notifications</Title>
     

      <MainContainer>
        <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
    <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
    <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
    <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
    <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
    <NotificationGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="time">25 minutes ago</div>
    <div className="event">Name added you as a friend</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </NotificationGrid>
      </MainContainer>

      <div>
      <button onClick={() => handleShowNotification('Info Nachricht', 'info')}>Zeige Info Nachricht</button>
      <button onClick={() => handleShowNotification('Erfolg Nachricht', 'success')}>Zeige Erfolg Nachricht</button>
      <button onClick={() => handleShowNotification('Fehler Nachricht', 'error')}>Zeige Fehler Nachricht</button>
      <button onClick={() => handleShowNotification('Warnung Nachricht', 'warn')}>Zeige Warnung Nachricht</button>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            <span>id: {notification.id}</span>
            <p>message: {notification.message}</p>
            <p>type: {notification.type}</p>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
}
