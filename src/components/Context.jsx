import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [menuSwitch, setMenuSwitch] = useState(0);
  const [theme, setTheme] = useState('light');
  const userToken = useSelector(state=>state.userToken)
  const userInfo = useSelector(state=>state.userInfo)


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
        title: `New ${userInfo._id===newTransactions[newTransactions.length-1]?.recipient?"Debit":"Credit"} Alert!`,
        text: `Amount: NGN ${newTransactions[newTransactions.length-1]?.amountPaid}`,
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
      handlePolling()
    },3000)
  }
},[enablePolling])


const [dashPopSwitch,setDashPopSwitch]=useState(false)
    
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
    dashPopSwitch,setDashPopSwitch}}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

// User: elexdond_Ps
// Database: elexdond_Ps
// databasePw at https://elexdondigitalacademy.com is paysphere123paysphere