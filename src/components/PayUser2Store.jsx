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


const PayUser2Store = () => {
  const { setMenuSwitch, theme } = useContext(Context);
  const [walletID, setWalletID] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
//   const userToken = useSelector(state=>state.userToken)
  const {userId,amount2,setAmount2, handleOrderSubmit,handleOrderNow2}=useContext(Context);
  const dispatch = useDispatch();
  const sellerWalletId = useSelector(state=>state.walletId)
  

  
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

const handlePayment = () => {
  
  
  Swal.fire({
      title: 'Confirm Payment',
      text: `You are paying $${amount2} USD.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel'
  }).then((result) => {
      if (result.isConfirmed) {
          handleLogin();
      }
  });
};

   
// Handle form submission
const handleLogin = async () => {
 

    try {
     
        Swal.fire({
            title: 'Processing...',
            text: 'Please wait while we process your request.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });


        const response = await axios.post('https://paysphere-api.vercel.app/login', {
            walletID: formData.walletID,
            password: formData.password,
        }, {
            headers: {
                'Content-Type': 'application/json', 
            },
        });

     
        Swal.fire({
            title: 'Success!',
            text: 'Processing...',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        }).then(() => {
  
        });

        const userToken = response.data.token

        handlePay(userToken)


    } catch (error) {
        console.error(error);
  
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.error || 'failed',
            icon: 'error',
        });
    }
};


  const handlePay = async (userToken) => {

    setError('');


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
        { walletID:sellerWalletId, amount: parseFloat(amount2), pin },
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
      
   
      setWalletID('');
      setAmount('');
      setPin('');
      
      dispatch(userLogout());
      setAmount2(`${amount2} PAID`)
      // handleOrderSubmit()
      handleOrderNow2()
      
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
          Paysphere Transfe (P2P) <Img src={logo} alt="logo" />
        </Title>
    
          <Input 
            theme={theme} 
            type="text"
            name="walletID" 
            placeholder="Enter Your wallet ID" 
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
            <Button primary theme={theme} onClick={handlePayment}>Pay</Button>
            <Button onClick={() => window.history.back()} theme={theme} type="button">Cancel</Button>
          </ButtonContainer>

      </PayUserContainer>
    </PayUserContainerA>
  );
};

export default PayUser2Store;

const PayUserContainerA = styled.div`
  padding-top: 100px;
  padding-bottom:80px;
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
