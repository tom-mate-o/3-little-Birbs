import '../Calendar.css';
import * as React from 'react';
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { birbImages } from "../assets/birbs/birbsimgs";
import { MessageButton } from '../styledComponents/messageButton';
import { NavLink } from 'react-router-dom';
import { MessageContainer } from '../styledComponents/messageContainer';
import { Boxtitle } from '../styledComponents/boxtitle';

import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";

import { getPostFromUserIDFromDatabaseConfig } from '../utils/getPostFromUserIDFromDatabaseConfig';


export default function CalendarArchive() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [userPosts, setUserPosts] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPosts, setSelectedPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const getPosts = async () => {
    const response = await getPostFromUserIDFromDatabaseConfig(decodedToken.id);
    const posts = response.posts;
    setUserPosts(posts);
    
    if (Array.isArray(posts)) {
      const postDays = posts.map(post => post.date);
      setHighlightedDays(postDays);
    }
  
    setIsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return <MainContainer>
    <div><img className="birdImg" src={birbImages.pecking_animation} alt="birb1"></img>...Loading...</div>
  </MainContainer>
  }

  const handleDateChange = (date) => {
    const dayjsDate = dayjs(date);
    setSelectedDate(dayjsDate);
    
    const postsOnSelectedDate = userPosts.filter(post => 
      dayjs(post.date).format('YYYY-MM-DD') === dayjsDate.format('YYYY-MM-DD')
    );
  
    setSelectedPosts(postsOnSelectedDate);

  };

  return (
    <div>
      <Title>
        Calendar
        <br />
        Archive
      </Title>

      <MainContainer>
      <Calendar onChange={handleDateChange}
      locale="en-UK"
  tileClassName={({ date, view }) => {
    if (view === 'month') {
      const highlight = highlightedDays.find(dDate => {
        return dayjs(dDate).format('YYYY-MM-DD') === dayjs(date).format('YYYY-MM-DD');
      });
      if (highlight) {
        return 'highlight';
      }
    }
  }}
/>

      </MainContainer>

      <MainContainer>
      {selectedPosts.length > 0 ? (
  selectedPosts.map((post, index) => (
    
    <MessageButton key={index}>
      <NavLink to={`/post/${post.id}`}>
      <p><i>{format(new Date(post.date), 'MMMM do \'at\' HH:mm')}</i></p>
        <MessageContainer>
          <div className="birbsInARow">
            <img className="birdImg" src={birbImages[post.birb1]} alt={post.birb1}></img>
            <img className="birdImg" src={birbImages[post.birb2]} alt={post.birb2}></img>
            <img className="birdImg" src={birbImages[post.birb3]} alt={post.birb3}></img>
          </div>
        </MessageContainer>
      </NavLink>
    </MessageButton>
    
  ))
) : (
  <Boxtitle>No posts found for this date.</Boxtitle>
)}
  </MainContainer>
      </div>
      
    );
  }