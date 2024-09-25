import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const PayViaEmail = () => {
  const { setMenuSwitch, theme } = useContext(Context);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const userToken = useSelector(state=>state.userToken)

  // Function to handle payment via email
  const handleSendMoney = async () => {

    try {
      
         Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });
      const response = await axios.post('https://paysphere-api.vercel.app/send_money_via_email', {
        recipientEmail,
        amount: parseFloat(amount),
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`, 
        }
      });
      setStatusMessage(response.data.message);
      setMenuSwitch(0)
      Swal.fire({text:`Payment initiation ${response.data.message}. Please inform the recipeint to check his email and claim the payment`,icon:"success"})
    } catch (error) {
        
      if (error.response) {
        setStatusMessage(error.response.data.error || error.response.data.message);
      } else {
        setStatusMessage("Server error. Please try again.");
      }
    }
  };

  return (
    <SendMoneyContainer>
      <SendMoneyForm theme={theme}>
        <Icon theme={theme}>
          <FaEnvelope />
        </Icon>
        <Title theme={theme}>Send Money via Email</Title>
        <Input 
          theme={theme} 
          type="email" 
          placeholder="Enter Recipient's Email" 
          value={recipientEmail} 
          onChange={(e) => setRecipientEmail(e.target.value)} 
        />
        <Input 
          theme={theme} 
          type="number" 
          placeholder="Enter Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        {statusMessage && <StatusMessage theme={theme}>{statusMessage}</StatusMessage>}
        <ButtonContainer>
          <Button primary theme={theme} onClick={handleSendMoney}>Send Money</Button>
          <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
        </ButtonContainer>
      </SendMoneyForm>
    </SendMoneyContainer>
  );
};

export default PayViaEmail;

// Container for the entire component
const SendMoneyContainer = styled.div`
  padding-top: 100px;
`;

// Main styled container for the form
const SendMoneyForm = styled.div`
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

// Icon style for email icon
const Icon = styled(FaEnvelope)`
  font-size: 4rem;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
  margin-bottom: 20px;
`;

// Title style
const Title = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

// Input field style
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

// Status message style for error or success messages
const StatusMessage = styled.p`
  color: ${({ theme }) => (theme === 'light' ? 'green' : 'lightgreen')};
  margin-bottom: 15px;
  font-size: 14px;
`;

// Button container styling
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Button style
const Button = styled.button`
  padding: 12px;
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
