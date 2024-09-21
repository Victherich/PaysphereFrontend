import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaMoneyBillWave } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Assuming you are using SweetAlert2 for alerts
import axios from 'axios'; // Using axios for API requests
import logo from "../Images/logo.png"
import { useSelector } from 'react-redux';

const RequestToPay = () => {
    const { setMenuSwitch, theme,} = useContext(Context); // Assuming userToken is stored in context
    const [amount, setAmount] = useState('');
    const [payerId, setPayerId] = useState('');
    const [loading, setLoading] = useState(false);
    const userToken = useSelector(state=>state.userToken)
    console.log(userToken)
    
    useEffect(()=>{
        console.log(userToken)
    },[])

    // Function to handle Request Payment
    const handleRequestPayment = async () => {
        console.log(userToken)
        if (!amount || !payerId || parseFloat(amount) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter a valid amount and payer ID.'
            });
            return;
        }

        setLoading(true);
        const loadingAlert = Swal.fire({text:"Processing..."})
        Swal.showLoading();

        try {
            const response = await axios.post(
                'https://paysphere-api.vercel.app/request_payment',
                { payerId, amount: parseFloat(amount) },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Request Sent',
                    text: data.message,
                });
                setAmount('');
                setPayerId('');
                setMenuSwitch(0)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Something went wrong!',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Request Failed',
                text: 'An error occurred while processing your request. Please try again.',
            });
            console.error('Error requesting payment:', error);
        } finally {
            setLoading(false);
            loadingAlert.close();
        }
    };

    return (
        <RequestToPayContainerA>
            <RequestToPayContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMoneyBillWave />
                </Icon>
                <Title theme={theme}>
                    Request Payment (P2P) <Img src={logo} alt="logo" />
                </Title>

                <Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Payer User ID"
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                />
                <ButtonContainer>
                    <Button primary theme={theme} onClick={handleRequestPayment} disabled={loading}>
                        {loading ? 'Requesting...' : 'Request Payment'}
                    </Button>
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>
                        Cancel
                    </Button>
                </ButtonContainer>
            </RequestToPayContainer>
        </RequestToPayContainerA>
    );
};

export default RequestToPay;

// Styling (Your existing styled components)


const RequestToPayContainerA = styled.div`
    padding-top: 100px;
`;

const RequestToPayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
    border-radius: 8px;
    box-shadow:0px 4px 10px rgba(0,0,0,0.3);
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 30px;
        max-width: 600px;
    }
`;

const Icon = styled(FaMoneyBillWave)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const Title = styled.h2`
    display:flex;
    justify-content:center;
    align-items:center;
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
        width: 48%;
    }
`;

const Img = styled.img`
  width:35px;
  margin-top:5px;
  margin-left:5px;
`