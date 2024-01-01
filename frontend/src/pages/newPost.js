import React from "react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { addPostToDatabaseConfig } from "../utils/addPostToDatabaseConfig";
import uuid4 from "uuid4";
import {DateTime} from "luxon";

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

  const goodthing1 = useRef(null);
  const goodthing2 = useRef(null);
  const goodthing3 = useRef(null);
  const message = useRef(null);

 

  const getRandomBirbNumber = () => {
    let birbNumber = Math.floor(Math.random() * 20) + 1;
    return birbNumber.toString().padStart(2, '0');
  };

  const [birbImageName1, setBirbImageName1] = useState(`bigBirb${getRandomBirbNumber()}`);
  const [birbImageBirb1, setBirbImageBirb1] = useState(birbImages[birbImageName1]);

  const [birbImageName2, setBirbImageName2] = useState(`bigBirb${getRandomBirbNumber()}`);
  const [birbImageBirb2, setBirbImageBirb2] = useState(birbImages[`bigBirb${getRandomBirbNumber()}`]);
  
  const [birbImageName3, setBirbImageName3] = useState(`bigBirb${getRandomBirbNumber()}`);
  const [birbImageBirb3, setBirbImageBirb3] = useState(birbImages[`bigBirb${getRandomBirbNumber()}`]);

  const birbAltTexts = {
    bigBirb01: "bigBirb01",
    bigBirb02: "bigBirb02",
    bigBirb03: "bigBirb03",
    bigBirb04: "bigBirb04",
    bigBirb05: "bigBirb05",
    bigBirb06: "bigBirb06",
    bigBirb07: "bigBirb07",
    bigBirb08: "bigBirb08",
    bigBirb09: "bigBirb09",
    bigBirb10: "bigBirb10",
    bigBirb11: "bigBirb11",
    bigBirb12: "bigBirb12",
    bigBirb13: "bigBirb13",
    bigBirb14: "bigBirb14",
    bigBirb15: "bigBirb15",
    bigBirb16: "bigBirb16",
    bigBirb17: "bigBirb17",
    bigBirb18: "bigBirb18",
    bigBirb19: "bigBirb19",
    bigBirb20: "bigBirb20",
  }

  const handleBirbImage1Click = () => {
    let newBirbImageName = `bigBirb${getRandomBirbNumber()}`;
    setBirbImageName1(newBirbImageName);
    setBirbImageBirb1(birbImages[newBirbImageName]);
    console.log(newBirbImageName);
  };

  const handleBirbImage2Click = () => {
    let newBirbImageName = `bigBirb${getRandomBirbNumber()}`;
    setBirbImageName2(newBirbImageName);
    setBirbImageBirb2(birbImages[newBirbImageName]);
    console.log(newBirbImageName);
  }

  const handleBirbImage3Click = () => {
    let newBirbImageName = `bigBirb${getRandomBirbNumber()}`;
    setBirbImageName3(newBirbImageName);
    setBirbImageBirb3(birbImages[newBirbImageName]);
    console.log(newBirbImageName);
  }




  function handleClick(e) {
    e.preventDefault();
    const postBirb1 = birbImageName1;
    const postGoodThing1 = goodthing1.current.value;
    const postBirb2 = birbImageName2;
    const postGoodThing2 = goodthing2.current.value;
    const postBirb3 = birbImageName3;
    const postGoodThing3 = goodthing3.current.value;
    const postMessage = message.current.value;
    const id = uuid4();
    const currentDate = DateTime.now().toISO();

    console.log(postBirb1);
    console.log(postGoodThing1);
    console.log(postBirb2);
    console.log(postGoodThing2);
    console.log(postBirb3);
    console.log(postGoodThing3);
    console.log(postMessage);

    const newPost = {
      id: id,
      date: currentDate,
      public: true,
      private: false,
      poster: "me",
      reciever: "you",
      birb1: birbImageName1,
      goodthing1: goodthing1.current.value,
      birb2: birbImageName2,
      goodthing2: goodthing2.current.value,
      birb3: birbImageName3,
      goodthing3: goodthing3.current.value,
      message: message.current.value,
    };
  
   addPostToDatabaseConfig(newPost);

  };




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
          <img className="birdImg" src={birbImageBirb1} alt={birbAltTexts[birbImageName1]} onClick={handleBirbImage1Click}></img>
          </div>
          <InputGoodThing><textarea ref={goodthing1}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
        <div>
        <img className="birdImg" src={birbImageBirb2} alt={birbAltTexts[birbImageName2]} onClick={handleBirbImage2Click}></img>          </div>
          <InputGoodThing><textarea ref={goodthing2}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
          <img className="birdImg" src={birbImageBirb3} alt={birbAltTexts[birbImageName3]} onClick={handleBirbImage3Click}></img>          </div>
         
          <InputGoodThing><textarea ref={goodthing3}></textarea></InputGoodThing>
        </GoodThingContainerBirdLeft>

        <Boxtitle>write a kind message for this person</Boxtitle>

        <HighlightedContainer>
        <InputGoodThing><textarea ref={message}></textarea></InputGoodThing>
        </HighlightedContainer>
      </MainContainer>


      <div className="buttonContainer">
        <SmallButtons onClick={handleClick}>
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
