import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import { putFriendcodeToDatabaseConfig } from "../utils/putFriendcodeToDatabaseConfig";
import { deleteFriendcodeFromDatabaseConfig } from "../utils/deleteFriendcodeFromDatabaseConfig";


//Styled Components
import { Title } from "../styledComponents/title";
import { SubTitle } from "../styledComponents/subTitle";
import { MainContainer } from "../styledComponents/mainContainer";

import { InputFriendCode } from "../styledComponents/inputFriendCode";
import { Boxtitle } from "../styledComponents/boxtitle";
import { MessageContainer } from "../styledComponents/messageContainer";
import { FriendListGrid } from "../styledComponents/friendListGrid";
import {WideButton, wideButton} from "../styledComponents/wideButton";

//Costum Hooks
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";
import { getFriends } from "../costumHooks/getFriends";


import { birbImages } from "../assets/birbs/birbsimgs";
import { HiOutlineXCircle } from "react-icons/hi";
import { HiOutlineUserAdd } from "react-icons/hi";
import { HiOutlineClipboard } from "react-icons/hi";

export default function AddAFriend() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const { userData, setUserData } = useMongoDBUserData([]);

 useEffect(() => {
  if (userData) {
  }
}, [userData]);


const token = localStorage.getItem("token");
const decodedToken = jwtDecode(token);

const user = userData.find(user => user.id === decodedToken.id);
const friendcode = user ? user.friendcode : null;

const [friends, setFriends] = useState([]);
const [confirmDelete, setConfirmDelete] = useState(false);
const [userId, setUserId] = useState(null);
const [friendcodeToDelete, setFriendcodeToDelete] = useState(null);


useEffect(() => {
  getFriends(decodedToken.id)
    .then(friends => {
      setFriends(friends);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}, []);

const friendCodeToAdd = useRef(null);

async function addFriend() {

const success = await putFriendcodeToDatabaseConfig(friendcode, decodedToken.id, friendCodeToAdd.current.value.toUpperCase());
  if (success) {
    const newFriends = await getFriends(decodedToken.id);
    setFriends(newFriends);
  }
}

async function deleteFriend(event, friend) {
  event.preventDefault();

  const username = friend.username;
  setUserId(decodedToken.id);
  setFriendcodeToDelete(friend.friendcode);

  setConfirmDelete(true);
}

  async function confirmDeleteFriend(){
    const success = await deleteFriendcodeFromDatabaseConfig(userId, friendcodeToDelete)
  
    if (success) {
      const newFriends = await getFriends(decodedToken.id);
      setFriends(newFriends);
    }
    setConfirmDelete(false);
  }
  






  
  return (
    <div>
      <Title>Add a Friend</Title>
     
      <MainContainer>
        <Boxtitle>Your Friend-Code</Boxtitle>
        
        <MessageContainer>
            <div className="friendCodeFlex">
                <h1>{friendcode}</h1>
                <HiOutlineClipboard className="clipboardIcon" onClick={()=> navigator.clipboard.writeText(friendcode)}/>
            </div>
        </MessageContainer>

      </MainContainer>

      <MainContainer>
        <Boxtitle>Insert a Friend Code, to add a Friend</Boxtitle>
        
        <MessageContainer>
       
        <InputFriendCode>
        <div className="insertCodeFlex">
          
        <input className="friendcode" ref={friendCodeToAdd} minLength="10"></input>
        
        <HiOutlineUserAdd className="addfriendIcon" onClick={addFriend}/>
        
        </div>
        </InputFriendCode>
       
        </MessageContainer>
  
      </MainContainer>

      <SubTitle>Your Birb Friends</SubTitle>

      <MainContainer>
      <FriendListGrid>
  {friends.map((friend, index) => (
    <React.Fragment key={index}>
      <div className="avatar">
        <img className="writeImg" src={friend.avatar || birbImages.noavatar } alt={friend.username} onError={(e)=>{e.target.onerror = null; e.target.src=birbImages.noavatar}} />
      </div>
      <div className="name">{friend.username}</div>

      <div className="deleteButton" onClick={(event) => deleteFriend(event, friend)}><HiOutlineXCircle /></div>
    </React.Fragment>
  ))}
</FriendListGrid>
      </MainContainer>

      {confirmDelete && <WideButton onClick={confirmDeleteFriend}>Confirm Delete</WideButton>}



    </div>
  );
}
