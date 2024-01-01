import styled, { css } from 'styled-components';

export const NotificationGrid = styled.div`

    border-radius: 15px;
    margin-top: 10px;
    width: 100%;
    color: var(--textOnDark);
    font-family: 'Inria Serif', serif;
    font-weight: 700;

    display: grid;
    
    grid-template-columns: 1fr 5fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    gap: 0px;
    justify-items: flex-start;
    align-items: center;
    

    img{
        height: 50px;
        border-radius: 10px;
   
    }

    .avatar{
        grid-column: 1 / 2;
        grid-row: 1 / 3;
        background-color: 'red';
        margin-right: 10px;
    }

    .time{
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        font-size: 0.8em;
        font-weight: 400;
        text-align: left;
    }

    .event{
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        font-size: 1em;
        font-weight: 600;
        text-align: left;
    }

    .deleteButton{
        grid-column: 3 / 4;
        grid-row: 1 / 3;
        text-align: right;
        font-size: 1.5em;
        font-weight: 700;
        display: flex;
        justify-content: center;
    }

    .deleteButton:hover{
        color: var(--red);
        cursor: pointer;
    }

`;