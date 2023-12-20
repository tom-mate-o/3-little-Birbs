import styled, { css } from 'styled-components';

export const MessageContainer = styled.div`
    background-color: var(--goodThingContainer);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 10px;
    padding: 10px;
    width: 100%;
    color: var(--textOnBright);
    font-family: 'Inria Serif', serif;
    font-weight: 700;
    justify-items: center;
    align-items: center;
    text-align: center;

    .birbsInARow{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        img{
            width: 100%;
            height: auto;
            max-width: 107px;
        }
    }

`;