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

    .friendCodeFlex{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;

        h1{
            width: 100%;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
        }
        .clipboardIcon{
            width: 20px;
            height: 20px;
            position: absolute;

            right: 0;
            margin-right: 10px;
            z-index: 999;
        }

        .clipboardIcon:hover{
            cursor: pointer;
        }

    }
   

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