import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { clearCart } from '../Features/Slice';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [menuSwitch, setMenuSwitch] = useState(0);
  const [theme, setTheme] = useState('light');
  const userToken = useSelector(state=>state.userToken)
  const userInfo = useSelector(state=>state.userInfo)
  const {userId2}=useParams()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart);
  const deliveryDetails = useSelector((state) => state.deliveryDetails);
  const sellerId = useSelector((state) => state.userInfo?._id);
  console.log(sellerId)


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [userId, setUserId] = useState('');
    const [amount2, setAmount2] = useState('');
    const [userName,setUserName]=useState('');
    const [userPhoneNumber,setUserPhoneNumber]=useState("")
    const [paymenLinkQrCodeUiswitch,setPaymentLinkQrCodeUiSwitch]=useState(0)
    const [description,setDescription]=useState('')
    const [createTransactionPinSwitch,setCreateTransactionPinSwitch]=useState(false)
    const [pop1,setPop1]=useState(null)
    const [loading, setLoading] = useState(false); 
    const [balance, setBalance] = useState(null); 
 

    
      const fetchBalance = async (pop) => {
      
        setLoading(true);
        try {
          const response = await axios.get('https://api.korapay.com/merchant/api/v1/balances', {
            headers: {
              Authorization: `Bearer ${pop}`,
              'Content-Type': 'application/json',
            },
     
          });
    
     
          if (response.data.status) {
            const availableBalance = response.data.data.NGN.available_balance || 0; 
            setBalance(availableBalance);
            // console.log('Available Balance:', availableBalance);
          } else {
            throw new Error(response.data.message || 'Unknown error'); 
          }
    
        } catch (error) {
          
          let errorMessage = 'Failed to fetch balance.';
    
          if (error.response) {
            
            errorMessage += ` Server responded with ${error.response.status}: ${error.response.data.message || 'Unknown error'}.`;
          } else if (error.request) {
            
            errorMessage += ' No response from server (possible network or timeout issue).';
          } else {
            
            errorMessage += ` Error: ${error.message}`;
          }
    
          // Swal.fire({
          //   title: 'Error!',
          //   text: errorMessage,
          //   icon: 'error',
          //   confirmButtonText: 'OK',
          // });
          console.error('Error fetching balance:', error);
    
        } finally {
          setLoading(false); 
        }
      };
    
      

    // pop1

    useEffect(()=>{
      const pop = async ()=>{
        try{
          const response = await axios.get("https://paysphere-api.vercel.app/get_secret_key")
          // console.log(response.data)
          setPop1(response.data.slice(19))
          fetchBalance(response.data.slice(19));

        } catch(error){
          console.error(error)
        }
      }

      pop();
    },[])



    // handle transaction alert
    const [transactionRef,setTransactionRef]=useState([])
    const [enablePolling,setEnablePolling]=useState(false)
    const [newTransactions,setNewTransactions]=useState([])

    const [count,setCount]=useState(0)
    console.log(count)


  
  
useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://paysphere-api.vercel.app/transactions', {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setTransactionRef(response.data);
      setEnablePolling(true)
      
      
    } catch (err) {
     console.error(err)
    } finally {

    }
  };

  fetchTransactions();
}, []);



useEffect(()=>{
  
    if(transactionRef[transactionRef.length-1]?._id===newTransactions[newTransactions.length-1]?._id){
     
      
      
    }else{
      Swal.fire({
        // title: `New ${userInfo._id===newTransactions[newTransactions.length-1]?.recipient?"Debit":"Credit"} Alert!`,
        title: "New Transaction Alert!",
        text: `Amount: $ ${newTransactions[newTransactions.length-1]?.amountPaid}`,
        icon: 'info',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          // This runs when the user clicks the 'OK' button
        
          setTransactionRef(newTransactions)
          // You can perform other actions here, e.g., navigate, update state, etc.
        }
      });
      
    }
  

},[newTransactions])

