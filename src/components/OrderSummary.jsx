// src/components/OrderSummary.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OrderSummary = () => {
  const cart = useSelector((state) => state.cart);
  const deliveryDetails = useSelector((state) => state.deliveryDetails);
  const navigate = useNavigate();

  const handlePayment = () => {
    // Add your payment processing logic here
    console.log("Processing payment...");
    // For demonstration, let's just navigate to a success page
    navigate('/payment-success');
  };

  return (
    <ContainerWrap>
        <Container>
      <Title>Order Summary</Title>
      <Section>
        <SectionTitle>Delivery Details</SectionTitle>
        <Details>
          <Detail><strong>Name:</strong> {deliveryDetails.name}</Detail>
          <Detail><strong>Email:</strong> {deliveryDetails.email}</Detail>
          <Detail><strong>Phone Number:</strong> {deliveryDetails.phoneNumber}</Detail>
        </Details>
      </Section>

      <Section>
        <SectionTitle>Cart Details</SectionTitle>
        {cart.length === 0 ? (
          <Message>Your cart is empty.</Message>
        ) : (
          <CartList>
            {cart.map((item) => (
              <CartItem key={item.id}>
                {item.product_name} - ${item.price} x {item.quantity}
              </CartItem>
            ))}
          </CartList>
        )}
        <Total>
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}
        </Total>
      </Section>

      <PayButton onClick={handlePayment}>Pay Now</PayButton>
    </Container>
    </ContainerWrap>
  );
};

export default OrderSummary;
const ContainerWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center; 
    width:100%;
    padding-top:80px;
    // height:100vh;
   
`

// Styled Components
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

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  color: rgba(0,0,255,0.7);
`;

const Details = styled.div`
  margin-bottom: 10px;
`;

const Detail = styled.p`
  color: #555;
`;

const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  margin: 5px 0;
  color: #333;
`;

const Total = styled.h3`
  color: rgba(0,0,255,0.7);
`;

const Message = styled.p`
  color: #ff0000; /* Red for empty cart */
`;

const PayButton = styled.button`
  padding: 10px;
  background-color:rgba(0,0,255,0.5);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0,0,255,0.7);
  }
`;
