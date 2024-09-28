
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUniversity } from 'react-icons/fa';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const BankPayment2 = () => {
    const { setMenuSwitch, theme,pop1 } = useContext(Context);
    const [bankTransferSwitch, setBankTransferSwitch] = useState(0);
    const [showAccountNumber, setShowAccountNumber] = useState(false);
    const userToken = useSelector(state=>state.userToken)
    const {amount2}=useContext(Context)

   
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

 
    const handleGenerateAccountNumber = async () => {
        setLoading(true);
        setStatusMessage('');
        setGeneratedAccount(null); 



        const requestData = {
            account_name: "Demo account", 
            amount: parseFloat(amount2),
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
    };




    return (
        <PaymentContainerA>
       

            {bankTransferSwitch === 0 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUniversity />
                    </Icon>
                    <Title theme={theme}>Pay by Bank Transfer</Title>

                    {!showAccountNumber && (
                        <>
                            {/* <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter Amount"
                                value={amount2}
                                disabled
                                onChange={(e) => setAmount(e.target.value)}
                            /> */}

                            <P>You are paying ${amount2} USD, which is ₦{amount2*1660} NGN</P>
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
                            <H3 theme={theme}>Please transfer the amount of NGN {amount2*1660} to the above account.</H3>
                        </>
                    )}

                    {statusMessage && <Message>{statusMessage}</Message>}

                    <br />
                    <ButtonContainer>
              
                        <Button onClick={() =>window.history.back()} theme={theme}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}

          
        </PaymentContainerA>
    );
};

export default BankPayment2;



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
const P = styled.p`
    margin-bottom:10px;
`