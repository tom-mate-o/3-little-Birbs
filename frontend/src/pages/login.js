import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { compareLoginToDatabase } from "../utils/compareLoginToDatabase";
import { useNavigate } from "react-router-dom";


//Styled Components
import { MainContainer } from "../styledComponents/mainContainer";
import { birbImages } from "../assets/birbs/birbsimgs";
import { Boxtitle } from "../styledComponents/boxtitle";
import { InputField } from "../styledComponents/inputField";
import { SubmitButton } from "../styledComponents/submitButton";
import showNotifications from "../components/showNotifications/showNotificationsToastify";

export default function Login({handleLogin, loggedIn}) { //muss in {} sein, da sonst nicht erkannt wird, dass loggedIn true ist
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const username = useRef();
  const password = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loggedIn: " + loggedIn);
    if (loggedIn) {
      navigate("/feed");
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();


    const data = {
      username: username.current.value,
      password: password.current.value,
    };

    try{
      const res = await compareLoginToDatabase(data);
      if (res){
        localStorage.setItem("token", res.token);
        handleLogin(); // setLoggedIn(true) in App.js, damit die Weiterleitung auf /feed funktioniert
        //getUserNamefromDB + setUsername Localstorage
      }

    } catch (error){
      showNotifications("Login failed!", "error");
    }
    

  };
  
  return (
    <div>

      <div className="logo">
      <img src={birbImages["logo"]} alt="hi"></img>
      </div>
      <div className="introtext"><p><b><i>"Every little thing is gonna be alright"</i></b><br/><br/>
      Welcome to 3 Little Birbs, a wholesome social network. Every day, three little Birbs flutter onto your doorstep, chirping about three nice things that happened to a friend or a stranger. Sometimes, they also carry a kind message. You can share your own good things with the world or a friend. Join and send your own Birbs on their way.
      </p>
</div>

      <MainContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
      <Boxtitle>Username</Boxtitle>
            <InputField>
                <input ref={username} className=""></input>
             </InputField>

             <Boxtitle>Password</Boxtitle>
            <InputField>
                <input ref={password} type="password" className=""></input>
             </InputField>
             <SubmitButton><button type="submit">Login</button></SubmitButton>
             </form>
      </MainContainer>

      <div className="introtext">
      <Boxtitle>Don't Have an Account yet?<br/><NavLink to="/register">Click here to sign up!</NavLink></Boxtitle>
      </div>
    </div>
  );
}
