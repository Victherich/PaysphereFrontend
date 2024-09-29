
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUniversity } from 'react-icons/fa';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const BankPayment3 = () => {
    const { setMenuSwitch, theme,userId,amount2,pop1 } = useContext(Context);
    const [bankTransferSwitch, setBankTransferSwitch] = useState(0);
    const [showAccountNumber, setShowAccountNumber] = useState(false);



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

    const amountInNGN = (parseFloat(amount2) * 1660).toFixed(2);

    const handleTransaction = () => {
        // if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Invalid Amount',
        //         text: 'Please enter a valid amount.'
        //     });
        //     return;
        // }

        
        
        Swal.fire({
            title: 'Confirm Payment',
            text: `You will receive ${amountInNGN} NGN.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                handlePayToBank();
            }
        });
    };


   
const handlePayToBank = async () => {
   
    setLoading(true);
    const loadingAlert = Swal.fire({ text: "Processing..." });
    Swal.showLoading();

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

            debitUser(userId,parseFloat(amount2))
            setAmount("");
            setBankAccountNumber("");
            setSelectedBank("");
            setBankTransferSwitch(0);
            window.history.back();
            
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
};



const debitUser = async (walletID, amount) => {
    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Debiting user, please wait...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
    //   const response = await axios.post('https://paysphere-api.vercel.app/debit/user', {
        const response = await axios.post('https://paysphere-api-utkm.onrender.com/debit/user', {
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
        //   text: `Transfer successful. Amount debited: ${response.data.amountPaid}`,
          icon: 'success',
        });
      
      }
    } catch (error) {
      if (error.response?.status === 400) {
        Swal.fire({
          title: 'Error!',
          text: 'Insufficient funds for the transfer',
          icon: 'error',
        });
      } else if (error.response?.status === 404) {
        Swal.fire({
          title: 'Error!',
          text: 'Sender not found',
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
            {bankTransferSwitch === 0 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUniversity />
                    </Icon>
                    <Title theme={theme}>Receive to Bank</Title>

                     {/* Bank Dropdown */}
                     <Select
                        theme={theme}
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                    >
                        <option value="">Select Your Bank</option>
                        {banks.map((bank) => (
                            <option key={bank.code} value={bank.code}>
                                {bank.name}
                            </option>
                        ))}
                    </Select>


                    <Input
                        theme={theme}
                        type="text"
                        placeholder="Your Bank Account Number"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />

                    {/* <Input
                        theme={theme}
                        type="text"
                        placeholder="Enter Amount"
                        value={amount2}
                        onChange={(e) => setAmount(e.target.value)}
                        disabled
                    /> */}
                    

                   

                    {statusMessage && <Message>{statusMessage}</Message>}
                    <Button primary onClick={handleTransaction} theme={theme} disabled={loading}>
                        {loading ? 'Processing...' : 'Receive Now'}
                    </Button>

                    <br />
                    <ButtonContainer>
                    
                        <Button onClick={() => window.history.back()} theme={theme}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}
        </PaymentContainerA>
    );
};

export default BankPayment3;



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
        width: 100%;
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