import React from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { NotificationGrid } from "../styledComponents/notificationGrid";

import { birbImages } from "../assets/birbs/birbsimgs";
import { HiOutlineXCircle } from "react-icons/hi";


export default function Notifications() {
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



    </div>
  );
}
