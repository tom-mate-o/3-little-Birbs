import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import uuid4 from "uuid4";
import showNotifications from "../components/showNotifications/showNotifications";
import registerUserToDatabase from "../utils/registerUserToDatabase";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { Boxtitle } from "../styledComponents/boxtitle";
import { InputField } from "../styledComponents/inputField";
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
  const formRef = useRef();

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // Zugriff auf die einzelnen Formularfelder (name-Attribut)
    const form = formRef.current;
    const id = uuid4();

    let file;
    if (form.avatar.files.length > 0) {
      file = form.avatar.files[0];
      formData.append("avatar", file);
    }

    formData.append("id", id);
    formData.append("email1", form.email1.value);
    formData.append("email2", form.email2.value);
    formData.append("username", form.username.value);
    formData.append("password1", form.password1.value);
    formData.append("password2", form.password2.value);

    if (form.password1.value !== form.password2.value) {
      showNotifications("Passwords do not match!", "error");
      return;
    }

    if (form.email1.value !== form.email2.value) {
      showNotifications("Emails do not match!", "error");
      return;
    }

    async function navigateToLogin() {
      const result = await registerUserToDatabase(formData);
      if (result) {
        navigate("/login");
      } else {
        showNotifications("Registration failed!", "error");
      }
    }

    navigateToLogin();
  };

  return (
    <div>
      <Title>Register</Title>
      <MainContainer>
        <form ref={formRef} onSubmit={(e) => registerUser(e)}>
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
            <input
              name="email1"
              ref={email1Ref}
              type="email"
              placeholder="E-Mail*"
              required
              minLength="6"
              maxLength="50"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
            ></input>
          </InputField>

          <Boxtitle>Repeat E-Mail</Boxtitle>
          <InputField>
            <input
              name="email2"
              ref={email2Ref}
              type="email"
              placeholder="Repeat Email*"
              required
              minLength="6"
              maxLength="50"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address"
            ></input>
          </InputField>

          <Boxtitle>Username</Boxtitle>
          <InputField>
            <input
              name="username"
              ref={usernameRef}
              placeholder="Username"
              required
              minlength="3"
              maxlength="20"
            ></input>
          </InputField>

          <Boxtitle>Password</Boxtitle>
          <InputField>
            <input
              name="password1"
              ref={password1Ref}
              type="password"
              placeholder="Password*"
              required
              minlength="6"
              maxLength="60"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            ></input>
          </InputField>

          <Boxtitle>Repeat Password</Boxtitle>
          <InputField>
            <input
              name="password2"
              ref={password2Ref}
              type="password"
              placeholder="Repeat Password*"
              required
              minlength="6"
              maxLength="60"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            ></input>
          </InputField>

          <SubmitButton>
            <button type="submit">Register</button>
          </SubmitButton>
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
