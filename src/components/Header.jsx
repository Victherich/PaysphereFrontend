import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaHamburger, FaSun, FaMoon , FaUserCircle, FaHome, FaBell,FaCartPlus} from 'react-icons/fa';
import { Context } from './Context';
import { useLocation,useNavigate, useParams } from 'react-router-dom';
import logo from "../Images/logo.png"
import { useSelector } from 'react-redux';
import DashPop from './DashPop';
import { useRef,useEffect } from 'react';
import Swal from 'sweetalert2';


// export const handleAllBalanceAlert =(balanceDifference)=>{
//   Swal.fire({
//     title: 'New Transaction Alert!',
//     text: `Your balance has changed by $${balanceDifference.toFixed(2)}.`,
//     icon: 'info',
//     confirmButtonText: 'OK'
// });
// }

const Header = () => {
  const { theme, toggleTheme ,setMenuSwitch,dashPopSwitch,setDashPopSwitch, afterOrderNav,setAfterOrderNav} = useContext(Context);
  const location = useLocation()
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.userInfo)
  const dashPopRef = useRef(null);
  const cart = useSelector(state=>state.cart)
  const [totalItems,setTotalItems]=useState(0)
  const {userId2}=useParams();
  const walletID = useSelector(state=>state.walletId)
  
  // const {storeUserId,setStoreUserId}=useContext(Context)
  const storeUserId = useSelector(state=>state.userId)
  // console.log(userId)

  const handleClickOutside = (event) => {
    // Check if the clicked element is outside the DashPop component
    if (dashPopRef.current && !dashPopRef.current.contains(event.target)) {
      setDashPopSwitch(false); // Close the DashPop component
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const total = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
    setTotalItems(total);
  }, [cart])

  useEffect(()=>{
    if(afterOrderNav===true){
      navigate(`/store/${walletID}/${storeUserId}`)
    }

  },[afterOrderNav])

 
 

  return (
    <HeaderContainer theme={theme}>
      <LogoWrap >
      <Img src={logo} alt="logo" onClick={()=>navigate("/")}/>
      <TitleWrap>
      <Title1 onClick={()=>navigate("/")}>PaySphere <FaHome/> 
      </Title1>
       
      </TitleWrap>
      
      </LogoWrap>

      {/* {location.pathname.includes("payment")?"":<ThemeSwitchWrap>
      <Icon1><FaSun/></Icon1>
      <ThemeSwitch onClick={toggleTheme} theme={theme}>
        <Slider theme={theme} />
      </ThemeSwitch> 
      <Icon2><FaMoon/></Icon2>
      </ThemeSwitchWrap>} */}
      {userInfo&&!location.pathname.includes("approve")&&
      !location.pathname.includes("payspheretransfer")&&
      !location.pathname.includes("payment")&&
      !location.pathname.includes("bankpayout3")&&
      !location.pathname.includes("payuser3")&&
      !location.pathname.includes("mobilemoneypayout3")&&
      !location.pathname.includes("store")&&
      <TitleA > <Icon onClick={()=>setDashPopSwitch(!dashPopSwitch)}><FaUserCircle/></Icon> <Title onClick={()=>setDashPopSwitch(!dashPopSwitch)} onMouseEnter={()=>setDashPopSwitch(true)}>Hi, {userInfo.firstName}</Title></TitleA>}
      {/* {location.pathname.includes("payment")?"":<MenuIcon />} */}
      {!userInfo&&!location.pathname.includes("approve")&&
      !location.pathname.includes("payspheretransfer")&&
      !location.pathname.includes("payment")&&
      !location.pathname.includes("bankpayout3")&&
      !location.pathname.includes("payuser3")&&
      !location.pathname.includes("mobilemoneypayout3")&&
      !location.pathname.includes("store")&&
      <UserArea> <P onClick={()=>navigate("/login")}>Login</P> <Button onClick={()=>navigate("/signup")}>Get Started</Button></UserArea>}
      {dashPopSwitch&&<DashPop ref={dashPopRef}/>}
      {location.pathname.includes("store")&&<CartWrap onClick={()=>navigate(`/store/${walletID}/${storeUserId}`)}><strong>Store Home</strong><Icon><FaHome/></Icon></CartWrap>}
      {location.pathname.includes("store")&&<CartWrap onClick={()=>navigate(`/store/${storeUserId}/cart`)}><Icon><FaCartPlus /></Icon>({totalItems})</CartWrap>}

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
  background-color: ${({ theme }) => (theme === 'light' ? '#8080FF' : '#333')};
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
const Title = styled.h4`
display:flex;
// justify-content:center;
align-items:center;
cursor:pointer;
gap:10px;
margin-right:10px;
  // font-size: 1.2rem;
  margin: 0;
  // color:rgba(0,0,255,0.5);

  @media (min-width: 768px) {
    // font-size: 24px;
  }
`;

const Title1 = styled.h3`
display:flex;
// justify-content:center;
align-items:center;
gap:10px;
margin-right:10px;
  font-size: 18px;
  margin: 0;
  // color:rgba(0,0,255,0.5);

  @media (min-width: 768px) {
    // font-size: 24px;
  }
    @media (max-width:600px){
      display:none;
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

const Icon = styled.div`
  margin-top:8px;
`
const UserArea = styled.div`  
  display:flex;
  gap:15px;
  justify-content:center;
  align-items:center;
`

const P =styled.h4`
cursor:pointer;

`

const Button = styled.button`
  padding:8px;
  cursor:pointer;
  color:blue;
  background-color:white;
  border:none;
  border-radius:10px;
`


const TitleA = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:5px;
  padding:5px 15px;
  background-color: rgba(0,0,255,0.1);
  border-radius:10px;
  box-shadow:0px 4px 10px rgba(0,0,0,0.5);
`

const CartWrap=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  gap:10px;
  font-size:1.2rem;
  cursor:pointer;
`