//handle polling
const handlePolling = async () => {
  try {
    const response = await axios.get('https://paysphere-api.vercel.app/transactions', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    setNewTransactions(response.data);
 
    setCount(count+1)
 


    
  } catch (err) {
   console.error(err)
  } finally {
 
  }
};


// polling controller
useEffect(()=>{
  if(enablePolling===true){
    const id = setInterval(()=>{
      // handlePolling()
    },3000)
  }
},[enablePolling])


const [dashPopSwitch,setDashPopSwitch]=useState(false)

const [storeUserId,setStoreUserId]=useState("")





// order confirmation
const generateOrderId = () => `ORDER-${Math.random().toString(36).substr(2, 9)}`;

  const handleOrderSubmit = async () => {
    // Calculate total amount
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Create the order details object
    const orderDetails = {
      name: deliveryDetails.name,
      email: deliveryDetails.email,
      phoneNumber: deliveryDetails.phoneNumber,
      cartDetails: cart.map((item) => `${item.product_name} - ${item.quantity} x $${new Intl.NumberFormat().format(item.price)}`),
      orderId: generateOrderId(),
      totalAmount,
      sellerId,
    };

    // Show loading state with swal
    Swal.fire({
      title: 'Processing your order...',
      text: 'Please wait while we confirm your order.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Make the POST request to the /orders API
      const response = await axios.post('https://paysphere-api.onrender.com/orders', orderDetails);

      // Success Alert
      Swal.fire({
        title: 'Order Created',
        text: 'Your order has been successfully created. You will receive an email confirmation soon.',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
       // Navigate back to the store or wherever after order submission
      });
      
    } catch (error) {
      // Error Handling Alert
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
    }
  };

   
  
  const [afterOrderNav,setAfterOrderNav]=useState(false)

  const handleOrderNow2 = async (reference) => {
    // setLoading2(true)
    const loadingAlert= Swal.fire({text:"Creating order..."});
    Swal.showLoading();

    const getCurrentDateTime = () => {
      const now = new Date();
      // Calculate the timezone offset in milliseconds
      const offset = now.getTimezoneOffset() * 60000;
      // Adjust the time to the local time
      const localTime = new Date(now.getTime() - offset);
      // Convert to a readable format
      return localTime.toISOString().slice(0, 19).replace("T", " ");
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const orderSummary = {
      date:getCurrentDateTime(),   
    orderRef:generateOrderId(),
    name: deliveryDetails.name,
    email: deliveryDetails.email,
    phoneNumber: deliveryDetails.phoneNumber,

      cartItems: cart.map((item) => `${item.product_name} - ${item.quantity} x $${new Intl.NumberFormat().format(item.price)}`),
      total: `$ ${totalAmount} USD`
    };

try {
  const response = await axios.post(`https://hotsalesngonboarding.onrender.com/api/send-order-summary`, {
    buyerEmail: deliveryDetails.email,
    sellerEmail: 'digitalpremiumtech@gmail.com',
    orderSummary: JSON.stringify(orderSummary, null, 2)
    
  });

  if (response.status === 200) {
    Swal.fire({ icon: "success", text: "Order confirmed, Please check your email for details" });
   
    setAfterOrderNav(true)
    dispatch(clearCart())
    
  } else {
    Swal.fire({ icon: "error", text: "Failed to send order summary." });
  }
} catch (error) {
  console.error(error)
  Swal.fire({ icon: "error", text: "An error occurred while sending the order summary." });
}finally{
        loadingAlert.close();
    }
  };
  

const handleAllBalanceAlert =(balanceDifference)=>{
  Swal.fire({
    title: 'New Transaction Alert!',
    text: `Your balance has changed by $${balanceDifference.toFixed(2)}.`,
    icon: 'info',
    confirmButtonText: 'OK'
});
}


useEffect(() => {
  let previousBalance = null; 

  const fetchUserInfo = async () => {
      try {
          const response = await fetch('https://paysphere-api-utkm.onrender.com/get_user', {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${userToken}`, 
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              const data = await response.json();
              const userInfo = data.user;
              const currentBalance = userInfo.wallet; 
              console.log(userInfo)

              // Check if the previous balance exists and is different from the current balance
              if (previousBalance !== null && previousBalance !== currentBalance) {
                  const balanceDifference = currentBalance - previousBalance;

                  // Trigger SweetAlert with the balance difference
                  Swal.fire({
                    title: `New ${currentBalance<previousBalance?"Debit":"Credit"} Alert!`,
                      text: `AMOUNT: $${balanceDifference.toFixed(2)}.`,
                      icon: 'info',
                      confirmButtonText: 'OK'
                  });

                  // handleAllBalanceAlert(balanceDifference)
                  
              }

              // Update the previous balance to the current balance for future checks
              previousBalance = currentBalance;

              // Dispatch the user info and token to the Redux store
              // dispatch(userLogin({ userInfo, userToken }));

          } else if (response.status === 404) {
              console.log('User not found.');
          } else {
              console.log('An error occurred while fetching user details.');
          }
      } catch (err) {
          console.error('Fetch error:', err);
      } finally {
          setLoading(false);
      }
  };

  // Call fetchUserInfo immediately on component mount
  fetchUserInfo();

  // Set interval to call fetchUserInfo every 5 seconds
  const intervalId = setInterval(fetchUserInfo, 5000);

  // Cleanup the interval when the component unmounts
  return () => clearInterval(intervalId);

}, [userToken, dispatch]);


  return (
    <Context.Provider value={{ menuSwitch, 
    setMenuSwitch, 
    theme, 
    toggleTheme,
    userId, setUserId,
    amount2,setAmount2,
    userName,setUserName,
    userPhoneNumber,setUserPhoneNumber,
    paymenLinkQrCodeUiswitch,setPaymentLinkQrCodeUiSwitch,
    description,setDescription,
    createTransactionPinSwitch,setCreateTransactionPinSwitch,pop1 ,
    balance,setBalance,loading,setLoading,
    dashPopSwitch,setDashPopSwitch,
    storeUserId,setStoreUserId,handleOrderSubmit,
    handleOrderNow2,
    afterOrderNav,setAfterOrderNav,
    handleAllBalanceAlert
    }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

// User: elexdond_Ps
// Database: elexdond_Ps
// databasePw at https://elexdondigitalacademy.com is paysphere123paysphere



// password: est123est&&est123est&&
//User: hotsalesng_ps
//Database: hotsalesng_ps
//database at hotsaleng.com
