import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { HighlightedContainer } from "../styledComponents/hightlightedContainer";
import { Boxtitle } from "../styledComponents/boxtitle";

import { birbImages } from "../assets/birbs/birbsimgs";

export default function PostToAFriendSuccessful() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div>
      <Title>Off they go,<br/>to your friend!</Title>

      <MainContainer>
        <Boxtitle>3 little Birbs guided by a post pigeon<br/>for: NAME</Boxtitle>

        <HighlightedContainer>
        <div className="birbsInACollumn">
        <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
        <img className="birdImg" src={birbImages.bigBirb20} alt="hi"></img>
        <img className="birdImg" src={birbImages.bigBirb15} alt="hi"></img>
        <img className="birdImg" src={birbImages.bigBirb02} alt="hi"></img>
        </div>
        </HighlightedContainer>
        <Boxtitle>Your Posting was successful!</Boxtitle>
      </MainContainer>
     
    </div>
  );
}
