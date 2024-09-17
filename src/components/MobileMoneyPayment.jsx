// // MobileMoneyPayment.js

// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { Context } from './Context';
// import { FaMobileAlt } from 'react-icons/fa'; // New icon for mobile money

// const MobileMoneyPayment = () => {
//     const { setMenuSwitch, theme } = useContext(Context);

//     return (
//         <PaymentContainerA>
//             <PaymentContainer theme={theme}>
//                 <Icon theme={theme}>
//                     <FaMobileAlt />
//                 </Icon>
//                 <Title theme={theme}>Receive Mobile Money Payment</Title>
//                 <Input theme={theme} type="text" placeholder="Enter Amount" />
//                 <Input theme={theme} type="text" placeholder="Enter Payer Phone Number" />
//                 {/* <Input theme={theme} type="text" placeholder="Enter Recipient ID" /> */}
//                 <ButtonContainer>
//                     <Button primary theme={theme}>Make Payment</Button>
//                     <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
//                 </ButtonContainer>
//             </PaymentContainer>
//         </PaymentContainerA>
//     );
// }

// export default MobileMoneyPayment;

// const PaymentContainerA = styled.div`
//     padding-top: 100px;
// `;

// const PaymentContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//     background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
//     border-radius: 8px;
//     box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
//     max-width: 400px;
//     margin: 0 auto;

//     @media (min-width: 768px) {
//         padding: 30px;
//         max-width: 600px;
//     }
// `;

// const Icon = styled(FaMobileAlt)`
//     font-size: 4rem;
//     color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
//     margin-bottom: 20px;
// `;

// const Title = styled.h2`
//     font-size: 24px;
//     color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
//     margin-bottom: 20px;

//     @media (min-width: 768px) {
//         font-size: 28px;
//     }
// `;

// const Input = styled.input`
//     width: 100%;
//     padding: 10px;
//     margin-bottom: 15px;
//     border-radius: 4px;
//     border: 1px solid ${({ theme }) => (theme === 'light' ? '#ccc' : '#555')};
//     font-size: 16px;
//     outline: none;
//     background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
//     color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

//     &:hover {
//         outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
//     }

//     @media (min-width: 768px) {
//         padding: 12px;
//         font-size: 18px;
//     }
// `;

// const ButtonContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;

//     @media (min-width: 768px) {
//         flex-direction: row;
//         justify-content: space-between;
//     }
// `;

// const Button = styled.button`
//     padding: 12px;
//     width: 100%;
//     background-color: ${({ primary, theme }) => 
//         primary ? (theme === 'light' ? '#007bff' : '#0056b3') : 
//         (theme === 'light' ? '#ccc' : '#666')};
//     color: ${({ primary }) => (primary ? 'white' : 'black')};
//     border: none;
//     border-radius: 4px;
//     font-size: 16px;
//     cursor: pointer;
//     margin-bottom: 10px;

//     &:hover {
//         background-color: ${({ primary, theme }) => 
//             primary ? (theme === 'light' ? '#004494' : '#003d7a') : 
//             (theme === 'light' ? '#aaa' : 'gray')};
//     }

//     @media (min-width: 768px) {
//         padding: 14px;
//         font-size: 18px;
//         margin-bottom: 0;
//         width: 48%;
//     }
// `;



import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaMobileAlt } from 'react-icons/fa'; // New icon for mobile money
import axios from 'axios'; // Import axios for API requests
import Swal from 'sweetalert2';

