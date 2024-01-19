import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import uuid4 from "uuid4";
import {DateTime} from "luxon";
import { useNavigate } from "react-router-dom";
import { addPostToDatabaseConfig } from "../utils/addPostToDatabaseConfig";
import { putPostIdToUserConfig } from "../utils/putPostIdToUserConfig";

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

//Costum Hooks
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";
import { getFriends } from "../costumHooks/getFriends";

import { Select, MenuItem } from "@mui/material";

export default function PostToAFriend() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const {
    birbImageBirb1,
    birbImageName1,
    birbImageBirb2,
    birbImageName2,
    birbImageBirb3,
    birbImageName3,
    goodthing1,
    goodthing2,
    goodthing3,
    message,
  } = location.state;

  console.log(birbImageName1, birbImageName2, birbImageName3);

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const username = user ? user.username : null;

  const [friends, setFriends] = React.useState([]);

  useEffect(() => {
    getFriends(decodedToken.id)
      .then((friends) => {
        setFriends(friends);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const [selectedFriend, setSelectedFriend] = useState("");
  const [selectedFriendName, setSelectedFriendName] = useState("");

  const handleFriendChange = (event) => {
    const friendIndex = parseInt(event.target.value, 10);
    setSelectedFriend(friendIndex);
    console.log(friends[friendIndex].username);
    setSelectedFriendName(friends[friendIndex].username);
    console.log(selectedFriendName);
  };

  const goodthing1Ref = useRef();
  const goodthing2Ref = useRef();
  const goodthing3Ref = useRef();
  const messageRef = useRef();

 
  async function handleClickPost(e) {
    e.preventDefault();

    const id = uuid4();
    const currentDate = DateTime.now().toISO();

    const newbirbImageName1 = birbImageName1;
    const newbirbImageName2 = birbImageName2;
    const newbirbImageName3 = birbImageName3;
  
    console.log("newbirbImageName1", newbirbImageName1, "newbirbImageName2", newbirbImageName2, "newbirbImageName3", newbirbImageName3);
  


    const newPost = {
      id: id,
      date: currentDate,
      public: false,
      private: true,
      poster: username,
      posterID: decodedToken.id,
      reciever: selectedFriendName,
      birb1: newbirbImageName1,
      goodthing1: goodthing1Ref.current.value,
      birb2: newbirbImageName2,
      goodthing2: goodthing2Ref.current.value,
      birb3: newbirbImageName3,
      goodthing3: goodthing3Ref.current.value,
      message: messageRef.current.value,
    };

    console.log(birbImageName1, birbImageName2, birbImageName3);


    const success = await addPostToDatabaseConfig(newPost);
    

    if (success) {
    await putPostIdToUserConfig(id, selectedFriendName);
    navigate("/posttoafriendsuccessful", { 
      state: { 
        birbImageBirb1: birbImageBirb1, 
        birbImageBirb2: birbImageBirb2, 
        birbImageBirb3: birbImageBirb3,
        selectedFriendName: selectedFriendName 
      }
    }
    );
    }
  }
  


  return (
    <div>
      <Title>
        Send 3 little Birbs
        <br />
        to a Friend
      </Title>
      <InfoContainer>
        <div className="bulbIcon">
          <HiOutlineLightBulb />
        </div>
        <div>
          choose a friend to whom <br />
          you want to send your Birbs.
        </div>
      </InfoContainer>

      <Select
        labelId="select-label"
        className="select"
        value={selectedFriend}
        onChange={handleFriendChange}
        sx={{
          marginTop: "15px",
          height: 50,
          fontFamily: "var(--fontFamily)",
          fontWeight: "800",
          borderRadius: "15px",
          backgroundColor: "var(--textOnButton)",
          color: "var(--textOnBright)",
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--textOnButton)",
              borderRadius: "15px",
            },
          },
        }}
      >
        <MenuItem disabled value={null}>
          Choose a friend
        </MenuItem>
        {friends.map((friend, index) => (
          <MenuItem key={index} value={index}>
            {friend.username}
          </MenuItem>
        ))}
      </Select>

      <MainContainer>
        <Boxtitle>3 little Birbs for: {selectedFriendName}</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImageBirb1} alt="hi"></img>
          </div>
          <InputGoodThing>
            <textarea defaultValue={goodthing1} ref={goodthing1Ref} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImageBirb2} alt="hi"></img>
          </div>
          <InputGoodThing>
            <textarea defaultValue={goodthing2} ref={goodthing2Ref} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImageBirb3} alt="hi"></img>
          </div>

          <InputGoodThing>
            <textarea defaultValue={goodthing3} ref={goodthing3Ref} required
              minLength="3"
              maxLength="60"></textarea>
          </InputGoodThing>
        </GoodThingContainerBirdLeft>

        <Boxtitle>your message for: {selectedFriendName}</Boxtitle>

        <HighlightedContainer>
          <InputGoodThing>
            <textarea defaultValue={message} ref={messageRef} required
              minLength="3"
              maxLength="100"></textarea>
          </InputGoodThing>
        </HighlightedContainer>
      </MainContainer>

      <div className="buttonContainer">
        <SmallButtons onClick={handleClickPost}>
            <img className="writeImg" src={birbImages.pigeon} alt="hi"></img>
            <p>send a post pigeon</p>
        </SmallButtons>
      </div>
    </div>
  );
}
