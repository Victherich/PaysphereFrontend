
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaMobileAlt } from 'react-icons/fa'; 
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import { useSelector } from 'react-redux';

const MobileMoneyPayment = () => {
    const { setMenuSwitch, theme,pop1 } = useContext(Context);
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
    const navigate = useNavigate()
    const userInfo = useSelector(state=>state.userInfo);
    const userToken=useSelector(state=>state.userToken)
    const [currency,setCurrency]=useState("")
  

    const KES_TO_USD_RATE = 129; 
    const GHS_TO_USD_RATE = 15.77; 

   

    //handle pay-IN IN GHS 

    const handlePaymentA = () => {
        if (currency===""||currency==="KES") {
            Swal.fire({
                icon: 'error',
                text: 'Please select the right currency for your mobile money wallet',
                // text: 'P'
            });
            return;
        }

        handlePayment();

    }

    const handlePayment = async () => {
        const amountInGHS = parseFloat(amount);
        const amountInUSD = (amountInGHS / GHS_TO_USD_RATE).toFixed(2); 
    
        
        Swal.fire({
            title: 'Confirm Amount',
            text: `You are about to pay GHS ${amountInGHS}. The equivalent you will receive in USD is $${amountInUSD}. Proceed?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
             
                const loadingAlert = Swal.fire({ title: "Processing..." });
                setLoading(true);
                setError('');
                setMessage('');
                Swal.showLoading();
    
                try {
                    const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/mobile-money', {
                        amount: amountInGHS, 
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
                            Authorization: `Bearer ${pop1}`,
                            'Content-Type': 'application/json',
                        },
                    });
    
                    if (response.data.status) {
                        setTransactionReference(response.data.data.transaction_reference);
                        setMessage(response.data.data.message);
    
                        Swal.fire({ text: response.data.data.message });
                        console.log(response.data);
                        
                        if (response.data.message === "Authorization required") {
                            setOpenOtp(true);
                            setMainInput(false);
                        }
                    }
    
                } catch (error) {
                    setError('Failed to initiate payment. Please try again.');
                    console.error(error);
                } finally {
                    setLoading(false);
                    loadingAlert.close();
                }
            } else {
                
                setLoading(false);
            }
        });
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
                    Authorization: `Bearer ${pop1}`,
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
        const amountInGHS = parseFloat(amount);
        const amountInUSD = (amountInGHS / GHS_TO_USD_RATE).toFixed(2); 

        try {
            const response = await axios.post('https://api.korapay.com/merchant/api/v1/charges/mobile-money/sandbox/authorize-stk', {
                reference: transactionReference,
                pin: pin
            }, {
                headers: {
                    Authorization: `Bearer ${pop1}`,
                    'Content-Type': 'application/json'
                }
            });

            setMessage(response.data.message);
            Swal.fire({icon:"success",text:response.data.message})
            setMenuSwitch(0);
            console.log(response.data)
            creditUserWallet(userInfo.walletID, parseFloat(amountInUSD));

        } catch (error) {
            setError('Failed to authorize payment. Please try again.');
        } finally {
            setLoading(false);
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
                text: `Your wallet has been credited. New Balance: USD ${data.wallet}`
            });
            // setAmountPaid(null)
            setMenuSwitch(0);
            navigate("/dashboard")
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









    //MOBILE MONEY PAYOUT

    //  const generateReference = () => `ref-${Date.now()}`;


    //  const handlePayout = async () => {
    //     if(amount<100||amount===""){
    //         Swal.fire({text:"You can only send 100 and more"})
    //         return
    //     }
    //     if(phoneNumber===""){
    //         Swal.fire({text:"Please enter recipient phone number"})
    //         return
    //     }
    //      const loadingAlert = Swal.fire({ title: "Processing..." });
    //      setLoading(true);
    //      setError('');
    //      setMessage('');
    //      Swal.showLoading();
 
    //      const payload = {
    //          reference: generateReference(),
    //          destination: {
    //              type: "mobile_money",
    //              amount: amount,
    //              currency: "GHS", 
    //              narration: "Test Transfer Payment",
    //              mobile_money: {
    //                  operator: "airtel-gh", 
    //                  mobile_number: phoneNumber,
    //              },
    //              customer: {
    //                  name: "John Doe", 
    //                  email: "johndoe@email.com"
    //              }
    //          }
    //      };
 
    //      try {
    //          const response = await axios.post('https://api.korapay.com/merchant/api/v1/transactions/disburse', payload, {
    //              headers: {
    //                  Authorization: `Bearer ${pop1}`, 
    //                  'Content-Type': 'application/json'
    //              }
    //          });
 
    //          const data = response.data;

    //          if (data.status) {
              
    //              setTransactionReference(data.data.reference);
    //              Swal.fire({ icon: 'success', text: data.message });
    //              console.log(data)
    //              setAmount("");
    //              setPhoneNumber("");
    //              setMomoUiSwitch(0);
    //          } else {
    //              setError("Failed to initiate payout. Try again.");
    //              Swal.fire({ icon: 'error', text: "Payout initiation failed" });
    //          }
    //      } catch (error) {
    //          setError("An error occurred during the payout process.");
    //          Swal.fire({ icon: 'error', text: error.message || "Error during payout" });
    //      } finally {
    //          setLoading(false);
    //          loadingAlert.close();
    //      }
    //  };


    // //  debit user wallet
    // const debitUserWallet = async (amount) => {
    //     try {
    //         const response = await axios.post(
    //             'https://paysphere-api.vercel.app/transfer_to_bank',
    //             { amount },
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${userToken}` 
    //                 }
    //             }
    //         );
    
    //         const data = response.data;
    
    //         if (response.status === 200) {
    //             console.log('Wallet debited successfully:', data.amountPaid);
    //             Swal.fire({
    //                 icon: 'success',
    //                 title: 'Wallet Debited',
    //                 text: `Your wallet has been debited by ${data.amountPaid} USD.`
    //             });
    //         } else if (response.status === 400) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Insufficient Funds',
    //                 text: 'You do not have enough funds to complete this transaction.'
    //             });
    //         } else if (response.status === 404) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Sender Not Found',
    //                 text: 'Unable to find the sender\'s wallet details.'
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error while debiting wallet:', error);
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error Debiting Wallet',
    //             text: 'An error occurred while debiting your wallet. Please try again.'
    //         });
    //     }
    // };




    const handlePaymentB = () => {
        if (currency===""||currency==="KES") {
            Swal.fire({
                icon: 'error',
                text: 'Please select the right currency for your mobile money wallet',
                // text: 'P'
            });
            return;
        }

        handlePayout();

    }


const generateReference = () => `ref-${Date.now()}`;

const handlePayout = async () => {
    if (amount < 100 || amount === "") {
        Swal.fire({ text: "You can only send 100 GHS or more" });
        return;
    }
    if (phoneNumber === "") {
        Swal.fire({ text: "Please enter recipient phone number" });
        return;
    }

    const amountInUSD = (parseFloat(amount) / GHS_TO_USD_RATE).toFixed(2);

    Swal.fire({
        title: 'Confirm Amount',
        text: `You are about to send GHS ${amount} which is $${amountInUSD} in USD which shall be debited from your wallet. Proceed?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const loadingAlert = Swal.fire({ title: "Processing..." });
            setLoading(true);
            setError('');
            setMessage('');
            Swal.showLoading();

            const payload = {
                reference: generateReference(),
                destination: {
                    type: "mobile_money",
                    amount: amount,
                    currency: "GHS", 
                    narration: "Test Transfer Payment",
                    mobile_money: {
                        operator: "airtel-gh",
                        mobile_number: phoneNumber,
                    },
                    customer: {
                        name: "John Doe",
                        email: "johndoe@email.com"
                    }
                }
            };

            try {
                const response = await axios.post('https://api.korapay.com/merchant/api/v1/transactions/disburse', payload, {
                    headers: {
                        Authorization: `Bearer ${pop1}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = response.data;

                if (data.status) {
                    setTransactionReference(data.data.reference);
                    Swal.fire({ icon: 'success', text: data.message });
                    await debitUserWallet(amountInUSD);
                    setAmount("");
                    setPhoneNumber("");
                    setMomoUiSwitch(0);
                } else {
                    setError("Failed to initiate payout. Try again.");
                    Swal.fire({ icon: 'error', text: "Payout initiation failed" });
                }
            } catch (error) {
                setError("An error occurred during the payout process.");
                Swal.fire({ icon: 'error', text: error.message || "Error during payout" });
            } finally {
                setLoading(false);
                loadingAlert.close();
            }
        } else {
            setLoading(false);
        }
    });
};

const debitUserWallet = async (amount) => {
    const loadingAlert = Swal.fire({title:"Debiting wallet..."});
    Swal.showLoading();
    try {
        const response = await axios.post(
            'https://paysphere-api.vercel.app/transfer_to_bank',
            { amount },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            }
        );

        const data = response.data;

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Wallet Debited',
                text: `Your wallet has been debited by ${data.amountPaid} USD.`
            });
        } else if (response.status === 400) {
            Swal.fire({
                icon: 'error',
                title: 'Insufficient Funds',
                text: 'You do not have enough funds to complete this transaction.'
            });
        } else if (response.status === 404) {
            Swal.fire({
                icon: 'error',
                title: 'Sender Not Found',
                text: 'Unable to find the sender\'s wallet details.'
            });
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Debiting Wallet',
            text: 'An error occurred while debiting your wallet. Please try again.'
        });
    }finally{
        loadingAlert.close();
    }
};



    return (
       <Body theme={theme}>
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
                    <Button onClick={() => navigate("/dashboard")}  theme={theme}>Cancel</Button>
                    <Button primary onClick={() => setMomoUiSwitch(2)} theme={theme}>Pay to Mobile Money</Button>
                </ButtonContainer>

            </PaymentContainer>}
            {momoUiSwitch===1&&<PaymentContainer theme={theme}>
                <Icon theme={theme}>
                    <FaMobileAlt />
                </Icon>
                <Title theme={theme}>Receive Mobile Money Payment</Title>
               {mainInput&& <Select onChange={(e)=>setCurrency(e.target.value)}>
                        <option >Select currency</option>
                        <option value="GHS">GHS</option>
                        <option value="KES">KES</option>
                    </Select>}
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
                    placeholder="Enter Payer Mobile Number"
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
                            <Button onClick={() => navigate("/dashboard")}  theme={theme}>Cancel</Button>
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
                            <Button onClick={() => navigate("/dashboard")}  theme={theme}>Cancel</Button>
                            </ButtonContainer>
                            
                        </>
                    )}
                {mainInput&&<ButtonContainer>
                    <Button primary theme={theme} onClick={handlePaymentA} disabled={loading}>
                        {loading ? 'Processing...' : 'Receive'}
                    </Button>
                    <Button onClick={() => navigate("/dashboard")}  theme={theme}>Cancel</Button>
                    <Button primary onClick={() => setMomoUiSwitch(0)} theme={theme}>Back</Button>
                </ButtonContainer>}

            </PaymentContainer>}


