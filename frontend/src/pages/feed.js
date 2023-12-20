import React from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { GoodThingContainerBirdLeft } from "../styledComponents/goodThingContainerBirdLeft";
import { GoodThingContainerBirdRight } from "../styledComponents/goodThingContainerBirdRight";
import { Button } from "../styledComponents/button";
import { HighlightedContainer } from "../styledComponents/hightlightedContainer";
import { InfoContainer } from "../styledComponents/infoContainer";
import { Boxtitle } from "../styledComponents/boxtitle";

import { HiOutlineLightBulb } from "react-icons/hi";
import { birbImages } from "../assets/birbs/birbsimgs";

export default function Feed() {
  return (
    <div>
      <Title>Feed</Title>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          3 little Birbs fluttered to your doorstep. <br />
          They brought 3 good things and kind words with them.
        </div>
      </InfoContainer>
      <MainContainer>
        <Boxtitle>3 little Birbs from: NAME</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages.bigBirb17} alt="hi"></img>
          </div>
          <div>Nice cup of coffee in the sun</div>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdRight>
          <div>Had a lovely walk with my best friend</div>
          <div>
            <img className="birdImg" src={birbImages.bigBirb18} alt="hi"></img>
          </div>
        </GoodThingContainerBirdRight>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages.bigBirb19} alt="hi"></img>
          </div>
          <div>Got a piece of cake at work today</div>
        </GoodThingContainerBirdLeft>

        <Boxtitle>a message from NAME</Boxtitle>

        <HighlightedContainer>
          <p>If life gives you lemons, make some kind of fruity juice.</p>
        </HighlightedContainer>
      </MainContainer>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          What was good about today? Name 3 things, and send them to strangers,
          or to a friend.
        </div>
      </InfoContainer>

      <div className="buttonContainer">
        <Button>
          <NavLink to="/newpost">
            <img className="writeImg" src={birbImages.writebutton} alt="hi"></img>
            <p>send your own 3 little Birbs out into the wild or to a friend of yours</p>
            </NavLink>
            </Button>
      </div>
    </div>
  );
}
