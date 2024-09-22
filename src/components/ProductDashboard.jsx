import React, { useState } from 'react';
import styled from 'styled-components';
import ProductList from './ProductList';
import UploadProduct from './UploadProduct';
import SearchProduct from './SearchProduct';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  padding-top:70px;
  padding-bottom:70px;
  
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:lightgray;
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
  const [currentView, setCurrentView] = useState('list'); // Controls the view

  return (
    <DashboardContainer>
      <NavBar>
        <NavButton onClick={() => setCurrentView('list')}>View Products</NavButton>
        <NavButton onClick={() => setCurrentView('upload')}>Upload Product</NavButton>
        <NavButton onClick={() => setCurrentView('search')}>Search Products</NavButton>
      </NavBar>

      {currentView === 'list' && <ProductList setCurrentView={setCurrentView}/>}
      {currentView === 'upload' && <UploadProduct setCurrentView={setCurrentView}/>}
      {currentView === 'search' && <SearchProduct />}
    </DashboardContainer>
  );
}

export default ProductDashboard;
