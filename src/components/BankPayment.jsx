// import React, { useContext, useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Context } from './Context';
// import { FaUniversity } from 'react-icons/fa';
// import axios from 'axios'; // Axios for API calls
// import Swal from 'sweetalert2';

// const BankPayment = () => {
//     const { setMenuSwitch, theme } = useContext(Context);
//     const [bankTransferSwitch, setBankTransferSwitch] = useState(0);
//     const [showAccountNumber, setShowAccountNumber] = useState(false);

//     // State for Pay to Bank
//     const [amount, setAmount] = useState('');
//     const [bankAccountNumber, setBankAccountNumber] = useState('');
//     const [selectedBank, setSelectedBank] = useState('');
//     const [banks, setBanks] = useState([]); // To store bank list
//     const [statusMessage, setStatusMessage] = useState('');
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         // Fetch bank list from Korapay API
//         const fetchBanks = async () => {
//             try {
//                 const response = await axios.get(
//                     'https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG',
//                     {
//                         headers: {
//                             'Authorization': `Bearer pk_test_tSvcVcCCD8YG7ZCsn4nM2Jr1QBVuKRyARvRxJXDy`, // Your public key
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );

//                 if (response.data.status) {
//                     setBanks(response.data.data); // Save the bank list to state
//                 } else {
//                     setStatusMessage('Failed to fetch bank list.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching bank list:', error);
//                 setStatusMessage('An error occurred while fetching the bank list.');
//             }
//         };

//         fetchBanks();
//     }, []); // Fetch once on component mount

//     const handleGenerateAccountNumber = () => {
//         setShowAccountNumber(true);
//     };

//     // Function to handle the Pay to Bank action
//     const handlePayToBank = async () => {
//         if(amount<1000||amount>1000000){
//             Swal.fire({text:'You can only send between NGN 1,000 to NGN 1,000,000'})
//             return
//         }



        

//         setStatusMessage(''); // Clear previous messages

//         if (!amount || !bankAccountNumber || !selectedBank) {
//             setStatusMessage('Please fill in all fields correctly.');
//             setLoading(false);
//             return;
//         }

//         setLoading(true);
//         const loadingAlert = Swal.fire({ text: "Processing..." });
//         Swal.showLoading();

//         const transactionData = {
//             reference: `unique-transaction-${Date.now()}`, // Unique reference
//             destination: {
//                 type: 'bank_account',
//                 amount: amount,
//                 currency: 'NGN',
//                 narration: 'Bank Transfer Payment',
//                 bank_account: {
//                     bank: selectedBank, // Bank code from the dropdown
//                     account: bankAccountNumber, // User input for account number
//                 },
//                 customer: {
//                     name: 'John Doe', // You can update this if you collect customer details
//                     email: 'johndoe@email.com',
//                 },
//             },
//         };

//         try {
//             const response = await axios.post(
//                 'https://api.korapay.com/merchant/api/v1/transactions/disburse',
//                 transactionData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`, // Your secret key
//                     },
//                 }
//             );

//             const data = response.data;

//             if (data.status) {
//                 // setStatusMessage(`Success: ${data.message}`);
//                 Swal.fire({ icon: "success", text: data.message });
//                 setAmount("")
//                 setBankAccountNumber("")
//                 setSelectedBank("")
//                 setBankTransferSwitch(0)
//             } else {
//                 setStatusMessage(`Error: ${data.message}`);
//             }
//         } catch (error) {
//             setStatusMessage('An error occurred while processing the payment.');
//             console.error(error);
//         } finally {
//             setLoading(false);
//             loadingAlert.close();
//         }
//     };

//     return (
//         <PaymentContainerA>
//             {bankTransferSwitch === 0 && (
//                 <PaymentContainer theme={theme}>
//                     <Icon theme={theme}>
//                         <FaUniversity />
//                     </Icon>
//                     <Title theme={theme}>Bank Payment</Title>
//                     <ButtonContainer>
//                         <Button primary theme={theme} onClick={() => setBankTransferSwitch(1)}>
//                             Receive from Bank
//                         </Button>
//                         <Button onClick={() => setMenuSwitch(0)} theme={theme}>
//                             Cancel
//                         </Button>
//                         <Button primary onClick={() => setBankTransferSwitch(2)} theme={theme}>
//                             Pay to Bank
//                         </Button>
//                     </ButtonContainer>
//                 </PaymentContainer>
//             )}

