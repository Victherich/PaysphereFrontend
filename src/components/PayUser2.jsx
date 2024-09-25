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

const PayUser2 = () => {
  const { setMenuSwitch, theme } = useContext(Context);
  const [walletID, setWalletID] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
//   const userToken = useSelector(state=>state.userToken)
  const {userId,amount2,setAmount2}=useContext(Context);
  const dispatch = useDispatch();

  
  const [formData, setFormData] = useState({
    walletID: '',
    password: '',
});

// Handle input change
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData, // Copy existing form data
        [name]: value, // Update specific field with new value
    });
};

   
// Handle form submission
const handleLogin = async (event) => {
    event.preventDefault();

    try {
        // Display processing message
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        // Send POST request to backend for login
        const response = await axios.post('https://paysphere-api.vercel.app/login', {
            walletID: formData.walletID,
            password: formData.password,
        }, {
            headers: {
                'Content-Type': 'application/json',  // Specify JSON request
            },
        });

        // Success feedback and redirect
        Swal.fire({
            title: 'Success!',
            text: 'Processing...',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
            // Redirect to the dashboard page
            // navigate('/dashboard');
        });
        // console.log(response.data)
        // const userInfo = response.data.user
        const userToken = response.data.token
        // console.log(userInfo)
        handlePay(userToken)
        // dispatch(userLogin({userInfo,userToken}))

    } catch (error) {
        console.error(error);
        // Handle errors
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.error || 'failed',
            icon: 'error',
        });
    }
};


  const handlePay = async (userToken) => {

    setError('');

    // Validate inputs
    // if (!walletID || !amount || !pin) {
    //   setError('Please fill in all fields.');
    //   return;
    // }
    // if (parseFloat(amount) < 100) {
    //   setError('Amount must be ₦100 or more.');
    //   return;
    // }

    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your transaction.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await axios.post(
        'https://paysphere-api.vercel.app/transfer_to_user', 
        { walletID:userId, amount: parseFloat(amount2), pin },
        {
          headers: {
            Authorization: `Bearer ${userToken}`, 
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
      });
      
      // Reset fields
      setWalletID('');
      setAmount('');
      setPin('');
      window.history.back();
      dispatch(userLogout());
      setAmount2(`${amount2} PAID`)
      
      
    } catch (error) {
        console.error(error)
      let message = 'An error occurred. Please try again.';
      const status = error.response?.status;

      if (status === 400) {
        if (error.response.data.message) {
          message = error.response.data.message;
        }
      } else if (status === 404) {
        message = 'Invalid user or recipient.';
      } else if (status === 500) {
        message = 'Transaction initiation failed.';
      }

      // Swal.fire({
      //   title: 'Error!',
      //   text: message,
      //   icon: 'error',
      // });
    }
  };

  return (
    <PayUserContainerA>
      <PayUserContainer theme={theme}>
        <Icon theme={theme}>
          <FaUserFriends />
        </Icon>
        <Title theme={theme}>
          Paysphere Transfer (P2P) <Img src={logo} alt="logo" />
        </Title>
        {/* <form onSubmit={handleSubmit}> */}
          <Input 
            theme={theme} 
            type="text"
            name="walletID" 
            placeholder="Enter Your User ID" 
            value={formData.walletID}
            onChange={handleInputChange} 
          />
          <Input 
            theme={theme}
            name="password" 
            type="text" 
            placeholder="Enter your Password" 
            value={formData.password}
            onChange={handleInputChange} 
          />
          <Input 
            theme={theme} 
            type="password" 
            placeholder="Enter your transaction PIN" 
            value={pin}
            onChange={(e) => setPin(e.target.value)} 
          />
          {error && <Error>{error}</Error>}
          <ButtonContainer>
            <Button primary theme={theme} onClick={handleLogin}>Pay</Button>
            <Button onClick={() => window.history.back()} theme={theme} type="button">Cancel</Button>
          </ButtonContainer>

      </PayUserContainer>
    </PayUserContainerA>
  );
};

export default PayUser2;

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
