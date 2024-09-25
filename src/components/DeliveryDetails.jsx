// src/components/DeliveryDetails.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDeliveryDetails } from '../Features/Slice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DeliveryDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setDeliveryDetails({ name, email, phoneNumber }));
    navigate('/store/ordersummary'); // Navigate to order summary after submitting
  };

  return (
   <ContainerWrap>
         <Container>
      <Title>Delivery Details</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name:</Label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number:</Label>
          <Input 
            type="tel" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required 
          />
        </FormGroup>
        <SubmitButton type="submit">Save Delivery Details</SubmitButton>
      </Form>
    </Container>
   </ContainerWrap>
  );
};

export default DeliveryDetails;

// Styled Components
const ContainerWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center; 
    width:100%;
    padding-top:80px;
    // height:100vh;
   
`


const Container = styled.div`
  padding: 20px;
  max-width: 600px;
//   margin-top:100px;
//   margin: auto;
width:100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;  
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: rgba(0,0,255,0.8);

`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
