import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userToken = useSelector(state=>state.userToken)

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

  // Render loading, error or transaction list
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
    <TransactionContainer>
      <Title>Your Transactions</Title>
      {transactions.map((transaction) => (
        <TransactionCard key={transaction._id}>
          <TransactionInfo>
            <P><Strong>ID:</Strong> {transaction._id}</P>
            <P><Strong>Amount:</Strong> NGN {transaction.amountPaid}</P>
            <P><Strong>Date:</Strong> {transaction.date}</P>
            <P><Strong>Recipient:</Strong> {transaction.recipient}</P>
            <P><Strong>Status:</Strong> {transaction.message}</P>
          </TransactionInfo>
        </TransactionCard>
      ))}
    </TransactionContainer>
  );
};

export default TransactionHistory;

// Styled components
const TransactionContainer = styled.div`
  max-width: 800px;
  margin:  auto;
  padding: 20px;
  padding-top:100px;
  padding-bottom:100px;
  width:100%;
  // height:100vh;
  min-height:500px;
  // overflow-y:scroll;

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
    // font-size:0.8rem;
`


const Strong = styled.h4`
    color:rgba(0,0,255,0.5);
    // font-size:0.9rem;
`