import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { MainContainer } from "../styledComponents/mainContainer";
import { birbImages } from "../assets/birbs/birbsimgs";
import { Boxtitle } from "../styledComponents/boxtitle";
import { InputField } from "../styledComponents/inputField";
import { WideButton } from "../styledComponents/wideButton";
import { SubmitButton } from "../styledComponents/submitButton";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const username = useRef();
  const password = useRef();


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit Funktion aufgerufen");
console.log(username.current.value);
console.log(password.current.value);

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
