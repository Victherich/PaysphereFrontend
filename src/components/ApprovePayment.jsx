import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Context } from './Context';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Features/Slice';

const ApprovePayment = () => {
    const {theme,menuSwitch}=useContext(Context)
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

 
  const [formData, setFormData] = useState({
    walletID: '',
    password: '',
});


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData, 
        [name]: value,
    });
};

   

const handleSubmit = async (event) => {
    event.preventDefault();

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

        handleApprovePayment(userToken)


    } catch (error) {
        console.error(error);
        
        Swal.fire({
            title: 'Error!',
            text: error.response?.data?.error || 'failed',
            icon: 'error',
        });
    }
};




  const handleApprovePayment = async (userToken) => {
   const loadingAlert = Swal.fire({text:"Processing..."})
    Swal.showLoading();
    
    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Approving payment request...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await axios.post(
        `https://paysphere-api.vercel.app/approve/${transactionId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: `Payment of ${response.data.amountPaid} was approved successfully.`,
          icon: 'success',
        }).then(() => {
            dispatch(userLogout());
        });
      } else {
        throw new Error(response.data.message || 'Unknown error occurred');
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to approve the payment',
        icon: 'error',
      });
    } finally {
      loadingAlert.close();
    }
  };

 return(
    <LoginWrap theme={theme} menuSwitch={menuSwitch}>
    <FormContainerWrapper>
        <FormContainer theme={theme}>
          
            <Title theme={theme}>Payment Approval</Title>
            <form onSubmit={handleSubmit}>
                <Input
                    name="walletID"
                    theme={theme}
                    type="text"
                    placeholder="Enter your User ID"
                    value={formData.walletID}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    name="password"
                    theme={theme}
                    type="password"
                    placeholder="Enter your Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <ButtonContainer>
                    <Button primary theme={theme} type="submit">Approve</Button>
                </ButtonContainer>
            </form>
        
        </FormContainer>
    </FormContainerWrapper>
</LoginWrap>
 )
  
};

export default ApprovePayment;


const LoginWrap = styled.div`
  width: 100%;
  position: relative; // Ensure proper positioning for the pseudo-element
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh; // Ensure it takes up at least the full viewport height
     background-size: cover;
  background-position: center;
  z-index: 1; // Ensure content sits above the overlay

  // Add the transparent black overlay
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme==="light"?"rgba(255,255,255,0.7)":"rgba(0, 0, 0, 0.7)"}; 
    z-index: -1; // Ensure the overlay is behind the content
  }

  @media (max-width: 320px) {
    padding-bottom: 100px;
  }
`;

const FormContainerWrapper = styled.div`
    padding-top: 100px;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    // background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
    // box-shadow: 4px 10px rgba(0,0,0,0.3);
    border-radius: 8px;
    // box-shadow:0px 4px 10px rgba(0,0,0,0.3);
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 30px;
        max-width: 600px;
    }
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
        width: 100%;
    }
`;


const Paragraph1 = styled.p`
    margin-top:10px;
`

const Span1 = styled.span`
    color:blue;
    cursor:pointer;
`