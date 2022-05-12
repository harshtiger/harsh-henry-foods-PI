import React from "react";
import styled from "styled-components";

const Content = styled.div`
    position: relative;
    background-color: #000000;
    border: 5px solid #FF9911;
    margin: auto;
    color: #FF9911;

    width: 30%;
    font-size: 35px;
    font-family:Arial, Helvetica, sans-serif;
    padding: 20px;
    padding-top: 5px;
    border-radius: 15px;
`;

const Span = styled.span`
    background-color: #FFFFFF;
    border: 1px solid #414141;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: #FF9911;
    border-radius: 99px;
    float: right;
    font-size: 20px;
    font-weight: bold;
    &:hover{ 
    color: #FF9911;
    background-color: #414141;
    
    text-decoration: none;
    cursor: pointer;
    }
`;

const Img = styled.img `

height: 250px;
width: 250px;

margin-left: auto;
margin-right: auto;
padding: 5px;
padding-bottom: 5px;
display: flex;
padding-left: 25px;
padding-right: 25px;


`



const Modal = ({show, message, setShow}) => {

    const Modaldiv = styled.div`
    display: ${show ? 'block': 'none'};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    padding-top: 200px;
    width: 100%;
    height: 100%;
    border-radious: 15px;
    background-color: #00000040;
`;



    return(
        <Modaldiv>
            <Content><h1><Img src= "https://i.ibb.co/pW9f0xd/Harsh-Stickers2.png" alt="harshfood" border="0" /></h1>
            <Span onClick={e => setShow(false)}> x</Span>
                {message} 
            </Content>
        </Modaldiv>        
    )
}

export default Modal
//owo
