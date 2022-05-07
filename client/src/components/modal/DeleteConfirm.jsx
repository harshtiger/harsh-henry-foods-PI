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
    background-color: #41414100;
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

height: 150px;
width: 150px;

margin-left: 7px;
margin-right: auto;
padding: 20px;
padding-bottom: 5px;
display: flex;
padding-left: 25px;
padding-right: 25px;


`



const DeleteConfirm = ({ text, acceptText, cancelText, acceptPopUp, cancelPopUp, show,  setShow }) => {

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

const ModalButYes = styled.span`
border: solid 2px transparent;
border-color: rgb(0, 0, 0);
border-width: 0.5px;
border-radius: 100px;
display: flex;
justify-content: center;
float: bottom;
width: 170px;
padding-top: 15px;
height: 30px;
background-color: rgb(215, 210, 210);
transition: background-color 0.25s, color 0.25s;
cursor: pointer;
color: rgb(0, 0, 0);
font-size: 15px;
margin-left: 30px;
margin-right: auto;
margin-bottom: 5px;

&:hover{
    background-color:rgb(255,153,0);
}



`



    return(
        <Modaldiv>
            <Content><h1><Img src= "https://i.ibb.co/VC2NbrX/404harsh.png" alt="harshfood" border="0" /></h1>
            <Span onClick={e => setShow(false)}> x</Span>
                {text} 
                <ModalButYes onClick={acceptPopUp}>Yes, DELETE</ModalButYes>
                <ModalButYes onClick={cancelPopUp}>No, Cancel</ModalButYes>
            </Content>
        </Modaldiv>        
    )
}

export default DeleteConfirm