//             {bankTransferSwitch === 1 && (
//                 <PaymentContainer theme={theme}>
//                     <Icon theme={theme}>
//                         <FaUniversity />
//                     </Icon>
//                     <Title theme={theme}>Receive from bank</Title>

//                     {!showAccountNumber && (
//                         <>
//                             <Input theme={theme} type="text" placeholder="Enter Amount" />
//                             <Button primary onClick={handleGenerateAccountNumber} theme={theme}>
//                                 Generate Account
//                             </Button>
//                         </>
//                     )}
//                     {showAccountNumber && (
//                         <>
//                             <H3></H3>
//                             Please Transfer the mentioned amount to this Account Number Below:
//                             <H3 theme={theme}>23456789</H3>
//                         </>
//                     )}
//                     <br />
//                     <ButtonContainer>
//                         <Button primary onClick={() => { setBankTransferSwitch(0); setShowAccountNumber(false); }} theme={theme}>
//                             Back
//                         </Button>
//                         <Button onClick={() => setMenuSwitch(0)} theme={theme}>
//                             Cancel
//                         </Button>
//                     </ButtonContainer>
//                 </PaymentContainer>
//             )}

//             {bankTransferSwitch === 2 && (
//                 <PaymentContainer theme={theme}>
//                     <Icon theme={theme}>
//                         <FaUniversity />
//                     </Icon>
//                     <Title theme={theme}>Pay to Bank</Title>
//                     <Input
//                         theme={theme}
//                         type="text"
//                         placeholder="Enter Amount"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                     />
//                     <Input
//                         theme={theme}
//                         type="text"
//                         placeholder="Bank Account Number"
//                         value={bankAccountNumber}
//                         onChange={(e) => setBankAccountNumber(e.target.value)}
//                     />

//                     {/* Bank Dropdown */}
//                     <Select
//                         theme={theme}
//                         value={selectedBank}
//                         onChange={(e) => setSelectedBank(e.target.value)}
//                     >
//                         <option value="">Select Bank</option>
//                         {banks.map((bank) => (
//                             <option key={bank.code} value={bank.code}>
//                                 {bank.name}
//                             </option>
//                         ))}
//                     </Select>

//                     {statusMessage && <Message>{statusMessage}</Message>}
//                     <ButtonContainer>
//                         <Button
//                             primary
//                             theme={theme}
//                             onClick={handlePayToBank}
//                             disabled={loading}
//                         >
//                             {loading ? 'Processing...' : 'Pay to Bank'}
//                         </Button>
//                         <Button onClick={() => setMenuSwitch(0)} theme={theme}>
//                             Cancel
//                         </Button>
//                         <Button primary onClick={() => setBankTransferSwitch(0)} theme={theme}>
//                             Back
//                         </Button>
//                     </ButtonContainer>
//                 </PaymentContainer>
//             )}
//         </PaymentContainerA>
//     );
// };

// export default BankPayment;

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUniversity } from 'react-icons/fa';
import axios from 'axios'; // Axios for API calls
import Swal from 'sweetalert2';

