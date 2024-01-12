import styled, { css } from "styled-components";

export const InputFriendCode = styled.div`
input {
    width: 100%;
    height: 40px;
    border-radius: 15px;
    border: none;
    padding: 10px;
    resize: none;
    font-family: 'Inria Serif', serif;
    color: var(--textOnBirght);

    }

    .insertCodeFlex{
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;

        .friendcode{
            width: 100%;
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
        }
        .addfriendIcon{
            width: 40px;
            height: 20px;
            position: absolute;
            color: var(--textOnBirght);
            right: 0;
            z-index: 999;
        }

        .addfriendIcon:hover{
            cursor: pointer;
        }


`;
