import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


//Costum Hooks
import useMongoDBData from "../costumHooks/useMongoDBData";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const {poolPosts, setPoolPosts} = useMongoDBData();

  if (!poolPosts || poolPosts.length === 0) {
    return <MainContainer>
      <div><img className="birdImg" src={birbImages.pecking_animation} alt="birb1"></img>...Loading...</div>
    </MainContainer>
  }

  const randomPost = poolPosts[Math.floor(Math.random() * poolPosts.length)];

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
        <Boxtitle>3 little Birbs from a Stranger</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages[randomPost.birb1]} alt="birb1"></img>
          </div>
          <div>{randomPost.goodthing1}</div>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdRight>
          <div>{randomPost.goodthing2}</div>
          <div>
            <img className="birdImg" src={birbImages[randomPost.birb2]} alt="birb2"></img>
          </div>
        </GoodThingContainerBirdRight>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages[randomPost.birb3]} alt="birb3"></img>
          </div>
          <div>{randomPost.goodthing3}</div>
        </GoodThingContainerBirdLeft>

        <Boxtitle>a message from that Person</Boxtitle>

        <HighlightedContainer>
          <p>{randomPost.message}</p>
        </HighlightedContainer>
      </MainContainer>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          What was good about today? <br/>Name 3 things, and send them to strangers,
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
