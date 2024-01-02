import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { SubTitle } from "../styledComponents/subTitle";
import { MainContainer } from "../styledComponents/mainContainer";

import { InputFriendCode } from "../styledComponents/inputFriendCode";
import { Boxtitle } from "../styledComponents/boxtitle";
import { MessageContainer } from "../styledComponents/messageContainer";
import { FriendListGrid } from "../styledComponents/friendListGrid";

import { birbImages } from "../assets/birbs/birbsimgs";
import { HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";

export default function AddAFriend() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div>
      <Title>Add a Friend</Title>
     
      <MainContainer>
        <Boxtitle>Your Friend-Code</Boxtitle>
        
        <MessageContainer>
            <div className="friendCodeFlex">
                <h1>XXX-XXX-XXX</h1>
                <HiOutlineClipboard className="clipboardIcon"/>
            </div>
        </MessageContainer>

      </MainContainer>

      <MainContainer>
        <Boxtitle>Insert a Friend Code, to add a Friend</Boxtitle>
        
        <MessageContainer>
       
        <InputFriendCode>
        <div className="insertCodeFlex">
        <input className="friendcode"></input>
        <HiOutlineUserAdd className="addfriendIcon"/>
        </div>
        </InputFriendCode>
       
        </MessageContainer>
  
      </MainContainer>

      <SubTitle>Your Birb Friends</SubTitle>

      <MainContainer>
        <FriendListGrid>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="name">Name</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="name">Name</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="name">Name</div>
    <div className="deleteButton"><HiOutlineXCircle /></div>
    </FriendListGrid>
      </MainContainer>



    </div>
  );
}
