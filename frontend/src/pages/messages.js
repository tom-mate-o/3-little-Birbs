import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

//Styled Components
import { Title } from "../styledComponents/title";
import { MainContainer } from "../styledComponents/mainContainer";
import { MessageButton } from "../styledComponents/messageButton";
import { MessageContainer } from "../styledComponents/messageContainer";
import { birbImages } from "../assets/birbs/birbsimgs";

export default function Messages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <Title>
        Post Pigeons
        <br />
        from Friends
      </Title>

      <MainContainer>

        <MessageButton>
          <NavLink to="/feed">
            <p>NAME one Dec, 20th 2023</p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb20} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb15} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb02} alt="hi"></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>

        <MessageButton>
          <NavLink to="/feed">
            <p>NAME one Dec, 20th 2023</p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb04} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb17} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb02} alt="hi"></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>

        <MessageButton>
          <NavLink to="/feed">
            <p>NAME one Dec, 20th 2023</p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb01} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb03} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb12} alt="hi"></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>

        <MessageButton>
          <NavLink to="/feed">
            <p>NAME one Dec, 20th 2023</p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb10} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb08} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb06} alt="hi"></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>

        <MessageButton>
          <NavLink to="/feed">
            <p>NAME one Dec, 20th 2023</p>
            <MessageContainer>
              <div className="birbsInARow">
                <img className="birdImg" src={birbImages.pigeon} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb19} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb20} alt="hi"></img>
                <img className="birdImg" src={birbImages.bigBirb04} alt="hi"></img>
              </div>
            </MessageContainer>
          </NavLink>
        </MessageButton>

        
      </MainContainer>
    </div>
  );
}
