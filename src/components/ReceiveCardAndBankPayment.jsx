import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCreditCard, FaUniversity } from 'react-icons/fa'; // Icon for Card and Bank Payment
import Swal from 'sweetalert2';

const ReceiveCardAndBankPayment = () => {
    const { setMenuSwitch, theme } = useContext(Context);
    const [amount, setAmount] = useState('');

    const handlePayment = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Amount',
                text: 'Please enter a valid amount.'
            });
            return;
        }

        const loadingAlert = Swal.fire({
            title: 'Processing...',
            onBeforeOpen: () => Swal.showLoading()
        });

        const key = `key${Math.random()}`;
        
        try {
            window.Korapay.initialize({
                key: "pk_test_tSvcVcCCD8YG7ZCsn4nM2Jr1QBVuKRyARvRxJXDy",
                reference: key,
                amount: parseFloat(amount), // Convert to smallest currency unit (e.g., kobo for NGN)
                currency: "NGN",
                customer: {
                    name: "Esther",
                    email: "esomesther@gmail.com",
                },
                onClose: function () {
                    console.log('Payment modal closed');
                },
                onSuccess: function (data) {
                    console.log('Payment successful:', data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: 'We have sent a confirmation to your email.'
                    });
                    setMenuSwitch(0)
                },
                onFailed: function (data) {
                    console.error('Payment failed:', data);
                    Swal.fire({
                        icon: 'error',
                        title: 'Payment Failed',
                        text: 'Payment failed, please try again.'
                    });
                },
            });
        } catch (error) {
            console.error('Payment error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: 'An error occurred while processing your payment. Please try again.'
            });
        } finally {
            loadingAlert.close();
        }
    };

    return (
        <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaCreditCard />
                    <FaUniversity />
                </Icon>
                <Title theme={theme}>Receive Card and Bank Payment</Title>
                <Input
                    theme={theme}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    placeholder="Enter Amount"
                />
                <ButtonContainer>
                    <Button primary theme={theme} onClick={handlePayment}>Receive Payment</Button>
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                </ButtonContainer>
            </PaymentContainer>
        </PaymentContainerA>
    );
}

export default ReceiveCardAndBankPayment;


const PaymentContainerA = styled.div`
    padding-top: 100px;
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

const Icon = styled.div`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
    display:flex;
    gap:20px;
    justify-content:center;
    align-items:center;
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
        width: 48%;
    }
`;
