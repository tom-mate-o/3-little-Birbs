import React from "react";
import { useEffect } from "react";
import { birbImages } from "../assets/birbs/birbsimgs";


//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";

import { HighlightedContainer } from "../styledComponents/hightlightedContainer";

import { Boxtitle } from "../styledComponents/boxtitle";


export default function NewotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




  return (
    <div>
      <Title>ERROR 404</Title>

      <MainContainer>
        <Boxtitle>Page not found</Boxtitle>

        <img className="noMessages" src={birbImages.pigeon404} alt="error404" />
        <Boxtitle>Take this pigeon away from the computer!!!</Boxtitle>
      </MainContainer>
     
    </div>
  );
}
