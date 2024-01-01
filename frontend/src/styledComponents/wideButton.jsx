import styled, { css } from 'styled-components';

export const WideButton = styled.div`
    background-color: var(--button);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 30px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 10px;	
    justify-content: center;
    width: 95%;
    height: 50px;
    color: var(--textOnButton);

    &:hover {
        background-color: var(--hoverButton);
        cursor: pointer;
    }

    a{
        text-decoration: none;
        color: var(--textOnButton);
    }
    a:visited{
        color: var(--textOnButton);
    }
`;