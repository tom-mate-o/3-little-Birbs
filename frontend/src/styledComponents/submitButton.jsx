import styled, { css } from 'styled-components';

export const SubmitButton = styled.div`
    button{
        background-color: var(--button);
        border-radius: 15px;
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
        margin-top: 30px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;	
        justify-content: center;
        width: auto;
        color: var(--textOnButton);
        text-align: center;
        width: 100%;
        border: none;
        font-family: var(--font);
        font-size: 1rem;
    
        &:hover {
            background-color: var(--hoverButton);
            cursor: pointer;
        }
    
    }
    
`;