
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCreditCard, FaUniversity } from 'react-icons/fa'; 
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ReceiveCardAndBankPayment = () => {
    const { setMenuSwitch, theme ,pop1 } = useContext(Context);
    const [amount, setAmount] = useState('');
    const userInfo = useSelector(state => state.userInfo);
    const userToken = useSelector(state => state.userToken);
    const [amountPaid,setAmountPaid]=useState(null)

   

let paymentInProgress = false; // Global variable to track the payment state

const handlePayment = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Amount',
            text: 'Please enter a valid amount.'
        });
        return;
    }

    if (paymentInProgress) {
        console.log('Payment is already being processed. Please wait.');
        return;
    }

    paymentInProgress = true; // Set flag to true to prevent multiple triggers

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
                paymentInProgress = false; // Allow new payments if modal is closed
            },
            onSuccess: function (data) {
                console.log('Payment successful:', data);

                // Query the charge using the reference
                queryChargeAndCreditWallet(data.reference);
            },
            onFailed: function (data) {
                console.error('Payment failed:', data);
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    text: 'Payment failed, please try again.'
                });
                paymentInProgress = false; // Reset flag to allow retry
            },
        });
    } catch (error) {
        console.error('Payment error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: 'An error occurred while processing your payment. Please try again.'
        });
        paymentInProgress = false; // Reset flag on error
    } finally {
        loadingAlert.close();
    }
};





// Declare hasCredited and queryInProgress globally or at a component level
let hasCredited = {};
let queryInProgress = {};

const queryChargeAndCreditWallet = async (reference) => {
    // Check if the wallet has already been credited or if a query is already in progress for this reference
    if (hasCredited[reference]) {
        console.log("Wallet has already been credited for this reference.");
        return; // Prevent further execution if already credited
    }

    if (queryInProgress[reference]) {
        console.log("Query is already in progress for this reference.");
        return; // Prevent multiple queries for the same reference
    }

    queryInProgress[reference] = true; // Set query in progress

    const loadingAlert = Swal.fire({ text: "Retrieving payment status..." });
    Swal.showLoading();

    try {
        const response = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${pop1}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok && data.status) {
            const { amount_paid } = data.data; // Get the amount paid
            console.log('Charge retrieved successfully:', data);

            // Check if the wallet has already been credited for this specific reference
            if (!hasCredited[reference]) {
                // Credit the user's wallet
                await creditUserWallet(userInfo.walletID, parseFloat(amount_paid));
                hasCredited[reference] = true; // Set the flag for this reference
            } else {
                console.log('Wallet has already been credited.');
            }
        } else {
            console.error('Failed to retrieve charge:', data);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Retrieve Payment',
                text: data.message || 'An error occurred while retrieving the payment status.'
            });
        }
    } catch (error) {
        console.error('Error while querying charge:', error);
        Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Failed to retrieve payment status. Please try again.'
        });
    } finally {
        queryInProgress[reference] = false; // Reset query in progress flag
        loadingAlert.close();
    }
};






const creditUserWallet = async (walletID, amount) => {
    const loadingAlert = Swal.fire({ text: "Crediting wallet..." });

    Swal.showLoading();

    try {
        const response = await fetch('https://paysphere-api.vercel.app/credit_wallet/bank', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ walletID, amount })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Wallet credited successfully:', data.wallet);
            Swal.fire({
                icon: 'success',
                title: 'Wallet Credited',
                text: `Your wallet has been credited. New Balance: ${data.wallet}`
            });
            setAmountPaid(null)
            setMenuSwitch(0);
        } else {
            console.error('Failed to credit wallet:', data);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Credit Wallet',
                text: data.message || 'An error occurred.'
            });
        }
    } catch (error) {
        console.error('Error while crediting wallet:', error);
        Swal.fire({
            icon: 'error',
            title: 'Network Error',
            text: 'Failed to credit your wallet. Please try again.'
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
