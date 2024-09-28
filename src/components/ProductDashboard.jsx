import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import UploadProduct from './UploadProduct';
import UserProducts from './UserProducts';
import UserStoreInfo from './UserStoreInfo';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import { Context } from './Context';
import { useNavigate } from 'react-router-dom';


const ProductDashboard=()=> {
  const [currentView, setCurrentView] = useState('storeinfo'); 
  const {theme}=useContext(Context)
  const navigate = useNavigate()

  return (
   <Body theme={theme}>
       <DashboardContainer >
      <NavBar>
      <NavButton onClick={() => setCurrentView('storeinfo')}>Store Info</NavButton>
        <NavButton onClick={() => setCurrentView('list')}>View Products</NavButton>
        <NavButton onClick={() => setCurrentView('upload')}>Upload Product</NavButton>
        <NavButton onClick={() => navigate("/dashboard")}>Back</NavButton>
        
      </NavBar>
      {currentView === 'storeinfo' && <UserStoreInfo setCurrentView={setCurrentView}/>}
      {currentView === 'list' && <UserProducts setCurrentView={setCurrentView}/>}
      {currentView === 'upload' && <UploadProduct setCurrentView={setCurrentView}/>}
  
    </DashboardContainer>
   </Body>
  );
}

export default ProductDashboard;




const Body = styled.div`
  width: 100%;
  position: relative; 
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh;
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
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