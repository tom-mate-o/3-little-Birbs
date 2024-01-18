// messages.js

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { format } from 'date-fns';

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { MessageButton } from "../styledComponents/messageButton";
import { MessageContainer } from "../styledComponents/messageContainer";
import { birbImages } from "../assets/birbs/birbsimgs";

//Costum Hooks
import useMongoDBUserData from "../costumHooks/useMongoDBUserData";
import { getPostsWithMachtingIDFromDatabaseConfig } from "../utils/getPostsWithMachtingIDFromDatabaseConfig";


export default function Messages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoading, setIsLoading] = useState(true); 
  const { userData, setUserData } = useMongoDBUserData([]);
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const username = user ? user.username : null;

  // Solange userData leer ist wird der Loading Screen gezeigt
  useEffect(() => {
    if (userData && userData.length > 0) {
      setIsLoading(false);
    }
  }, [userData]);

  // wenn user geladen ist, werden die message ids unter Messages gespeichert
  useEffect(() => {
    if(user){
      setMessages(user.recievedPostsIds);
    }
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      const messageIds = messages.map(message => message.id);
      const data = await getPostsWithMachtingIDFromDatabaseConfig(messageIds);
      setPosts(data);
    };
  
    if (messages && messages.length > 0) {
      fetchPosts();
    }
  }, [messages]);
  


  // Loading Screen 
  if (isLoading) {
    return <MainContainer>
    <div><img className="birdImg" src={birbImages.pecking_animation} alt="birb1"></img>...Loading...</div>
  </MainContainer>
  }

  
  return (
    <div>

      <Title>
        Post Pigeons
        <br />
        from Friends
      </Title>

      <MainContainer>
  {messages && messages.length > 0 ? (
    messages.map((message, index) => {
      return posts.slice().reverse().map((post, index) => (
        <MessageButton key={index}>
          <NavLink to={`/post/${post.id}`}>
            <p><b>{post.poster}</b> on <i>{format(new Date(post.date), 'MMMM do \'at\' HH:mm')}</i></p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="Post Pigeon"></img>
                <img className="birdImg" src={birbImages[post.birb1]} alt={post.birb1}></img>
                <img className="birdImg" src={birbImages[post.birb2]} alt={post.birb2}></img>
                <img className="birdImg" src={birbImages[post.birb3]} alt={post.birb3}></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>
      ));
    })
  ) : (
    <>
      <img className="noMessages" src={birbImages.nomessages} alt="No notifications" />
      <h3>no messages</h3>
    </>
  )}
</MainContainer>
    </div>
  );
}
