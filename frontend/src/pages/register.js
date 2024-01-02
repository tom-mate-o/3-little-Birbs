import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { birbImages } from "../assets/birbs/birbsimgs";
import { Boxtitle } from "../styledComponents/boxtitle";
import { InputField } from "../styledComponents/inputField";
import { WideButton } from "../styledComponents/wideButton";
import { Button } from "../styledComponents/button";
import { SubmitButton } from "../styledComponents/submitButton";

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const email1Ref = useRef();
  const email2Ref = useRef();
  const usernameRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit Funktion aufgerufen");
console.log(email1Ref.current.value);
console.log(email2Ref.current.value);
console.log(usernameRef.current.value);
console.log(password1Ref.current.value);
console.log(password2Ref.current.value);

  };

  return (
    <div>
      <Title>Register</Title>
      <MainContainer>
      <form onSubmit={(e) => handleSubmit(e)}>
          <Boxtitle>Avatar</Boxtitle>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="avatar"
          />
          <label htmlFor="file">
            <Button>Select a Profile Picture</Button>
          </label>

          <Boxtitle>E-Mail</Boxtitle>
          <InputField>
            <input name="email1" ref={email1Ref} type="email"></input>
          </InputField>

          <Boxtitle>Repeat E-Mail</Boxtitle>
          <InputField>
            <input name="email2" ref={email2Ref} type="email"></input>
          </InputField>

          <Boxtitle>Username</Boxtitle>
          <InputField>
            <input name="username" ref={usernameRef}></input>
          </InputField>

          <Boxtitle>Password</Boxtitle>
          <InputField>
            <input name="password1" ref={password1Ref} type="password"></input>
          </InputField>

          <Boxtitle>Repeat Password</Boxtitle>
          <InputField>
            <input name="password2" ref={password2Ref} type="password"></input>
          </InputField>

          <SubmitButton><button type="submit">Register</button></SubmitButton>
        </form>
      </MainContainer>

      <div className="introtext">
        <Boxtitle>
          Don't Have an Account yet?
          <br />
          <NavLink to="/register">Click here to sign up!</NavLink>
        </Boxtitle>
      </div>
    </div>
  );
}