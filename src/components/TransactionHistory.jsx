import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import { Context } from './Context';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userToken = useSelector(state=>state.userToken)
  const {theme}=useContext(Context)

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://paysphere-api.vercel.app/transactions', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setTransactions(response.data);
        console.log(response.data)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError(err.response.data.message || "User not found.");
        } else {
          setError("Failed to fetch transactions.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

 
  if (loading) {
    return <LoadingMessage>Loading your transactions...</LoadingMessage>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (transactions.length === 0) {
    return <NoTransactionMessage>You don't have any transactions yet.</NoTransactionMessage>;
  }

  return (
  <Body theme={theme}>
        <TransactionContainer>
      <Title>Your Transactions</Title>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction._id}>
          <TransactionInfo>
            <P><Strong>ID:</Strong> {transaction._id}</P>
            <P><Strong>Amount:</Strong> $ {transaction.amountPaid} USD</P>
            <P><Strong>Date:</Strong> {transaction.date}</P>
            <P><Strong>Recipient:</Strong> {transaction.receiptDetails}</P>
            <P><Strong>Status:</Strong> {transaction.message}</P>
          </TransactionInfo>
        </TransactionCard>
      ))}
    </TransactionContainer>
  </Body>
  );
};

export default TransactionHistory;


const Body = styled.div`
  width: 100%;
  position: relative; 
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
  background-color:red;
  z-index: 1; 

 
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme==="light"?"rgba(255,255,255,0.8)":"rgba(0, 0, 0, 0.8)"}; 
    z-index: -1; 
  }

  @media (max-width: 320px) {
    padding-bottom: 100px;
  }
`;



const TransactionContainer = styled.div`
  max-width: 800px;
  margin:  auto;
  padding: 20px;
  padding-top:100px;
  padding-bottom:100px;
  width:100%;

  min-height:500px;


`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: rgba(0,0,255,0.6);
`;

const TransactionCard = styled.div`
  background-color: rgba(255,255,255,0.7);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TransactionInfo = styled.div`
  p {
    margin: 5px 0;
    color: #555;
    font-size: 0.9rem;

    strong {
      color: #000;
    }
  }
`;

const LoadingMessage = styled.p`
padding-top:100px;
  text-align: center;
  font-size: 18px;
  color: #007bff;
`;

const ErrorMessage = styled.p`
    padding-top:100px;
  text-align: center;
  font-size: 18px;
  color: red;
`;

const NoTransactionMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
`;

const P = styled.p`
    display:flex;
    align-items:center;
    gap:10px;
  
`


const Strong = styled.h4`
    color:rgba(0,0,255,0.5);

`