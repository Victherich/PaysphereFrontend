
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUniversity } from 'react-icons/fa';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";


const BankPayment = () => {
    const { setMenuSwitch, theme,pop1 } = useContext(Context);
    const [bankTransferSwitch, setBankTransferSwitch] = useState(0);
    const [showAccountNumber, setShowAccountNumber] = useState(false);
    const userToken = useSelector(state=>state.userToken)
    const navigate = useNavigate()

    // State for Pay to Bank
    const [amount, setAmount] = useState('');
    const [generatedAccount, setGeneratedAccount] = useState(null); 
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [banks, setBanks] = useState([]); 
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchBanks = async () => {
            try {
                const response = await axios.get(
                    'https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG',
                    {
                        headers: {
                            Authorization: `Bearer pk_test_tSvcVcCCD8YG7ZCsn4nM2Jr1QBVuKRyARvRxJXDy`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.data.status) {
                    setBanks(response.data.data); 
                } else {
                    setStatusMessage('Failed to fetch bank list.');
                }
            } catch (error) {
                console.error('Error fetching bank list:', error);
                setStatusMessage('An error occurred while fetching the bank list.');
            }
        };

        fetchBanks();
    }, []); 

    

    const NGN_TO_USD_RATE = 1660; 
    
    const handleGenerateAccountNumber = async () => {
        setLoading(true);
        setStatusMessage('');
        setGeneratedAccount(null); 
    
        if (!amount || parseFloat(amount) < 100) {
            setStatusMessage('Please enter a valid amount (min NGN 100)');
            setLoading(false);
            return;
        }
    
        const amountInNGN = parseFloat(amount);
        const amountInUSD = (amountInNGN / NGN_TO_USD_RATE).toFixed(2); 
     
        Swal.fire({
            title: 'Confirm Amount',
            text: `You are about to generate an account for NGN ${amountInNGN}. The equivalent in USD you will receive is $${amountInUSD}. Proceed?`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        }).then(async (result) => {
            if (result.isConfirmed) {
              
                const requestData = {
                    account_name: "Demo account",
                    amount: amountInNGN,
                    currency: "NGN",
                    reference: `bank-transfer-${Date.now()}`, 
                    customer: {
                        name: "John Doe", 
                        email: "johndoe@gmail.com"
                    }
                };
    
                try {
                    const response = await axios.post(
                        'https://api.korapay.com/merchant/api/v1/charges/bank-transfer',
                        requestData,
                        {
                            headers: {
                                Authorization: `Bearer ${pop1}`, 
                                'Content-Type': 'application/json',
                            }
                        }
                    );
    
                    const data = response.data;
    
                    if (data.status) {
                        setGeneratedAccount(data.data.bank_account);
                        setShowAccountNumber(true);
                    } else {
                        setStatusMessage('Failed to initiate bank transfer.');
                    }
                } catch (error) {
                    setStatusMessage('An error occurred while generating the bank account.');
                    console.error('Error:', error);
                } finally {
                    setLoading(false);
                }
            } else {
               
                setLoading(false);
            }
        });
    };
    
    
// const handlePayToBank = async () => {
//     if (amount < 1000 || amount > 1000000) {
//         Swal.fire({ text: 'You can only send between NGN 1,000 to NGN 1,000,000' });
//         return;
//     }

//     setStatusMessage(''); 

//     if (!amount || !bankAccountNumber || !selectedBank) {
//         setStatusMessage('Please fill in all fields correctly.');
//         setLoading(false);
//         return;
//     }

//     setLoading(true);
//     const loadingAlert = Swal.fire({ text: "Processing..." });
//     Swal.showLoading();

//     const transactionData = {
//         reference: `unique-transaction-${Date.now()}`,
//         destination: {
//             type: 'bank_account',
//             amount: amount,
//             currency: 'NGN',
//             narration: 'Bank Transfer Payment',
//             bank_account: {
//                 bank: selectedBank, 
//                 account: bankAccountNumber,
//             },
//             customer: {
//                 name: 'John Doe', 
//                 email: 'johndoe@email.com',
//             },
//         },
//     };

//     try {
//         const response = await axios.post(
//             'https://api.korapay.com/merchant/api/v1/transactions/disburse',
//             transactionData,
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${pop1}`, 
//                 },
//             }
//         );

//         const data = response.data;

//         if (data.status) {
//             Swal.fire({ icon: "success", text: data.message });

       
//             await debitUserWallet(parseFloat(amount));

           
//             setAmount("");
//             setBankAccountNumber("");
//             setSelectedBank("");
//             setBankTransferSwitch(0);
//         } else {
//             setStatusMessage(`Error: ${data.message}`);
//         }
//     } catch (error) {
//         setStatusMessage('An error occurred while processing the payment.');
//         console.error(error);
//     } finally {
//         setLoading(false);
//         loadingAlert.close();
//     }
// };




// const NGN_TO_USD_RATE2 = 750; // Assuming 1 USD = 750 NGN (Adjust according to the current rate)

const handlePayToBank = async () => {
    if (amount < 1000 || amount > 1000000) {
        Swal.fire({ text: 'You can only send between NGN 1,000 to NGN 1,000,000' });
        return;
    }

    setStatusMessage(''); 

    if (!amount || !bankAccountNumber || !selectedBank) {
        setStatusMessage('Please fill in all fields correctly.');
        setLoading(false);
        return;
    }

    setLoading(true);
    const loadingAlert = Swal.fire({ text: "Processing..." });
    Swal.showLoading();

    const amountInNGN = parseFloat(amount);
    const amountInUSD = (amountInNGN / NGN_TO_USD_RATE).toFixed(2); 

    
    Swal.fire({
        title: 'Confirm Amount',
        text: `You are about to send NGN ${amountInNGN}. The equivalent in USD is $${amountInUSD}. Proceed?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then(async (result) => {
        if (result.isConfirmed) {
            
            const transactionData = {
                reference: `unique-transaction-${Date.now()}`,
                destination: {
                    type: 'bank_account',
                    amount: amountInNGN,
                    currency: 'NGN',
                    narration: 'Bank Transfer Payment',
                    bank_account: {
                        bank: selectedBank, 
                        account: bankAccountNumber,
                    },
                    customer: {
                        name: 'John Doe', 
                        email: 'johndoe@email.com',
                    },
                },
            };

            try {
                const response = await axios.post(
                    'https://api.korapay.com/merchant/api/v1/transactions/disburse',
                    transactionData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${pop1}`, 
                        },
                    }
                );

                const data = response.data;

                if (data.status) {
                    Swal.fire({ icon: "success", text: data.message });

                 
                    await debitUserWallet(parseFloat(amountInUSD));

                 
                    setAmount("");
                    setBankAccountNumber("");
                    setSelectedBank("");
                    setBankTransferSwitch(0);
                } else {
                    setStatusMessage(`Error: ${data.message}`);
                }
            } catch (error) {
                setStatusMessage('An error occurred while processing the payment.');
                console.error(error);
            } finally {
                setLoading(false);
                loadingAlert.close();
            }
        } else {
        
            setLoading(false);
            loadingAlert.close();
        }
    });
};


const debitUserWallet = async (amount) => {
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
            console.log('Wallet debited successfully:', data.amountPaid);
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
        console.error('Error while debiting wallet:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error Debiting Wallet',
            text: 'An error occurred while debiting your wallet. Please try again.'
        });
    }
};






    return (
        <Body theme={theme}>
            <PaymentContainerA>
            {bankTransferSwitch === 0 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUniversity />
                    </Icon>
                    <Title theme={theme}>Bank Payment</Title>
                    <ButtonContainer>
                        <Button primary theme={theme} onClick={() => setBankTransferSwitch(1)}>
                            Receive from Bank
                        </Button>
                        <Button onClick={() =>navigate('/dashboard')} theme={theme}>
                            Cancel
                        </Button>
                        <Button primary onClick={() => setBankTransferSwitch(2)} theme={theme}>
                            Pay to Bank
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}

            {bankTransferSwitch === 1 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUniversity />
                    </Icon>
                    <Title theme={theme}>Receive from Bank</Title>

                    {!showAccountNumber && (
                        <>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter Amount in NGN"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <Button primary onClick={handleGenerateAccountNumber} theme={theme} disabled={loading}>
                                {loading ? 'Generating...' : 'Generate Account'}
                            </Button>
                        </>
                    )}

                    {showAccountNumber && generatedAccount && (
                        <>
                            <H3 theme={theme}>Account Number: {generatedAccount.account_number}</H3>
                            <H3 theme={theme}>Bank Name: {generatedAccount.bank_name}</H3>
                            <H3 theme={theme}>Account Name: {generatedAccount.account_name}</H3>
                            <H3 theme={theme}>Expires On: {new Date(generatedAccount.expiry_date_in_utc).toLocaleString()}</H3>
                            <H3 theme={theme}>Please transfer the amount of NGN {amount} to the above account.</H3>
                        </>
                    )}

                    {statusMessage && <Message>{statusMessage}</Message>}

                    <br />
                    <ButtonContainer>
                        <Button primary onClick={() => { setBankTransferSwitch(0); setShowAccountNumber(false); }} theme={theme}>
                            Back
                        </Button>
                        <Button onClick={() => navigate('/dashboard')} theme={theme}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}

            {bankTransferSwitch === 2 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUniversity />
                    </Icon>
                    <Title theme={theme}>Pay to Bank</Title>

                     {/* Bank Dropdown */}
                     <Select
                        theme={theme}
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">Select Bank</option>
                        {banks.map((bank) => (
                            <option key={bank.code} value={bank.code}>
                                {bank.name}
                            </option>
                        ))}
                    </Select>


                    <Input
                        theme={theme}
                        type="text"
                        placeholder="Bank Account Number"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />

                    <Input
                        theme={theme}
                        type="text"
                        placeholder="Enter Amount in NGN"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    

                   

                    {statusMessage && <Message>{statusMessage}</Message>}
                    <Button primary onClick={handlePayToBank} theme={theme} disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </Button>

                    <br />
                    <ButtonContainer>
                        <Button primary onClick={() => setBankTransferSwitch(0)} theme={theme}>
                            Back
                        </Button>
                        <Button onClick={() => navigate('/dashboard')} theme={theme}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}
        </PaymentContainerA>
        </Body>
    );
};

export default BankPayment;




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

const Icon = styled(FaUniversity)`
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

const H3 = styled.h3`
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom:20px;
    text-align:center;
`

const Message = styled.p`

`

const Select = styled.select`
    padding:10px;
    width:100%;
    margin-bottom:20px;
    outline:none;
     background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

     &:hover {
        outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
    }

   

`