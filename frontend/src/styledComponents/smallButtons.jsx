import styled, { css } from 'styled-components';

export const SmallButtons = styled.div`
    background-color: var(--button);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    margin-top: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;	
    justify-content: center;
    align-items: center;
    width: auto;
    height: 10em;
    color: var(--textOnButton);

    &:hover {
        background-color: var(--hoverButton);
        cursor: pointer;
    }

    .writeImg {
        width: 6rem;

    }

    p{
        width: 6rem;
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