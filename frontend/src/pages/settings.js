//settings.js

import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { TbDoorExit } from "react-icons/tb";
import {jwtDecode} from 'jwt-decode';
import showNotifications from "../components/showNotifications/showNotifications";
import updateUserInDatabase from "../utils/updateUserInDatabase";

//Styled Components
import { Title } from "../styledComponents/title";
import { SubTitle } from "../styledComponents/subTitle";
import { MainContainer } from "../styledComponents/mainContainer";
import { ProfileInfoGrid } from "../styledComponents/profileInfoGrid";

import { InputField } from "../styledComponents/inputField";
import { Boxtitle } from "../styledComponents/boxtitle";
import { WideButton } from "../styledComponents/wideButton";
import { birbImages } from "../assets/birbs/birbsimgs";
import { Button } from "../styledComponents/button";

//Costum Hooks
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";


import {Select, MenuItem} from "@mui/material";

export default function Settings({handleLogout}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
    const [value, setValue] = React.useState(0);

    function handleClickLogoutButton() {
      handleLogout();
    }

    const { userData, setUserData } = useMongoDBUserData([]);

    useEffect(() => {
      if (userData) {
      }
    }, [userData]);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);

    const user = userData.find(user => user.id === decodedToken.id);
    const avatarUrl = user ? user.avatarUrl : null;
    const username = user ? user.username : null;

    const newUsername = useRef();
    const password1 = useRef();
    const password2 = useRef();
    const notificationTime = useRef();
    const newAvatarUrl = useRef();

    function saveSettings(event) {
      event.preventDefault();
      console.log("saveSettings");
      console.log(newUsername.current.value);
      console.log(password1.current.value);
      console.log(password2.current.value);
      console.log(value);
      console.log(notificationTime.current.value);
      console.log(newAvatarUrl.current.files[0]);
      console.log(decodedToken.id);

      if (password1.current.value !== password2.current.value) {
        showNotifications("Passwords do not match!", "error");
        return;
      }

      const formData = new FormData();
      formData.append('newAvatar', newAvatarUrl.current.files[0]);
      formData.append('newUsername', newUsername.current.value);
      formData.append('newPassword', password1.current.value);
      formData.append('theme', value);
      formData.append('notificationTime', notificationTime.current.value);
      formData.append('userId', decodedToken.id);

      updateUserInDatabase(formData);

    }


  return (
    <div>
      <Title>Personal Settings</Title>

      <WideButton onClick={handleClickLogoutButton}><span>Logout <TbDoorExit /></span></WideButton>
     


      <ProfileInfoGrid>
      <div className="avatar"> <img className="writeImg" src={avatarUrl} alt={username}></img></div>
    <div className="username">{username}</div>
    <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="avatar"
            ref={newAvatarUrl}
          />
          <label htmlFor="file">
            <Button className="button">change your<br/>Profile Picture</Button>
          </label>
    </ProfileInfoGrid>

      <SubTitle>Username</SubTitle>
        <MainContainer>
            <Boxtitle>new username</Boxtitle>
            <InputField>
                <input className="" ref={newUsername} minLength="3"
              maxLength="20"></input>
             </InputField>
        </MainContainer>

        <SubTitle>Password</SubTitle>
        <MainContainer>
            <Boxtitle>new password</Boxtitle>
            <InputField>
                <input  type="password" className="" ref={password1} minLength="6"
              maxLength="60"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"></input>
             </InputField>
        </MainContainer>
        <MainContainer>
            <Boxtitle>repeat new password</Boxtitle>
            <InputField>
                <input type="password" className="" ref={password2} minLength="6"
              maxLength="60"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"></input>
             </InputField>
        </MainContainer>

        <SubTitle>Theme</SubTitle>
        <MainContainer>
            <Boxtitle>select a different Theme</Boxtitle>
            <Select 
  labelId="select-label"
  className="select"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  sx={{
    marginTop: "15px",
    height: 50,
    width: '100%',
    fontFamily: "var(--fontFamily)",
    fontWeight: "800",
    borderRadius: '15px',
    backgroundColor: "var(--textOnButton)",
    color: "var(--textOnBright)",
  }}
  MenuProps={{
    PaperProps: {
      sx: {
        backgroundColor: 'var(--textOnButton)',
        borderRadius: '15px',

      },
    },
  }}
>
  <MenuItem disabled value={null}>
    Choose a Theme
  </MenuItem>
  <MenuItem value={"sunriseSunset-theme"}>Sunrise/Sunset Theme</MenuItem>
  <MenuItem value={"dracula-theme"}>Dracula Theme</MenuItem>
</Select>
        </MainContainer>

        <SubTitle>Time - Notification</SubTitle>
        <MainContainer>
            <Boxtitle>select a time for your 3LB-Notification</Boxtitle>
            <InputField>
                <input type="time" ref={notificationTime}></input>
             </InputField>
        </MainContainer>

        <WideButton onClick={saveSettings}>Save the Settings</WideButton>


    </div>
  );
}
