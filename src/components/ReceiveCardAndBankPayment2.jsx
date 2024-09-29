
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCreditCard, FaUniversity } from 'react-icons/fa'; 
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReceiveCardAndBankPayment2 = () => {
    const { setMenuSwitch, theme , pop1} = useContext(Context);
    const [amount, setAmount] = useState('');
    const userInfo = useSelector(state => state.userInfo);
    const userToken = useSelector(state => state.userToken);
    const [amountPaid,setAmountPaid]=useState(null)
    const {userId,amount2}=useContext(Context)

    const amountInNGN = (parseFloat(amount2) * 1660).toFixed(2);

    const handlePayment = () => {
        // if (!amount2 || isNaN(amount) || parseFloat(amount) <= 0) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Invalid Amount',
        //         text: 'Please enter a valid amount.'
        //     });
        //     return;
        // }

        
        
        Swal.fire({
            title: 'Confirm Payment',
            text: `You are paying $${amount2} USD which is ${amountInNGN} in NGN`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                initiatePayment();
            }
        });
    };

   
let paymentInProgress = false; // Global variable to track the payment state

const initiatePayment = () => {
    // if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
    //     Swal.fire({
    //         icon: 'error',
    //         title: 'Invalid Amount',
    //         text: 'Please enter a valid amount.'
    //     });
    //     return;
    // }

    if (paymentInProgress) {
        console.log('Payment is already being processed. Please wait.');
        return;
    }

    paymentInProgress = true; 

    const loadingAlert = Swal.fire({
        title: 'Processing...',
        onBeforeOpen: () => Swal.showLoading()
    });

    const key = `key${Math.random()}`;

    try {
        window.Korapay.initialize({
            key: "pk_test_tSvcVcCCD8YG7ZCsn4nM2Jr1QBVuKRyARvRxJXDy",
            reference: key,
            amount: parseFloat(amountInNGN), 
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
                await creditUserWallet(userId, parseFloat(amount_paid)/1660);
                // console.log(userId)
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
  try {
    Swal.fire({
      title: 'Processing...',
    //   text: 'Crediting user, please wait...',
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
    }
    window.history.back();
  } catch (error) {
    console.error(error)
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
        <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaCreditCard />
                    <FaUniversity />
                </Icon>
                <Title theme={theme}>Pay by Card / Bank </Title>
                {/* <Input
                    theme={theme}
                    value={amount2}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    placeholder="Enter Amount"
                /> */}
                <P>`You are paying ${amount2} USD which is {amountInNGN} in NGN`</P>
                <ButtonContainer>
                    <Button primary theme={theme} onClick={handlePayment}>Pay</Button>
                    <Button onClick={() => window.history.back()} theme={theme}>Cancel</Button>
                </ButtonContainer>
            </PaymentContainer>
        </PaymentContainerA>
    );
}

export default ReceiveCardAndBankPayment2;



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

const P = styled.p`
    margin-bottom:10px;
`