const MobileMoneyPayment = () => {
    const { setMenuSwitch, theme } = useContext(Context);
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [openOtp,setOpenOtp]=useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [transactionReference, setTransactionReference] = useState('');
    const [pin,setPin]=useState('')
    const [openPin,setOpenPin]=useState(false)
    const [mainInput,setMainInput]=useState(true)
    const [momoUiSwitch,setMomoUiSwitch]=useState(0)

    const handlePayment = async () => {
        const loadingAlert = Swal.fire({title:"Processing..."})
        setLoading(true);
        setError('');
        setMessage('');
        Swal.showLoading();

        try {
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/mobile-money', {
                amount: parseFloat(amount),
                currency: "GHS",
                reference: `ref-${Date.now()}`,
                customer: {
                    email: "customer@example.com",
                },
                mobile_money: {
                    number: phoneNumber,
                },
                notification_url: "https://webhook.site/your-webhook-url",
                redirect_url: "https://your-redirect-url.com",
                merchant_bears_cost: false,
            }, {
                headers: {
                    Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                setTransactionReference(response.data.data.transaction_reference);
                setMessage(response.data.data.message);
                
                
                Swal.fire({text:response.data.data.message})
                console.log(response.data)
                if(response.data.message==="Authorization required"){
                    setOpenOtp(true)
                    setMainInput(false)
                }
            }

        } catch (error) {
            setError('Failed to initiate payment. Please try again.');
        } finally {
            setLoading(false);
            loadingAlert.close();
        }
    };

    const handleAuthorize = async () => {
        const loadingAlert = Swal.fire({title:"Processing..."})
        Swal.showLoading();
        setLoading(true);
        setError('');

        setMessage('');

        try {
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/mobile-money/authorize', {
                reference: transactionReference,
                token: otp
            }, {
                headers: {
                    Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage(response.data.message);
        
            setOpenOtp(false)
            setOpenPin(true)
            Swal.fire({text:response.data.message})
            
        } catch (error) {
            setError('Failed to authorize payment. Please try again.');
        } finally {
            setLoading(false);
            loadingAlert.close();
        }
    };




    const handleAuthorize2 = async () => {
        const loadingAlert = Swal.fire({title:"Processing..."})
        Swal.showLoading();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/mobile-money/sandbox/authorize-stk', {
                reference: transactionReference,
                pin: pin
            }, {
                headers: {
                    Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage(response.data.message);
            Swal.fire({icon:"success",text:response.data.message})
            setMenuSwitch(0);
            console.log(response.data)
        } catch (error) {
            setError('Failed to authorize payment. Please try again.');
        } finally {
            setLoading(false);
            loadingAlert.close();
        }
    };



    return (
        <PaymentContainerA>
            {momoUiSwitch===0&&<PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>Mobile Money Payment</Title>
                
                <ButtonContainer>
                    <Button primary theme={theme} onClick={()=>setMomoUiSwitch(1)}>
                        Receive Mobile Money
                    </Button>
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                    <Button primary onClick={() => setMomoUiSwitch(2)} theme={theme}>Pay to Mobile Money</Button>
                </ButtonContainer>

            </PaymentContainer>}
            {momoUiSwitch===1&&<PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>Receive Mobile Money Payment</Title>
                {mainInput&&<Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />}
                {mainInput&&<Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Payer Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />}
                
                {message && <Message success>{message}</Message>}
                {error && <Message error>{error}</Message>}

                {openOtp && (
                        <>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <ButtonContainer>
                            <Button primary theme={theme} onClick={handleAuthorize} disabled={loading}>
                                {loading ? 'Sending Otp...' : 'Send Otp'}
                            </Button>
                            <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                            </ButtonContainer>
                           
                        </>
                    )}
                    {openPin && (
                        <>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <ButtonContainer>
                            <Button primary theme={theme} onClick={handleAuthorize2} disabled={loading}>
                                {loading ? 'Authorizing...' : 'Authorize Payment'}
                            </Button>
                            <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                            </ButtonContainer>
                            
                        </>
                    )}
                {mainInput&&<ButtonContainer>
                    <Button primary theme={theme} onClick={handlePayment} disabled={loading}>
                        {loading ? 'Processing...' : 'Receive'}
                    </Button>
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                    <Button primary onClick={() => setMomoUiSwitch(0)} theme={theme}>Back</Button>
                </ButtonContainer>}

            </PaymentContainer>}
            {momoUiSwitch===2&&<PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>Pay to Mobile Money</Title>
                {mainInput&&<Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />}
                {mainInput&&<Input
                    theme={theme}
                    type="text"
                    placeholder="Enter Recipient Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />}
                
                {message && <Message success>{message}</Message>}
                {error && <Message error>{error}</Message>}

                {openOtp && (
                        <>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <ButtonContainer>
                            <Button primary theme={theme} onClick={handleAuthorize} disabled={loading}>
                                {loading ? 'Sending Otp...' : 'Send Otp'}
                            </Button>
                            <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                            </ButtonContainer>
                           
                        </>
                    )}
                    {openPin && (
                        <>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <ButtonContainer>
                            <Button primary theme={theme} onClick={handleAuthorize2} disabled={loading}>
                                {loading ? 'Authorizing...' : 'Authorize Payment'}
                            </Button>
                            <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                            </ButtonContainer>
                            
                        </>
                    )}
                {mainInput&&<ButtonContainer>
                    <Button primary theme={theme} onClick={handlePayment} disabled={loading}>
                        {loading ? 'Processing...' : 'Make Payment'}
                    </Button>
                    <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                    <Button primary onClick={() => setMomoUiSwitch(0)} theme={theme}>Back</Button>
                </ButtonContainer>}

            </PaymentContainer>}
        </PaymentContainerA>
    );
};

export default MobileMoneyPayment;

const PaymentContainerA = styled.div`
    padding-top: 100px;
    // padding-bottom:100px;
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

const Icon = styled(FaMobileAlt)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
    text-align:center;

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

const Message = styled.p`
    color: ${({ success, error }) => 
        success ? 'green' : 
        error ? 'red' : 'inherit'};
    font-size: 16px;
    margin-bottom: 15px;
    text-align:center;
`;
