import React from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { SubTitle } from "../styledComponents/subTitle";
import { MainContainer } from "../styledComponents/mainContainer";
import { ProfileInfoGrid } from "../styledComponents/profileInfoGrid";

import { InputField } from "../styledComponents/inputField";
import { Boxtitle } from "../styledComponents/boxtitle";
import { WideButton } from "../styledComponents/wideButton";
import { birbImages } from "../assets/birbs/birbsimgs";

import {Select, MenuItem} from "@mui/material";

export default function Settings() {
    const [value, setValue] = React.useState(0);

  return (
    <div>
      <Title>Personal Settings</Title>
     
      <ProfileInfoGrid>
      <div className="avatar"> <img className="writeImg" src={birbImages.testavatar} alt="testavatar"></img></div>
    <div className="username">Name</div>
    <div className="button">change your<br/>Profile Picture</div>
    </ProfileInfoGrid>

      <SubTitle>Username</SubTitle>
        <MainContainer>
            <Boxtitle>new username</Boxtitle>
            <InputField>
                <input className=""></input>
             </InputField>
        </MainContainer>

        <SubTitle>Password</SubTitle>
        <MainContainer>
            <Boxtitle>new password</Boxtitle>
            <InputField>
                <input  type="password" className=""></input>
             </InputField>
        </MainContainer>
        <MainContainer>
            <Boxtitle>repeat new password</Boxtitle>
            <InputField>
                <input type="password" className=""></input>
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
  <MenuItem disabled value={0}>
    Choose a Theme
  </MenuItem>
  <MenuItem value={1}>Red</MenuItem>
  <MenuItem value={2}>Black</MenuItem>
  <MenuItem value={3}>Blue</MenuItem>
  <MenuItem value={4}>Green</MenuItem>
  <MenuItem value={5}>Yellow</MenuItem>
</Select>
        </MainContainer>

        <SubTitle>Time - Notification</SubTitle>
        <MainContainer>
            <Boxtitle>select a time for your 3LB-Notification</Boxtitle>
            <InputField>
                <input type="time"></input>
             </InputField>
        </MainContainer>

        <WideButton>Save the Settings</WideButton>


    </div>
  );
}
