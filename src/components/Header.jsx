import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaHamburger, FaSun, FaMoon , FaUserCircle, FaHome} from 'react-icons/fa';
import { Context } from './Context';
import { useLocation,useNavigate } from 'react-router-dom';
import logo from "../Images/logo.png"
import { useSelector } from 'react-redux';

const Header = () => {
  const { theme, toggleTheme } = useContext(Context);
  const location = useLocation()
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.userInfo)
 

  return (
    <HeaderContainer theme={theme}>
      <LogoWrap >
      <Img src={logo} alt="logo" onClick={()=>navigate("/")}/>
      <TitleWrap>
      <Title onClick={()=>navigate("/")}>PaySphere <FaHome/></Title> {userInfo&&!location.pathname.includes("approve")&&!location.pathname.includes("payspheretransfer")&&<Title onClick={()=>navigate("/dashboard")}> | <FaUserCircle/> Hi, {userInfo.firstName}</Title>}
       
      </TitleWrap>
      
      </LogoWrap>

      {location.pathname.includes("payment")?"":<ThemeSwitchWrap>
      <Icon1><FaSun/></Icon1>
      <ThemeSwitch onClick={toggleTheme} theme={theme}>
        <Slider theme={theme} />
      </ThemeSwitch> 
      <Icon2><FaMoon/></Icon2>
      </ThemeSwitchWrap>}
      {/* {location.pathname.includes("payment")?"":<MenuIcon />} */}
    </HeaderContainer>
  );
};

export default Header;

// Styled component for the header container
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.4)' : '#333')};
  color: #fff;
  position: fixed;
  width: 100%;
  z-index: 1000;
  // box-shadow:0px 4px 10px rgba(0,0,0,0.2);

  @media (min-width: 768px) {
    padding: 15px 40px;
  }
`;

const LogoWrap = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  cursor:pointer;
`

const Img = styled.img`
  width:35px;
`

const TitleWrap = styled.div`
  display:flex;
  gap:10px
  // justify-content:center;
  // align-items:center;
`

// Styled component for the heading
const Title = styled.h3`
display:flex;
// justify-content:center;
align-items:center;
gap:10px;
margin-right:10px;
  font-size: 18px;
  margin: 0;
  // color:rgba(0,0,255,0.5);

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

// Styled component for the icon
const MenuIcon = styled(FaHamburger)`
  font-size: 24px;
  cursor: pointer;
  // color:rgba(0,0,255,0.5);

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;


const ThemeSwitchWrap = styled.div`
  display:flex;
  width:100px;
  justify-content:space-between;
  align-items:center;


`

const Icon1 = styled(FaSun)`
  color:yellow;
`
const Icon2 = styled(FaMoon)`
  color:white;
`

// Styled component for the theme switch
const ThemeSwitch = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  width: 60px;
  height: 25px;
  background-color: ${({ theme }) => (theme === 'light' ? 'lightgray' : 'lightgray')};
  border-radius: 15px;
  transition: background-color 0.3s;
  padding: 5px;
  justify-content:center;
  
`;

// Styled component for the slider
const Slider = styled.div`
  transform: translateY(0%) translateX(${({ theme }) => (theme === 'light' ? '-100%' : '100%')});
  width: 15px;
  height: 15px;
  background-color: ${({ theme }) => (theme === 'light' ? 'gray' : 'gray')};
  border-radius: 50%;
  
  transition: transform 1s, background-color 0.3s;
`;
