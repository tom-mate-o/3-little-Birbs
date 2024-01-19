import React from "react";

import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { addPostToDatabaseConfig } from "../utils/addPostToDatabaseConfig";
import uuid4 from "uuid4";
import {DateTime} from "luxon";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

//Styled Components
import { useEffect } from "react";
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

//Costum Hooks
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";

export default function NewPost() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goodthing1 = useRef(null);
  const goodthing2 = useRef(null);
  const goodthing3 = useRef(null);
  const message = useRef(null);
  const navigate = useNavigate();

 

  const getRandomBirbNumber = () => {
    let birbNumber = Math.floor(Math.random() * 20) + 1;
    return birbNumber.toString().padStart(2, '0');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  useEffect(() => {
    setBirbImageBirb1(birbImages[birbImageName1]);
  }, [birbImageName1]);
  
  useEffect(() => {
    setBirbImageBirb2(birbImages[birbImageName2]);
  }, [birbImageName2]);
  
  useEffect(() => {
    setBirbImageBirb3(birbImages[birbImageName3]);
  }, [birbImageName3]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const username = user ? user.username : null;

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




  async function handleClickPost(e) {
    e.preventDefault();

    const id = uuid4();
    const currentDate = DateTime.now().toISO();

    const newPost = {
      id: id,
      date: currentDate,
      public: true,
      private: false,
      poster: username,
      posterID: decodedToken.id,
      reciever: "Public",
      birb1: birbImageName1,
      goodthing1: goodthing1.current.value,
      birb2: birbImageName2,
      goodthing2: goodthing2.current.value,
      birb3: birbImageName3,
      goodthing3: goodthing3.current.value,
      message: message.current.value,
    };
  

   

   const success = await addPostToDatabaseConfig(newPost);

    if (success) {
      
   navigate("/postsuccessful", { 
    state: { 
      birbImageBirb1: birbImageBirb1, 
      birbImageBirb2: birbImageBirb2, 
      birbImageBirb3: birbImageBirb3 
    }});
    }
  }

  async function handleClickPostFriend(e) {
    e.preventDefault();

   navigate("/posttoafriend", { 
    state: { 
      birbImageBirb1: birbImageBirb1,
      birbImageName1: birbImageName1,
      goodthing1: goodthing1.current.value, 
      birbImageBirb2: birbImageBirb2, 
      birbImageName2: birbImageName2,
      goodthing2: goodthing2.current.value,
      birbImageBirb3: birbImageBirb3,
      birbImageName3: birbImageName3, 
      goodthing3: goodthing3.current.value,
      message: message.current.value,
    }

    

    });

    console.log(birbImageName1, birbImageName2, birbImageName3);
  };




  return (
    <div>
      <Title>
        Send 3 little Birbs
        <br />
        into the wild
      </Title>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          write 3 good things that happend to you today,
          <br /> add a kind messageand send the birds into the wild.
        </div>
      </InfoContainer>
      <MainContainer>
        <Boxtitle>Type your text into the white boxes</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img
              className="birdImg"
              src={birbImageBirb1}
              alt={birbAltTexts[birbImageName1]}
              onClick={handleBirbImage1Click}
            ></img>
          </div>
          <InputGoodThing>
            <textarea ref={goodthing1} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img
              className="birdImg"
              src={birbImageBirb2}
              alt={birbAltTexts[birbImageName2]}
              onClick={handleBirbImage2Click}
            ></img>{" "}
          </div>
          <InputGoodThing>
            <textarea ref={goodthing2} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img
              className="birdImg"
              src={birbImageBirb3}
              alt={birbAltTexts[birbImageName3]}
              onClick={handleBirbImage3Click}
            ></img>{" "}
          </div>

          <InputGoodThing>
            <textarea ref={goodthing3} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>

        <Boxtitle>write a kind message for this person</Boxtitle>

        <HighlightedContainer>
          <InputGoodThing>
            <textarea ref={message} required
              minLength="3"
              maxLength="100"></textarea>
          </InputGoodThing>
        </HighlightedContainer>
      </MainContainer>

      <div className="buttonContainer">
        <SmallButtons onClick={handleClickPost}>
          <img
            className="writeImg"
            src={birbImages.newpostbutton}
            alt="hi"
          ></img>
          <p>send them out into the wild</p>
        </SmallButtons>

        <SmallButtons onClick={handleClickPostFriend}>
            <img className="writeImg" src={birbImages.pigeon} alt="hi"></img>
            <p>choose a friend and guide them with a post pigeon</p>
        </SmallButtons>
      </div>
    </div>
  );
}