{momoUiSwitch === 2 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaMobileAlt />
                    </Icon>
                    <Title theme={theme}>Pay to Mobile Money</Title>
                    {mainInput&& <Select onChange={(e)=>setCurrency(e.target.value)}>
                        <option >Select currency</option>
                        <option value="GHS">GHS</option>
                        <option value="KES">KES</option>
                    </Select>}
                    {mainInput && (
                        <>
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
                                placeholder="Enter Recipient Mobile Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </>
                    )}
                    
                    {message && <Message success>{message}</Message>}
                    {error && <Message error>{error}</Message>}

                    {mainInput && (
                        <ButtonContainer>
                            <Button primary theme={theme} onClick={handlePaymentB} disabled={loading}>
                                {loading ? 'Processing...' : 'Make Payment'}
                            </Button>
                            <Button onClick={() => navigate("/dashboard")} theme={theme}>Cancel</Button>
                            <Button primary onClick={() => setMomoUiSwitch(0)} theme={theme}>Back</Button>
                        </ButtonContainer>
                    )}
                </PaymentContainer>
            )}
        </PaymentContainerA>
       </Body>
    );
};

export default MobileMoneyPayment;


const Body = styled.div`
  width: 100%;
  position: relative; 
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
  z-index: 1; 

 
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme==="light"?"rgba(255,255,255,0.8)":"rgba(0, 0, 0, 0.8)"}; 
    z-index: -1; 
  }

  @media (max-width: 320px) {
    padding-bottom: 100px;
  }
`;




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



const Select = styled.select`
    padding:8px;
    margin-bottom:10px;
    width:100%;
    cursor:pointer;
    outline:none;
`