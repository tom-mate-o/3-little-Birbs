import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { GoodThingContainerBirdLeft } from "../styledComponents/goodThingContainerBirdLeft";
import { SmallButtons } from "../styledComponents/smallButtons";
import { HighlightedContainer } from "../styledComponents/hightlightedContainer";
import { InfoContainer } from "../styledComponents/infoContainer";
import { InputGoodThing } from "../styledComponents/inputGoodThing";
import { Boxtitle } from "../styledComponents/boxtitle";

import { HiOutlineLightBulb } from "react-icons/hi";
import { birbImages } from "../assets/birbs/birbsimgs";

import {Select, MenuItem} from "@mui/material";

export default function PostToAFriend() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const { birbImageBirb1, birbImageBirb2, birbImageBirb3, goodthing1, goodthing2,goodthing3, message } = location.state;
 
  return (
    <div>
      <Title>Send 3 little Birbs<br/>to a Friend</Title>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
       choose a friend to whom <br/>you want to send your Birbs.
        </div>
      </InfoContainer>

      <Select 
  labelId="select-label"
  className="select"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  sx={{
    marginTop: "15px",
    height: 50,
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
    Choose a friend
  </MenuItem>
  <MenuItem value={1}>Red</MenuItem>
  <MenuItem value={2}>Black</MenuItem>
  <MenuItem value={3}>Blue</MenuItem>
  <MenuItem value={4}>Green</MenuItem>
  <MenuItem value={5}>Yellow</MenuItem>
</Select>

      <MainContainer>
        <Boxtitle>3 little Birbs for: NAME</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImageBirb1} alt="hi"></img>
          </div>
          <InputGoodThing><textarea defaultValue={goodthing1}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
        <div>
            <img className="birdImg" src={birbImageBirb2} alt="hi"></img>
          </div>
          <InputGoodThing><textarea defaultValue={goodthing2}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImageBirb3} alt="hi"></img>
          </div>
         
          <InputGoodThing><textarea defaultValue={goodthing3}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>

        <Boxtitle>your message for NAME</Boxtitle>

        <HighlightedContainer>
        <InputGoodThing><textarea defaultValue={message}></textarea></InputGoodThing>
        </HighlightedContainer>
      </MainContainer>


      <div className="buttonContainer">

            <SmallButtons>
          <NavLink to="/posttoafriendsuccessful">
            <img className="writeImg" src={birbImages.pigeon} alt="hi"></img>
            <p>send a post pigeon</p>
            </NavLink>
            </SmallButtons>
      </div>
    </div>
  );
}
