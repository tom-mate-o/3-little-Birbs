import styled, { css } from 'styled-components';

export const InfoContainer = styled.div`
    background-color: var(--infoContainer);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 15px;
    padding: 10px;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--textOnBright);

    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: auto;
    grid-gap: 10px;
    font-family: 'Inria Serif', serif;
    font-size: 0.9rem;
    font-weight: 400;
    padding: 10px;

    .bulbIcon {
        font-size: 1.5rem;
        grid-column: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 300;
        font-family: 'Inria Serif', serif;
    }

`;