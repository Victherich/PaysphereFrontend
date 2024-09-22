import axios from 'axios';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [menuSwitch, setMenuSwitch] = useState(0);
  const [theme, setTheme] = useState('light');

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
    // console.log(pop1)

    useEffect(()=>{
      const pop = async ()=>{
        try{
          const response = await axios.get("https://paysphere-api.vercel.app/get_secret_key")
          console.log(response.data)
          setPop1(response.data.slice(19))



        } catch(error){
          console.error(error)
        }
      }

      pop();
    },[])
    
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
    createTransactionPinSwitch,setCreateTransactionPinSwitch,pop1 }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
