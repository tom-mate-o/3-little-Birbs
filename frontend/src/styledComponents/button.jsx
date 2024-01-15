import styled, { css } from 'styled-components';

export const Button = styled.div`
    background-color: var(--button);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 0px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;	
    justify-content: center;
    width: auto;
    color: var(--textOnButton);
    text-align: center;

    &:hover {
        background-color: var(--hoverButton);
        cursor: pointer;
    }

    .writeImg {
        width: 10rem;
    }

    p{
        width: 10rem;
        text-align: center;
        font-size: 0.7rem;
    }

    a{
        text-decoration: none;
        color: var(--textOnButton);
    }
    a:visited{
        color: var(--textOnButton);
    }
`;