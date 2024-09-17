// ManualCardPayment.js

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import crypto from 'crypto-browserify'; // For encryption
import { Context } from './Context';
import { FaCreditCard } from 'react-icons/fa'; // Icon for Card Payment

const ManualCardPayment = () => {
    const { setMenuSwitch, theme } = useContext(Context);

    const [cardDetails, setCardDetails] = useState({
        amount: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        pin: '', // Optional, only used if PIN is required
        customerEmail: '',
        customerName: ''
    });

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [transactionReference, setTransactionReference] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    // Encryption function
    const encryptAES256 = (encryptionKey, paymentData) => {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
        const encrypted = Buffer.concat([cipher.update(paymentData), cipher.final()]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}:${cipher.getAuthTag().toString('hex')}`;
    };

    // Handle the payment process
    const handlePayment = async () => {
        setLoading(true);
        const paymentData = {
            reference: 'unique-payment-ref-' + new Date().getTime(), // Unique reference for each transaction
            card: {
                number: cardDetails.cardNumber,
                cvv: cardDetails.cvv,
                expiry_month: cardDetails.expiryMonth,
                expiry_year: cardDetails.expiryYear,
                pin: cardDetails.pin // Optional
            },
            amount: parseInt(cardDetails.amount, 10),
            currency: 'NGN',
            redirect_url: 'https://your-redirect-url.com', // Optional
            customer: {
                name: cardDetails.customerName,
                email: cardDetails.customerEmail,
            },
            metadata: {
                internalRef: 'JD-12-67',
                age: 15,
                fixed: true,
            }
        };

        try {
            // Step 2: Encrypt payment data
            const encryptionKey = 'YOUR_ENCRYPTION_KEY'; // Replace with your Kora encryption key
            const encryptedData = encryptAES256(encryptionKey, JSON.stringify(paymentData));

            // Step 3: Charge card
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/card', {
                charge_data: encryptedData
            }, {
                headers: {
                    Authorization: 'sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1' // Replace with your Kora secret key
                }
            });

            const { data } = response.data;
            if (data.status === 'processing' && data.auth_model === 'OTP') {
                setTransactionReference(data.transaction_reference);
            }

            setLoading(false);
            // Handle OTP step here
            alert('Please enter OTP sent to your phone/email.');

        } catch (error) {
            setLoading(false);
            console.error('Payment failed', error);
            alert('Payment failed. Please try again.');
        }
    };

    // Handle OTP authorization
    const handleOtpSubmit = async () => {
        if (!otp || !transactionReference) return;

        try {
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/card/authorize', {
                transaction_reference: transactionReference,
                authorization: {
                    otp: otp
                }
            }, {
                headers: {
                    Authorization: 'sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1'
                }
            });

            const { data } = response.data;
            if (data.status === 'success') {
                alert('Payment successful!');
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('OTP verification failed', error);
            alert('OTP verification failed. Please try again.');
        }
    };

    return (
        <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaCreditCard />
                </Icon>
                <Title theme={theme}>Receive Manual Card Payment</Title>
                <Input
                    theme={theme}
                    type="text"
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={handleChange}
                    value={cardDetails.amount}
                />
                <Input
                    theme={theme}
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    onChange={handleChange}
                    value={cardDetails.cardNumber}
                />
                <Input
                    theme={theme}
                    type="text"
                    name="expiryMonth"
                    placeholder="Expiry Month (MM)"
                    onChange={handleChange}
                    value={cardDetails.expiryMonth}
                />
                <Input
                    theme={theme}
                    type="text"
                    name="expiryYear"
                    placeholder="Expiry Year (YY)"
                    onChange={handleChange}
                    value={cardDetails.expiryYear}
                />
                <Input
                    theme={theme}
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    onChange={handleChange}
                    value={cardDetails.cvv}
                />
                <Input
                    theme={theme}
                    type="email"
                    name="customerEmail"
                    placeholder="Customer Email"
                    onChange={handleChange}
                    value={cardDetails.customerEmail}
                />
                <Input
                    theme={theme}
                    type="text"
                    name="customerName"
                    placeholder="Customer Name"
                    onChange={handleChange}
                    value={cardDetails.customerName}
                />
                {transactionReference && (
                    <Input
                        theme={theme}
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                    />
                )}
                <ButtonContainer>
                    {!transactionReference ? (
                        <Button primary theme={theme} onClick={handlePayment} disabled={loading}>
                            {loading ? 'Processing...' : 'Process Payment'}
                        </Button>
                    ) : (
                        <Button primary theme={theme} onClick={handleOtpSubmit}>
                            Submit OTP
                        </Button>
                    )}
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                </ButtonContainer>
            </PaymentContainer>
        </PaymentContainerA>
    );
}

export default ManualCardPayment;


const PaymentContainerA = styled.div`
    padding-top: 100px;
    padding-bottom:100px;
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

const Icon = styled(FaCreditCard)`
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
