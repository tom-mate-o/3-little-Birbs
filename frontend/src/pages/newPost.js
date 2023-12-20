import React from "react";
import { NavLink } from "react-router-dom";

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

export default function NewPost() {
  return (
    <div>
      <Title>Send 3 little Birbs<br/>into the wild</Title>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
        write 3 good things that happend to you today,<br/> add a kind messageand send the birds into the wild.
        </div>
      </InfoContainer>
      <MainContainer>
        <Boxtitle>Type your text into the white boxes</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages.bigBirb17} alt="hi"></img>
          </div>
          <InputGoodThing><textarea></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
        <div>
            <img className="birdImg" src={birbImages.bigBirb18} alt="hi"></img>
          </div>
          <InputGoodThing><textarea></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages.bigBirb19} alt="hi"></img>
          </div>
         
          <InputGoodThing><textarea></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>

        <Boxtitle>write a kind message for this person</Boxtitle>

        <HighlightedContainer>
        <InputGoodThing><textarea></textarea></InputGoodThing>
        </HighlightedContainer>
      </MainContainer>


      <div className="buttonContainer">
        <SmallButtons>
          <NavLink to="/postsuccessful">
            <img className="writeImg" src={birbImages.newpostbutton} alt="hi"></img>
            <p>send them out into the wild</p>
            </NavLink>
            </SmallButtons>

            <SmallButtons>
          <NavLink to="/posttoafriend">
            <img className="writeImg" src={birbImages.pigeon} alt="hi"></img>
            <p>choose a friend and guide them with a post pigeon</p>
            </NavLink>
            </SmallButtons>
      </div>
    </div>
  );
}
