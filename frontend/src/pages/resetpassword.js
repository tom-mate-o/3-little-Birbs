import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


//Styled Components
import { MainContainer } from "../styledComponents/mainContainer";
import { birbImages } from "../assets/birbs/birbsimgs";
import { Boxtitle } from "../styledComponents/boxtitle";
import { InputField } from "../styledComponents/inputField";
import { SubmitButton } from "../styledComponents/submitButton";
import { Title } from "../styledComponents/title";
import showNotifications from "../components/showNotifications/showNotificationsToastify";


export default function ResetPassword({handleLogin, loggedIn}) { //muss in {} sein, da sonst nicht erkannt wird, dass loggedIn true ist
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [page, setPage] = useState("email");
  const [resetCode, setResetCode] = useState();
  const [resetAllowed, setResetAllowed] = useState(false);
  const [equal, setEqual] = useState(false);
  const [emailToken, setEmailToken] = useState();
  const formRef = useRef();
  const navigate = useNavigate();
  



  const checkPassword = (formRefCurrent, setEqual) => {
    const isEqual = formRefCurrent.password1.value === formRefCurrent.password2.value;
    setEqual(isEqual);
  };


// Email -----------------------------------------------------------------------
  const onClickEmail = async (event) => {
    event.preventDefault();
    const email = formRef.current.email.value;

    //config object für den post request
    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset/newpassword`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: email, // email wird ans backend geschickt
      },
    };

    try {
      console.log("Sending email with code...");
      const response = await axios(config);
      if (response.status === 200) {
        console.log("Email with code sent successfully!");
        showNotifications("Email with code sent successfully!", "success");
        const { code, token } = response.data;

        setResetCode(code);   
        localStorage.setItem("email", token);
        setEmailToken(token);
      }
    } catch (error) {
      console.error("error ", error);
      if (error.response && error.response.status === 404) {
        showNotifications("No user found with the provided email", "error");
      } else {
        showNotifications("Error sending email", "error");
      }
      return;
    }


    setPage("code");
  };

// Code -----------------------------------------------------------------------
useEffect(() => {
  if (resetAllowed) {
    setPage("newpassword");
  }
}, [resetAllowed]);  

const onClickCode = async (event) => {
    event.preventDefault();
    const code = formRef.current.code.value;

    if (code == resetCode) {
      setResetAllowed(true);
    } else {
      showNotifications("Wrong Code", "error");
    }
  };

// New Password ---------------------------------------------------------------
  const onClickNewPassword = async (event) => {
    event.preventDefault();

    const password = formRef.current.password1.value;
    if (equal === false){
      showNotifications("Passwords do not match", "error");
      return;
    }

    const config = {
      url: `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset/setnewpassword`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${emailToken}`
      },
      data: {
        password: password,
      },
    };

    try {
      const response = await axios(config);
      if (response.status === 200) {
        showNotifications("Password changed successfully!", "success");
        showNotifications("Please login with your new Password", "");
      }
      setEmailToken("");
      localStorage.removeItem("email");

      if (page === "newpassword") {
        navigate("/login");
      }

    } catch (error) {
      console.error("error ", error);
      if (error.response.status === 500) {
        showNotifications("Error updating password", "error");
      }
    }
    
  };
  
  return (
    <div>

      <div className="logo">
      <img src={birbImages["logo"]} alt="hi"></img>
      </div>
      <Title>Reset Password</Title>

      {page === "email" && (
      <MainContainer>
      <form 
      ref = {formRef}
      onSubmit={(e) => onClickEmail(e, formRef)}>
      <Boxtitle>Type in your Email</Boxtitle>
            <InputField>
                <input type="email" name="email" placeholder="E-Mail" required maxLength={50}></input>
             </InputField>

             <SubmitButton><button type="submit">Next</button></SubmitButton>
             </form>
      </MainContainer>
      )}

{page === "code" && (
      <MainContainer>
      <form 
      ref = {formRef}
      onSubmit={(e) => onClickCode(e, formRef)}>
      <Boxtitle>Please type in the 6-Digit Code you recieved by E-Mail.</Boxtitle>
            <InputField>
                <input type="text" name="code" placeholder="Code" required minLength={6} maxLength={6}></input>
             </InputField>

             <SubmitButton><button type="submit">Next</button></SubmitButton>
             </form>
      </MainContainer>
      )}

{page === "newpassword" && (
      <MainContainer>
      <form 
      ref = {formRef}
      onSubmit={(e) => onClickNewPassword(e, formRef)}>
      <Boxtitle>Please type in your new Password.</Boxtitle>
          <Boxtitle>(6 Digits and at least one capital Letter)</Boxtitle>
          <InputField>
          <input
            type="password"
            name="password1"
            placeholder="New Password"
            required
            minLength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={() => checkPassword(formRef.current, setEqual)}
          />
          </InputField>
          <InputField>
          <input
            type="password"
            name="password2"
            placeholder="Repeat New Password"
            required
            minLength="6"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
            onChange={() => checkPassword(formRef.current, setEqual)}
          />
          </InputField>

             <SubmitButton><button type="submit">Change Password</button></SubmitButton>
             </form>
      </MainContainer>
      )}

      <div className="introtext">
      <Boxtitle>Did you rember your Password?<br/><NavLink to="/login">Click here to Login!</NavLink></Boxtitle>
      </div>
    </div>
  );
}
