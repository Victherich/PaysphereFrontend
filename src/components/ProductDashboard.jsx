import React, { useState } from 'react';
import styled from 'styled-components';

import UploadProduct from './UploadProduct';
import UserProducts from './UserProducts';
import UserStoreInfo from './UserStoreInfo';

const DashboardContainer = styled.div`
  padding: 20px;
  // background-color: #f4f4f4;
  padding-top:70px;
  padding-bottom:70px;
  @media(max-width:428px){
    padding:5px;
     padding-top:70px;
  padding-bottom:70px;
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:white;
  padding: 10px;
  color: white;
  margin-bottom:20px;
  position:fixed;
  width:100%;
    left:0;
  
`;

const NavButton = styled.button`
  background-color: rgba(0,0,255,0.5);
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }
`;

const ProductDashboard=()=> {
  const [currentView, setCurrentView] = useState('storeinfo'); 

  return (
    <DashboardContainer>
      <NavBar>
      <NavButton onClick={() => setCurrentView('storeinfo')}>Store Info</NavButton>
        <NavButton onClick={() => setCurrentView('list')}>View Products</NavButton>
        <NavButton onClick={() => setCurrentView('upload')}>Upload Product</NavButton>
        
      </NavBar>
      {currentView === 'storeinfo' && <UserStoreInfo setCurrentView={setCurrentView}/>}
      {currentView === 'list' && <UserProducts setCurrentView={setCurrentView}/>}
      {currentView === 'upload' && <UploadProduct setCurrentView={setCurrentView}/>}
  
    </DashboardContainer>
  );
}

export default ProductDashboard;
