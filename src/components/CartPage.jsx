import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, addToCart, decreaseQuantity } from '../Features/Slice';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cart)

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product.id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal; // You can add tax, shipping, etc.

  return (
    <ContainerWrap>
        <Container>
      <Title>Your Cart</Title>
      {cart.length === 0 ? (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        <CartItems>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <ItemDetails>
                <ItemName>{item.product_name}</ItemName>
                <ItemPrice>Price: ${item.price}</ItemPrice>
                <ItemQuantity>
                  Quantity: 
                  <QuantityButton onClick={() => handleDecreaseQuantity(item)}>-</QuantityButton>
                  {item.quantity}
                  <QuantityButton onClick={() => handleIncreaseQuantity(item)}>+</QuantityButton>
                </ItemQuantity>
              </ItemDetails>
              <RemoveButton onClick={() => handleRemoveFromCart(item.id)}>Remove</RemoveButton>
            </CartItem>
          ))}
          <Total>
            <TotalLabel>Subtotal:</TotalLabel>
            <TotalValue>${subtotal.toFixed(2)}</TotalValue>
          </Total>
        </CartItems>
        
      )}
      <SubmitButton onClick={()=>navigate("/store/deliverydetails")}>Proceed to Delivery Details</SubmitButton>
    </Container>
    </ContainerWrap>

  );
};

export default CartPage;


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
  color:rgba(0,0,255,0.6)
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 18px;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0;
  color:rgba(0,0,255,0.6);
`;

const ItemPrice = styled.p`
  margin: 0;
`;

const ItemQuantity = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
`;

const QuantityButton = styled.button`
  background: rgba(0,0,255,0.5);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background: rgba(0,0,255,0.7);
  }
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 20px;
  font-size:1.1rem;
  color:rgba(0,0,255,0.6)
`;

const TotalLabel = styled.span``;

const TotalValue = styled.span``;

const SubmitButton = styled.button`
    margin-top:20px;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;
