import styled, { css } from 'styled-components';

export const ProfileInfoGrid = styled.div`

    border-radius: 15px;
    margin-top: 10px;
    width: 100%;
    color: var(--textOnDark);
    font-family: 'Inria Serif', serif;
    font-weight: 700;

    display: grid;
    
    grid-template-columns: 1fr 10fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px;
    justify-items: flex-start;
    align-items: center;
    

    img{
        height: 90px;
        border-radius: 10px;
   
    }

    .avatar{
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        background-color: 'red';
        margin-right: 10px;
    }

    .username{
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        font-size: 1.5em;
        font-weight: 700;
        text-align: left;
    }

    .button{
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        font-size: 0.8em;
        font-weight: 600;
        text-align: left;
        background-color: var(--button);
        color: var(--textOnButton);
        height: 40px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
    }

    .button:hover{
        background-color: var(--hoverButton);
        cursor: pointer;
    }

`;