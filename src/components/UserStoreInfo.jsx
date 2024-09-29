import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const UserStoreInfo = ({setCurrentView}) => {
  const userInfo = useSelector(state=>state.userInfo)
  const location = useLocation()
  // console.log(userInfo)
  return (
    <DashboardContainer>
      <WelcomeMessage> Hi, {userInfo.firstName}! Welcome to Your Store Dashboard</WelcomeMessage>
      <StoreInfo>
        <H2>Your Store Information</H2>
        {/* <StoreDetail>
          <Label>Store Name:</Label>
          <Value>{userInfo.fir}</Value>
        </StoreDetail> */}
        <StoreDetail>
          <Label>Store URL:</Label>
          <Value onClick = {()=>window.open(`${window.location.origin}/store/${userInfo.walletID}/${userInfo._id}`,"_blank")}>{`${window.location.origin}/store/${userInfo.walletID}/${userInfo._id}`}</Value>
        </StoreDetail>
        {/* <StoreDetail>
          <Label>Contact Email:</Label>
          <Value>{user.email}</Value>
        </StoreDetail> */}
      </StoreInfo>
      <ActionButton onClick={() => setCurrentView('upload')}>
        Post Product / Service
      </ActionButton>
    </DashboardContainer>
  );
};

export default UserStoreInfo;

// Styled Components
const DashboardContainer = styled.div`
padding-top:100px;
  // padding: 20px;
  // background-color: #f9f9f9;
  border-radius: 8px;
  // box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
`;

const WelcomeMessage = styled.h2`
  color: rgba(0,0,255,0.6);
  text-align: center;
  margin-bottom: 20px;
`;

const StoreInfo = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

`;

const StoreDetail = styled.div`
  display: flex;
  margin: 10px 0;
    display:flex;
  flex-direction:column;
`;

const Label = styled.span`
  font-weight: bold;
  // width: 120px; 
  text-align:center;

`;

const Value = styled.span`
text-align:center;
  color: blue;
  font-size:1.1rem;
  font-weight:bold;
   word-break: break-all; 
    overflow-wrap: break-word;  
    max-width: 100%; 
    white-space: normal; 
    padding: 10px; 
    word-wrap: break-word; 
    cursor:pointer;

`;

const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357ab8;
  }
`;

const H2 = styled.h2`
 color:rgba(0,0,0,0.8);
 text-align:center;
`
