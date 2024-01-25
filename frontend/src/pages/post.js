import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';


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
import axios from "axios";

export default function Post() {
  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/getPostWithId/${postId}`);
        console.log(response.data)
        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPost();
  }, [postId]);


  if (!post || post.length === 0) {
    return <MainContainer>
      <div><img className="birdImg" src={birbImages.pecking_animation} alt="birb1"></img>...Loading...</div>
    </MainContainer>
  }


  return (
    <div>
      <Title>{post.poster} on<br/>{format(new Date(post.date), 'MMMM do \'at\' HH:mm')}</Title>

      <MainContainer>
        <Boxtitle>3 little Birbs from: {post.poster}</Boxtitle>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages[post.birb1]} alt="birb1"></img>
          </div>
          <div><p>{post.goodthing1}</p></div>
        </GoodThingContainerBirdLeft>
        <GoodThingContainerBirdRight>
          <div><p>{post.goodthing2}</p></div>
          <div>
            <img className="birdImg" src={birbImages[post.birb2]} alt="birb2"></img>
          </div>
        </GoodThingContainerBirdRight>
        <GoodThingContainerBirdLeft>
          <div>
            <img className="birdImg" src={birbImages[post.birb3]} alt="birb3"></img>
          </div>
          <div><p>{post.goodthing3}</p></div>
        </GoodThingContainerBirdLeft>

        <Boxtitle>a message from {post.poster}</Boxtitle>

        <HighlightedContainer>
          <p>{post.message}</p>
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
