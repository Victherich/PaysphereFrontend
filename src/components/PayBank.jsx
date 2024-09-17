// BankTransfer.js

import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUniversity } from 'react-icons/fa';

const BankTransfer = () => {
  const { setMenuSwitch, theme } = useContext(Context);

  return (
    <BankTransferContainerA>
      <BankTransferContainer theme={theme}>
        <Icon theme={theme}>
          <FaUniversity />
        </Icon>
        <Title theme={theme}>Bank Transfer</Title>
        
        {/* Fixed: Proper Select Dropdown */}
        <Select theme={theme}>
          <Option value="" disabled selected>Select Recipient Bank</Option>
          <Option value="bank1">Bank 1</Option>
          <Option value="bank2">Bank 2</Option>
          <Option value="bank3">Bank 3</Option>
          {/* Add more bank options as needed */}
        </Select>

        <Input theme={theme} type="text" placeholder="Enter Account Number" />
        <Input theme={theme} type="text" placeholder="Enter Amount" />
        
        <ButtonContainer>
          <Button primary theme={theme}>Transfer</Button>
          <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
        </ButtonContainer>
      </BankTransferContainer>
    </BankTransferContainerA>
  );
};

export default BankTransfer;

const BankTransferContainerA = styled.div`
  padding-top: 100px;
`;

const BankTransferContainer = styled.div`
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

const Icon = styled(FaUniversity)`
  font-size: 4rem;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

// Styled component for the Select Dropdown
const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => (theme === 'light' ? '#ccc' : '#555')};
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  font-size: 16px;
  outline: none;

  &:hover {
    outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
  }

  @media (min-width: 768px) {
    padding: 12px;
    font-size: 18px;
  }
`;

const Option = styled.option`
  background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
`;

// Styled component for input fields
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
  border: ${({ secondary }) => (secondary ? '1px solid rgba(0,0,255,0.5)' : 'none')};
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
