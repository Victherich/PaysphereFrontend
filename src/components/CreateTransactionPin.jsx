import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Context } from './Context';

const CreatePinWrap = styled.div`
position:fixed;
top:25%;
left:30%;

  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color:rgba(0,0,255,0.6);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Button2 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: white;
  color: blue;
  border: 1px solid blue;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top:10px;


`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-size: 14px;
`;

const CreatePin = () => {
    const token = useSelector(state=>state.userToken)
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const {createTransactionPinSwitch,setCreateTransactionPinSwitch}=useContext(Context)

  const handlePinChange = (e) => {
    setPin(e.target.value);
    setError('');
  };

  const handleConfirmPinChange = (e) => {
    setConfirmPin(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate PINs
    if (!pin || !confirmPin) {
      setError('Both PIN fields are required.');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match.');
      return;
    }

    const loadingAlert=Swal.fire({text:"Processing..."})
    Swal.showLoading();


    try {
      const response = await axios.post(
        // 'https://paysphere-api.vercel.app/create_pin', 
        'https://paysphere-api-utkm.onrender.com/create_pin', 
        { pin },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      Swal.fire({
        title: 'Success!',
        text: 'Transaction PIN successfully created.',
        icon: 'success',
      });
      setCreateTransactionPinSwitch(false)
    } catch (error) {
      const status = error.response?.status;
      let message = 'An error occurred while creating the PIN.';
      if (status === 404) {
        message = 'User not found.';
      } else if (status === 500) {
        message = 'Internal server error. Please try again later.';
      }
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
    }finally{
        loadingAlert.close();
    }
  };

  return (
    <CreatePinWrap>
      <Title>Create Transaction PIN</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Enter your PIN"
          value={pin}
          onChange={handlePinChange}
          required
        />
        <Input
          type="password"
          placeholder="Confirm your PIN"
          value={confirmPin}
          onChange={handleConfirmPinChange}
          required
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Create PIN</Button>
        <Button2 type="button" onClick={()=>setCreateTransactionPinSwitch(false)}>Cancel</Button2>
      </form>
    </CreatePinWrap>
  );
};

export default CreatePin;
