import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUserFriends } from 'react-icons/fa';
import logo from "../Images/logo.png";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Features/Slice';

const PayUser3 = () => {
  const { setMenuSwitch, theme,userId,amount2} = useContext(Context);
  const [walletID2, setWalletID2] = useState('');
  // const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();


  const handleTransaction=()=>{
    debitUser(userId,parseFloat(amount2))
  }

  
  const debitUser = async (walletID, amount) => {
    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Debiting user, please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // const response = await axios.post('https://paysphere-api.vercel.app/debit/user', {
        const response = await axios.post('https://paysphere-api-utkm.onrender.com/debit/user', {
        walletID,
        amount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        // Swal.fire({
        //   title: 'Success!',
        //   text: `Transfer successful. Amount debited: ${response.data.amountPaid}`,
        //   icon: 'success',
        // });
        creditUser(walletID2,amount)
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire({
          title: 'Error!',
          text: 'Insufficient funds for the transfer',
          icon: 'error',
        });
      } else if (error.response?.status === 404) {
        Swal.fire({
          title: 'Error!',
          text: 'Sender not found',
          icon: 'error',
        });
      } else if (error.response?.status === 500) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.error || 'Internal Server Error',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
        });
      }
    }
  };
  


  
  const creditUser = async (walletID, amount) => {
    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Crediting user, please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // const response = await axios.post('https://paysphere-api.vercel.app/credit/user', {
        const response = await axios.post('https://paysphere-api-utkm.onrender.com/credit/user', {
        walletID,
        amount,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          // text: `User credited successfully. New wallet balance: ${response.data.wallet}`,
          icon: 'success',
        });
        window.history.back();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Swal.fire({
          title: 'Error!',
          text: 'Recipient not found',
          icon: 'error',
        });
      } else if (error.response?.status === 500) {
        Swal.fire({
          title: 'Error!',
          text: error.response.data.error || 'Internal Server Error',
          icon: 'error',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
        });
      }
    }
  };
  


  return (
    <PayUserContainerA>
      <PayUserContainer theme={theme}>
        <Icon theme={theme}>
          <FaUserFriends />
        </Icon>
        <Title theme={theme}>
          Receive to Paysphere Account <Img src={logo} alt="logo" />
        </Title>
      
          <Input 
            theme={theme} 
            type="text"
            name="walletID" 
            placeholder="Enter Your User ID" 
            value={walletID2}
            onChange={(e)=>setWalletID2(e.target.value)} 
          />
        
          {error && <Error>{error}</Error>}
          <ButtonContainer>
            <Button primary theme={theme} onClick={handleTransaction}>Receive</Button>
            <Button onClick={() => window.history.back()} theme={theme} type="button">Cancel</Button>
          </ButtonContainer>

      </PayUserContainer>
    </PayUserContainerA>
  );
};

export default PayUser3;

const PayUserContainerA = styled.div`
  padding-top: 100px;
`;

const PayUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 30px;
    max-width: 600px;
  }
`;

const Icon = styled(FaUserFriends)`
  font-size: 4rem;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 255, 0.5)' : '#bbb')};
  margin-bottom: 20px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 255, 0.5)' : '#bbb')};
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
    justify-content: space-between;
  }
`;

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

const Img = styled.img`
  width: 35px;
  margin-top: 5px;
  margin-left: 5px;
`;

const Error = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
  margin: 10px 0;
`;
