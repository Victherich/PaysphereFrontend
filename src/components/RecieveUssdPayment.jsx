// RecieveUssdPayment.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaArrowUp,FaArrowDown, FaMobileAlt } from 'react-icons/fa'; // Icon for USSD

const RecieveUssdPayment = () => {
    const { setMenuSwitch, theme } = useContext(Context);

    return (
        <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>USSD Payment</Title>
                <p>Dial the corresponding code for your payment requirement:</p>
                {/* <Input theme={theme} type="text" placeholder="Enter Amount" /> */}
                
                <H4 theme={theme}>Paysphere Request Payment (P2P) <FaArrowDown/></H4>
                <P>*121*21*PAYER_ID*PAYEE_ID*AMOUNT*PAYEE_PIN#</P>
                
                <H4 theme={theme}>Paysphere Transfer (P2P) <FaArrowDown/><FaArrowUp/></H4>
                <P>*121*22*PAYER_ID*PAYEE_ID*AMOUNT*PAYER_PIN#</P>

                <H4 theme={theme}>Receive Card Payment <FaArrowDown/></H4>
                <P>*121*23*CARD_NUMBER*CARD_EXPIRY_DATE*CVV*AMOUNT*PAYEE_ID#</P>

                <H4 theme={theme}>Pay to Bank <FaArrowUp/></H4>
                <P>*121*24*PAYER_ID*PAYEE_BANK*PAYEE_ACCOUNT_NUMBER*AMOUNT*PAYER_PIN#</P>

                <H4 theme={theme}>Receive from Bank <FaArrowDown/></H4>
                <P>*121*25*PAYEE_ID*AMOUNT*PAYEE_PIN#</P>
                <H4 theme={theme}>Pay to Mobile Money <FaArrowUp/></H4>
                <P>*121*26*PAYER_ID*AMOUNT*PAYEE_MOMO_NUMBER*AMOUNT*PAYER_PIN#</P>
                <H4 theme={theme}>Receive from Mobile Money <FaArrowDown/></H4>
                <P>*121*27*PAYEE_ID*PAYER_MOMO_NUMBER*AMOUNT*PAYEE_MOMO_PIN#</P>

                <ButtonContainer>
                    {/* <Button primary theme={theme}>Receive Payment</Button> */}
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                </ButtonContainer>
            </PaymentContainer>
        </PaymentContainerA>
    );
}

export default RecieveUssdPayment;

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
    font-size:0.8rem;
    font-weight:500
     word-break: break-all;  /* Break long words if necessary */
    overflow-wrap: break-word;  /* Wrap text to prevent overflow */
    max-width: 100%;  /* Ensure it doesn't exceed container width */
    white-space: normal;  /* Allow text wrapping */
    // color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#66b3ff')};  /* Example color */
    padding: 10px;  /* Optional: add some padding */
    // background-color: ${({ theme }) => (theme === 'light' ? '#f8f9fa' : '#333')};  /* Optional: background color */
    border-radius: 4px;  /* Optional: rounded corners */
    word-wrap: break-word;  /* Ensures wrapping in older browsers */
`