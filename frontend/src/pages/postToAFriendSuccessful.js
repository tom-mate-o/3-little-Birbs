import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const { birbImageBirb1, birbImageBirb2, birbImageBirb3, selectedFriendName } = location.state;

  
  return (
    <div>
      <Title>Off they go,<br/>to your friend!</Title>

      <MainContainer>
        <Boxtitle>3 little Birbs guided by a post pigeon<br/>for: {selectedFriendName}</Boxtitle>

        <HighlightedContainer>
        <div className="birbsInACollumn">
        <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
        <img className="birdImg" src={birbImageBirb1} alt="hi"></img>
        <img className="birdImg" src={birbImageBirb2} alt="hi"></img>
        <img className="birdImg" src={birbImageBirb3} alt="hi"></img>
        </div>
        </HighlightedContainer>
        <Boxtitle>Your Posting was successful!</Boxtitle>
      </MainContainer>
     
    </div>
  );
}