const BankPayment = () => {
    const { setMenuSwitch, theme } = useContext(Context);
    const [bankTransferSwitch, setBankTransferSwitch] = useState(0);
    const [showAccountNumber, setShowAccountNumber] = useState(false);

    // State for Pay to Bank
    const [amount, setAmount] = useState('');
    const [generatedAccount, setGeneratedAccount] = useState(null); // To store the generated account details
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [banks, setBanks] = useState([]); // To store bank list
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch bank list for Pay to Bank feature
        const fetchBanks = async () => {
            try {
                const response = await axios.get(
                    'https://api.korapay.com/merchant/api/v1/misc/banks?countryCode=NG',
                    {
                        headers: {
                            Authorization: `Bearer pk_test_tSvcVcCCD8YG7ZCsn4nM2Jr1QBVuKRyARvRxJXDy`, // Public key
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.data.status) {
                    setBanks(response.data.data); // Save the bank list to state
                } else {
                    setStatusMessage('Failed to fetch bank list.');
                }
            } catch (error) {
                console.error('Error fetching bank list:', error);
                setStatusMessage('An error occurred while fetching the bank list.');
            }
        };

        fetchBanks();
    }, []); // Fetch once on component mount

    // Function to generate a virtual account for receiving payments
    const handleGenerateAccountNumber = async () => {
        setLoading(true);
        setStatusMessage('');
        setGeneratedAccount(null); // Clear previous account details

        // Ensure the amount is valid
        if (!amount || parseFloat(amount) < 100) {
            setStatusMessage('Please enter a valid amount (min NGN 100)');
            setLoading(false);
            return;
        }

        const requestData = {
            account_name: "Demo account", // You can dynamically set this if required
            amount: parseFloat(amount),
            currency: "NGN",
            reference: `bank-transfer-${Date.now()}`, // Unique reference
            customer: {
                name: "John Doe", // You can replace this with actual customer data
                email: "johndoe@gmail.com"
            }
        };

        try {
            const response = await axios.post(
                'https://api.korapay.com/merchant/api/v1/charges/bank-transfer',
                requestData,
                {
                    headers: {
                        Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`, // Replace with your secret key
                        'Content-Type': 'application/json',
                    }
                }
            );

            const data = response.data;

            if (data.status) {
                // Save the generated account details
                setGeneratedAccount(data.data.bank_account);
                setShowAccountNumber(true);
                // setStatusMessage('Bank transfer initiated successfully');
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

    // Function to handle the Pay to Bank action
    const handlePayToBank = async () => {
        if (amount < 1000 || amount > 1000000) {
            Swal.fire({ text: 'You can only send between NGN 1,000 to NGN 1,000,000' });
            return;
        }

        setStatusMessage(''); // Clear previous messages

        if (!amount || !bankAccountNumber || !selectedBank) {
            setStatusMessage('Please fill in all fields correctly.');
            setLoading(false);
            return;
        }

        setLoading(true);
        const loadingAlert = Swal.fire({ text: "Processing..." });
        Swal.showLoading();

        const transactionData = {
            reference: `unique-transaction-${Date.now()}`, // Unique reference
            destination: {
                type: 'bank_account',
                amount: amount,
                currency: 'NGN',
                narration: 'Bank Transfer Payment',
                bank_account: {
                    bank: selectedBank, // Bank code from the dropdown
                    account: bankAccountNumber, // User input for account number
                },
                customer: {
                    name: 'John Doe', // You can update this if you collect customer details
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
                        Authorization: `Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1`, // Your secret key
                    },
                }
            );

            const data = response.data;

            if (data.status) {
                Swal.fire({ icon: "success", text: data.message });
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
    };

    return (
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
                        <Button onClick={() => setMenuSwitch(0)} theme={theme}>
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
                                placeholder="Enter Amount"
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
                            <p>Please transfer the amount of NGN {amount} to the above account.</p>
                        </>
                    )}

                    {statusMessage && <Message>{statusMessage}</Message>}

                    <br />
                    <ButtonContainer>
                        <Button primary onClick={() => { setBankTransferSwitch(0); setShowAccountNumber(false); }} theme={theme}>
                            Back
                        </Button>
                        <Button onClick={() => setMenuSwitch(0)} theme={theme}>
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
                        placeholder="Bank Account Number"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                    />

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

                    {statusMessage && <Message>{statusMessage}</Message>}
                    <Button primary onClick={handlePayToBank} theme={theme} disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </Button>

                    <br />
                    <ButtonContainer>
                        <Button primary onClick={() => setBankTransferSwitch(0)} theme={theme}>
                            Back
                        </Button>
                        <Button onClick={() => setMenuSwitch(0)} theme={theme}>
                            Cancel
                        </Button>
                    </ButtonContainer>
                </PaymentContainer>
            )}
        </PaymentContainerA>
    );
};

export default BankPayment;



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

const H3 = styled.h2`
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom:20px;
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