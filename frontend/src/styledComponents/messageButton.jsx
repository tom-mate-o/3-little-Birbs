import styled, { css } from 'styled-components';

export const MessageButton = styled.div`
    background-color: var(--button);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;	
    justify-content: center;
    width: 100%;
    color: var(--textOnButton);

    &:hover {
        background-color: var(--hoverButton);
        cursor: pointer;
    }

    .writeImg {
        width: 10rem;
    }

    p{
        width: 100%;
        text-align: left;
        font-size: 0.8rem;
    }

    a{
        text-decoration: none;
        color: var(--textOnButton);
    }
    a:visited{
        color: var(--textOnButton);
    }
`;