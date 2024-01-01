import styled, { css } from 'styled-components';

export const FriendListGrid = styled.div`
    border-radius: 15px;
    margin-top: 10px;
    width: 100%;
    color: var(--textOnDark);
    font-family: 'Inria Serif', serif;
    font-weight: 700;

    display: grid;
    
    grid-template-columns: 1fr 5fr 0.5fr;
    grid-template-rows: auto;
    gap: 10px;
    justify-items: flex-start;
    align-items: center;
    

    img{
        height: 40px;
        border-radius: 10px;
   
    }

    .avatar{
        grid-column: 1 / 2;
        background-color: 'red';
    }

    .name{
        grid-column: 2 / 3;
        font-size: 1.1em;
        font-weight: 700;
        text-align: left;
    }

    .deleteButton{
        grid-column: 3 / 4;
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