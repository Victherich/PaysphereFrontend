
// export default ManualCardPayment;
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCreditCard } from 'react-icons/fa'; // Icon for Card Payment
import axios from 'axios';

const ManualCardPayment = () => {
    const { setMenuSwitch, theme ,pop1} = useContext(Context);

    const [cardDetails, setCardDetails] = useState({
        amount: '',
        cardNumber: '',
        cardName: '', // Added card name field for name on card
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        pin: '', // Optional
        customerEmail: '',
        customerName: '',
        internalRef: '' // For metadata
    });

    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [transactionReference, setTransactionReference] = useState(null);
    const [error, setError] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    // Handle payment initiation
    // const handlePayment = async () => {
    //     setLoading(true);
    
    //     const paymentData = {
    //         reference: `test-card-payment-${Date.now()}`, // Reference must be at least 8 characters
    //         card: {
    //             name: cardDetails.cardName, // Cardholder name
    //             number: cardDetails.cardNumber,
    //             cvv: cardDetails.cvv,
    //             expiry_month: cardDetails.expiryMonth,
    //             expiry_year: cardDetails.expiryYear,
    //             pin: cardDetails.pin || "0000" // Only send pin if it's not empty
    //         },
    //         amount: parseInt(cardDetails.amount, 10), // Ensure amount is a number
    //         currency: 'NGN',
    //         redirect_url: 'https://merchant-redirect-url.com', // Optional redirect URL
    //         customer: {
    //             name: cardDetails.customerName, // Optional customer name
    //             email: cardDetails.customerEmail
    //         },
    //         metadata: {
    //             internalRef: cardDetails.internalRef || `INT-${Date.now()}`, // Optional metadata
    //             age: 30, // Example metadata fields
    //             fixed: true
    //         }
    //     };
    
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/payment', paymentData);
    //         const { data } = response;
            
    //         if (data.status === 'success') {
    //             setTransactionReference(data.transaction_reference);
    //         } else {
    //             console.error('Payment initiation failed:', data.message);
    //         }
    //     } catch (error) {
    //         console.error('Payment error:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handlePayment = async () => {
        setLoading(true);
      
        // Validate that all required fields are populated
        if (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.expiryMonth || !cardDetails.expiryYear || !cardDetails.amount || !cardDetails.customerEmail) {
          setError('Please fill all required fields.');
          setLoading(false);
          return;
        }
      
        const paymentData = {
          reference: `test-card-payment-${Date.now()}`,
          card: {
            number: cardDetails.cardNumber,
            cvv: cardDetails.cvv,
            expiry_month: cardDetails.expiryMonth,
            expiry_year: cardDetails.expiryYear,
            pin: cardDetails.pin || "0000" // Optional
          },
          amount: parseFloat(cardDetails.amount),
          currency: 'NGN',
          redirect_url: 'https://your-redirect-url.com',
          customer: {
            email: cardDetails.customerEmail,
            name: cardDetails.customerName
          },
          metadata: {
            internalRef: `INT-${Date.now()}`,
            age: 30,
            fixed: true
          }
        };

        console.log(paymentData)
      
        try {
          const response = await axios.post('http://localhost:5000/api/payment', paymentData);
          const { data } = response;
          
          if (data.status === 'success') {
            setTransactionReference(data.transaction_reference);
          } else {
            console.error('Payment initiation failed:', data.message);
          }
        } catch (error) {
          console.error('Payment error:', error);
        } finally {
          setLoading(false);
        }
      };
      

    // Handle OTP submission
    const handleOtpSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/payment/authorize', {
                transaction_reference: transactionReference,
                otp
            });

            const data = response.data;
            if (data.status === 'success') {
                alert('Payment successful!');
            } else {
                alert('Payment authorization failed');
            }
        } catch (error) {
            setError('OTP submission failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PaymentContainerA>
            <PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaCreditCard />
                </Icon>
                <Title theme={theme}>Receive Manual Card Payment</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
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
                    name="cardName"
                    placeholder="Cardholder Name"
                    onChange={handleChange}
                    value={cardDetails.cardName}
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
                <Input
                    theme={theme}
                    type="text"
                    name="internalRef"
                    placeholder="Internal Reference"
                    onChange={handleChange}
                    value={cardDetails.internalRef}
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
                        <Button primary theme={theme} onClick={handleOtpSubmit} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit OTP'}
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

const ErrorMessage= styled.p`

`





    // Encryption function
// const encryptAES256 = (encryptionKey, paymentData) => {
//     const iv = CryptoJS.lib.WordArray.random(16); // Generate a random IV
//     const key = CryptoJS.enc.Utf8.parse(encryptionKey); // Parse encryption key

//     const encrypted = CryptoJS.AES.encrypt(paymentData, key, {
//         iv: iv,
//         mode: CryptoJS.mode.GCM,
//         padding: CryptoJS.pad.Pkcs7
//     });

//     return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}:${encrypted.iv.toString(CryptoJS.enc.Hex)}`;
// };


    //compatible with node JS
    // // Encryption function
    // const encryptAES256 = (encryptionKey, paymentData) => {
    //     const iv = crypto.randomBytes(16);
    //     const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    //     const encrypted = Buffer.concat([cipher.update(paymentData), cipher.final()]);
    //     return `${iv.toString('hex')}:${encrypted.toString('hex')}:${cipher.getAuthTag().toString('hex')}`;
    // };

    // Handle the payment process




    

// // Encryption function using AES-256-CBC
// const encryptAES256 = (encryptionKey, paymentData) => {
//     const iv = CryptoJS.lib.WordArray.random(16);  // Generate a random IV
//     const key = CryptoJS.enc.Utf8.parse(encryptionKey); // Parse the encryption key

//     // Encrypt data using AES with CBC mode and PKCS7 padding
//     const encrypted = CryptoJS.AES.encrypt(paymentData, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,  // Use CBC mode
//         padding: CryptoJS.pad.Pkcs7 // Use PKCS7 padding
//     });

//     // Return the IV and encrypted data as hex strings
//     return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
// };




//     const handlePayment = async () => {
//         setLoading(true);
//         const paymentData = {
//             reference: 'unique-payment-ref-' + new Date().getTime(), // Unique reference for each transaction
//             card: {
//                 number: cardDetails.cardNumber,
//                 cvv: cardDetails.cvv,
//                 expiry_month: cardDetails.expiryMonth,
//                 expiry_year: cardDetails.expiryYear,
//                 pin: cardDetails.pin // Optional
//             },
//             amount: parseInt(cardDetails.amount, 10),
//             currency: 'NGN',
//             redirect_url: 'https://your-redirect-url.com', // Optional
//             customer: {
//                 name: cardDetails.customerName,
//                 email: cardDetails.customerEmail,
//             },
//             metadata: {
//                 internalRef: 'JD-12-67',
//                 age: 15,
//                 fixed: true,
//             }
//         };

//         try {
//             // Step 2: Encrypt payment data
//             const encryptionKey = 'YOUR_ENCRYPTION_KEY'; // Replace with your Kora encryption key
//             const encryptedData = encryptAES256(encryptionKey, JSON.stringify(paymentData));

//             // Step 3: Charge card
//             const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/card', {
//                 charge_data: encryptedData
//             }, {
//                 headers: {
//                     Authorization: 'Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1' // Replace with your Kora secret key
//                 }
//             });

//             const { data } = response.data;
//             if (data.status === 'processing' && data.auth_model === 'OTP') {
//                 setTransactionReference(data.transaction_reference);
//             }

//             setLoading(false);
//             // Handle OTP step here
//             alert('Please enter OTP sent to your phone/email.');

//         } catch (error) {
//             setLoading(false);
//             console.error('Payment failed', error);
//             alert('Payment failed. Please try again.');
//         }
//     };

// import crypto from 'crypto-browserify'; // Use crypto-browserify instead

// Encryption function using AES-256-GCM
// const encryptAES256GCM = (encryptionKey, paymentData) => {
//     const iv = crypto.randomBytes(16); // Generate a random IV (16 bytes)
//     const key = Buffer.from(encryptionKey, 'base64'); // Convert the encryption key to a Buffer
  
//     // Create the cipher using AES-256-GCM
//     const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
//     // Encrypt the payment data
//     let encrypted = cipher.update(paymentData, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
    
//     // Get the authentication tag (authTag) from the cipher
//     const authTag = cipher.getAuthTag().toString('hex');
  
//     // Return the IV, encrypted data, and authTag concatenated as required
//     return `${iv.toString('hex')}:${encrypted}:${authTag}`;
//   };
  
  
//   // // Encryption function using AES-256-GCM
//   // const encryptAES256GCM = (encryptionKey, paymentData) => {
//   //   const iv = crypto.randomBytes(16); // Generate a random IV (16 bytes)
//   //   const key = Buffer.from(encryptionKey, 'base64'); // Convert the encryption key to a Buffer
  
//   //   // Create the cipher using AES-256-GCM
//   //   const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
//   //   // Encrypt the payment data
//   //   let encrypted = cipher.update(paymentData, 'utf8', 'hex');
//   //   encrypted += cipher.final('hex');
    
//   //   // Get the authentication tag (authTag) from the cipher
//   //   const authTag = cipher.getAuthTag().toString('hex');
  
//   //   // Return the IV, encrypted data, and authTag concatenated as required
//   //   return `${iv.toString('hex')}:${encrypted}:${authTag}`;
//   // };
  
//   // Function to handle payment
//   const handlePayment = async () => {
//     setLoading(true);
  
//     const paymentData = {
//       reference: 'unique-payment-ref-' + new Date().getTime(), // Unique reference
//       card: {
//         number: cardDetails.cardNumber,
//         cvv: cardDetails.cvv,
//         expiry_month: cardDetails.expiryMonth,
//         expiry_year: cardDetails.expiryYear,
//         pin: cardDetails.pin || null // Optional
//       },
//       amount: parseInt(cardDetails.amount, 10),
//       currency: 'NGN',
//       redirect_url: 'https://your-redirect-url.com', // Optional
//       customer: {
//         name: cardDetails.customerName,
//         email: cardDetails.customerEmail,
//       },
//       metadata: {
//         internalRef: 'JD-12-67',
//         age: 15,
//         fixed: true,
//       }
//     };
  
//     try {
//       // Ensure encryption key is base64 encoded
//       const encryptionKey = 'YOUR_BASE64_ENCODED_ENCRYPTION_KEY'; // Replace with your base64-encoded encryption key
  
//       // Step 2: Encrypt the payment data as per Kora's AES-256-GCM standard
//       const encryptedData = encryptAES256GCM(encryptionKey, JSON.stringify(paymentData));
  
//       // Step 3: Make the request to KoraPay's charge card API
//       const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/card', {
//         charge_data: encryptedData
//       }, {
//         headers: {
//           Authorization: 'Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1' // Replace with your Korapay secret key
//         }
//       });
  
//       const { data } = response.data;
      
//       if (data.status === 'processing' && data.auth_model === 'OTP') {
//         setTransactionReference(data.transaction_reference);
//       }
  
//       setLoading(false);
//       alert('Please enter OTP sent to your phone/email.');
      
//     } catch (error) {
//       setLoading(false);
//       console.error('Payment failed', error);
//       alert('Payment failed. Please try again.');
//     }
//   };
  
  
//       // Handle OTP authorization
//       const handleOtpSubmit = async () => {
//           if (!otp || !transactionReference) return;
  
//           try {
//               const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/card/authorize', {
//                   transaction_reference: transactionReference,
//                   authorization: {
//                       otp: otp
//                   }
//               }, {
//                   headers: {
//                       Authorization: 'sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1'
//                   }
//               });
  
//               const { data } = response.data;
//               if (data.status === 'success') {
//                   alert('Payment successful!');
//               } else {
//                   alert('Payment failed. Please try again.');
//               }
//           } catch (error) {
//               console.error('OTP verification failed', error);
//               alert('OTP verification failed. Please try again.');
//           }
//       };
  