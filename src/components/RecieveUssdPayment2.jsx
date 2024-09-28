// RecieveUssdPayment.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaArrowUp,FaArrowDown, FaMobileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";

const RecieveUssdPayment2 = () => {
    const { setMenuSwitch, theme } = useContext(Context);
    const navigate = useNavigate()

    return (
        <Body theme={theme}>
            <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>USSD Payment</Title>
                <p>Dial the corresponding code for your payment requirement:</p>


<H4 theme={theme}>Start by dialing *384*4751# on your mobile phone.
</H4 >
<P><Strong>Welcome Menu</Strong><br/>
You'll see two options:<br/>
1. Check Account Balance<br/>
2. Transfer Money</P>

<P><Strong>Checking Your Balance:</Strong><br/>
Press 1 to check your account balance.<br/>
A message will display showing your current balance.</P>

<P>
<Strong>Transferring Money</Strong><br/>
Press 2 to transfer money.<br/>
Enter the recipient's wallet ID (a unique user number).<br/>
Enter the amount you want to send.<br/>
Input your 4-digit PIN to confirm the transaction.<br/>
Simple, fast, and secure!
</P>

                <ButtonContainer>
          
                    <Button onClick={() => window.history.back()} theme={theme}>Cancel</Button>
                </ButtonContainer>
            </PaymentContainer>
        </PaymentContainerA>

        </Body>
    );
}

export default RecieveUssdPayment2;



const Body = styled.div`
  width: 100%;
  position: relative; 
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
  z-index: 1; 

 
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme==="light"?"rgba(255,255,255,0.8)":"rgba(0, 0, 0, 0.8)"}; 
    z-index: -1; 
  }

  @media (max-width: 320px) {
    padding-bottom: 100px;
  }
`;


const PaymentContainerA = styled.div`
    padding-top: 100px;
    Padding-bottom:100px;
`;

const PaymentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 30px;
        max-width: 600px;
    }
`;

const Icon = styled(FaMobileAlt)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;

    @media (min-width: 768px) {
        font-size: 28px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => (theme === 'light' ? '#ccc' : '#555')};
    font-size: 16px;
    outline: none;
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

    &:hover {
        outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
    }

    @media (min-width: 768px) {
        padding: 12px;
        font-size: 18px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
    }
`;

const Button = styled.button`
    padding: 12px;
    margin-top:20px;
    width: 100%;
    background-color: ${({ primary, theme }) => 
        primary ? (theme === 'light' ? '#007bff' : '#0056b3') : 
        (theme === 'light' ? '#ccc' : '#666')};
    color: ${({ primary }) => (primary ? 'white' : 'black')};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;

    &:hover {
        background-color: ${({ primary, theme }) => 
            primary ? (theme === 'light' ? '#004494' : '#003d7a') : 
            (theme === 'light' ? '#aaa' : 'gray')};
    }

    @media (min-width: 768px) {
        padding: 14px;
        font-size: 18px;
        margin-bottom: 0;
        width: 48%;
    }
`;
const H4 = styled.h4`
    color:${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-top:5px;
`
const P = styled.p`
    text-align:center;
    font-size:0.8rem;
    font-weight:500
     word-break: break-all; 
    overflow-wrap: break-word; 
    max-width: 100%; 
    white-space: normal; 
    padding: 10px; 
    border-radius: 4px;  
    word-wrap: break-word;  
`

const Strong = styled.span`
color:rgba(0,0,255,0.6);
font-weight:500;
`