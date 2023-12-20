import styled, { css } from 'styled-components';

export const GoodThingContainerBirdLeft = styled.div`
    background-color: var(--goodThingContainer);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    color: var(--textOnBright);
    font-family: 'Inria Serif', serif;
    font-weight: 700;

    display: grid;
    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 15px;
    justify-items: center;
    align-items: center;
    text-align: center;
    




    .birdImg{
        height: 107px;
        transform: scaleX(-1);
    }

`;