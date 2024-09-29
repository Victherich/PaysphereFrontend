
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaMobileAlt } from 'react-icons/fa'; // New icon for mobile money
import axios from 'axios'; // Import axios for API requests
import Swal from 'sweetalert2';

const MobileMoneyPayout3 = () => {
    const { setMenuSwitch, theme ,userId,amount2,pop1} = useContext(Context);
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
    const [currency,setCurrency]=useState("")




    //MOBILE MONEY PAYOUT

    const amountInGHS = (parseFloat(amount2) * 15.77).toFixed(2);
    
    const handlePayment = () => {
        if (currency===""||currency==="KES") {
            Swal.fire({
                icon: 'error',
                text: 'Please select the right currency for your mobile money wallet',
                // text: 'P'
            });
            return;
        }

        
        
        Swal.fire({
            title: 'Confirm Payment',
            text: `You will receive is ${amountInGHS} GHS`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                handlePayout();
            }
        });
    };
     // Helper to generate a unique reference
     const generateReference = () => `ref-${Date.now()}`;

     // Handle payout to mobile money
     const handlePayout = async () => {
        // if(amount<100||amount===""){
        //     Swal.fire({text:"You can only send 100 and more"})
        //     return
        // }
        // if(phoneNumber===""){
        //     Swal.fire({text:"Please enter recipient phone number"})
        //     return
        // }
         const loadingAlert = Swal.fire({ title: "Processing..." });
         setLoading(true);
         setError('');
         setMessage('');
         Swal.showLoading();
 
         const payload = {
             reference: generateReference(),
             destination: {
                 type: "mobile_money",
                 amount: amountInGHS,
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
                     Authorization: `Bearer ${pop1}`, // Replace with your Korapay secret key
                     'Content-Type': 'application/json'
                 }
             });
 
             const data = response.data;

             if (data.status) {
           
                 setTransactionReference(data.data.reference);
                //  Swal.fire({ icon: 'success', text: data.message });
                 console.log(data)
                 setAmount(""); 
                 setPhoneNumber("");
                 setMomoUiSwitch(0);
                debitUser(userId,parseFloat(amount2))
                window.history.back();
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

            
{momoUiSwitch === 0 && (
                <PaymentContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaMobileAlt />
                    </Icon>
                    <Title theme={theme}>Receive with Mobile Money</Title>
                    {mainInput && (
                        <>
                            {/* <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter Amount"
                                value={amount2}
                                onChange={(e) => setAmount(e.target.value)}
                                disabled
                            /> */}
                            <Select onChange={(e)=>setCurrency(e.target.value)}>
                        <option >Select currency</option>
                        <option value="GHS">GHS</option>
                        <option value="KES">KES</option>
                    </Select>
                            <Input
                                theme={theme}
                                type="text"
                                placeholder="Enter Your Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </>
                    )}
                    
                    {message && <Message success>{message}</Message>}
                    {error && <Message error>{error}</Message>}

                    {mainInput && (
                        <ButtonContainer>
                            <Button primary theme={theme} onClick={handlePayment} disabled={loading}>
                                {loading ? 'Processing...' : 'Make Payment'}
                            </Button>
                            <Button onClick={() => window.history.back()} theme={theme}>Cancel</Button>
                            </ButtonContainer>
                    )}
                </PaymentContainer>
            )}
        </PaymentContainerA>
    );
};

export default MobileMoneyPayout3;



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