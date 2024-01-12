import styled, { css } from 'styled-components';

export const HighlightedContainer = styled.div`
    background-color: var(--highlightedContainer);
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

    p{
        max-width: 50ch;
        word-wrap: break-word;
    }

    .birbsInACollumn{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img{
            width: 107px;
        }
    }

`;