

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import RequestToPay from './RequestToPay';
import PaymentLinkQrCode from './PaymentLinkQrCode';
import StaticQrCode from './StaticQRCode';
import PayUser from './PayUser';
import PayBank from './PayBank';
import PayBills from './PayBills';
import AirtimeRecharge from './AirTimeRecharge';
import MobileData from './MobileData';
import { Context } from './Context';
import Login from './Login';
import SignUp from './SignUp';
import LandingPageB from './LandingPage';
import MainMenu from './MainMenu';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import MobileMoneyPayment from './MobileMoneyPayment';
import RecieveUssdPayment from './RecieveUssdPayment';
import ReceiveCardTapPayment from './ReceiveCardTapPayment';
import ReceivePhoneTapPayment from './ReceivePhoneTapPayment';
import ManualCardPayment from './ReceiveManualCardPayment';
import SMSPayment from './SmsPayment';
import MakeMobileMoneyPayment from './MakeMobileMoneyPayment';
import ReceiveCardAndBankPayment from './ReceiveCardAndBankPayment';
import BankPayment from './BankPayment';
import ProductDashboard from './ProductDashboard';
import PayViaEmail from './PayViaEmail';
import TransactionHistory from './TransactionHistory';
import Notifications from './Notifications';
import TransactionAlert from './TransactionAlert';
import CreatePin from './CreateTransactionPin';
import { useNavigate } from 'react-router-dom';


const DashBoard = () => {
  const { menuSwitch, theme,createTransactionPinSwitch,setMenuSwitch } = useContext(Context);
  const navigate = useNavigate()




  useEffect(()=>{

    window.scroll(0,0)
  },[menuSwitch])

  return (
    <Body theme={theme} menuSwitch={menuSwitch}>
      {/* {menuSwitch === 11 && <LandingPageB/>} */}

 
      {menuSwitch === 0 && <MainMenu />}
      {/* {menuSwitch === 1 && <RequestToPay />} */}
      {/* {menuSwitch === 2 && <PaymentLinkQrCode />} */}
      {menuSwitch === 3 && <StaticQrCode />}
      {/* {menuSwitch === 4 && <PayUser />} */}
      {menuSwitch === 5 && <PayBank />}
      {menuSwitch === 6 && <PayBills />}
      {menuSwitch === 7 && <AirtimeRecharge />}
      {menuSwitch === 8 && <MobileData />}
      {/* {menuSwitch===9&&<MobileMoneyPayment/>} */}
      {/* {menuSwitch===10&&<RecieveUssdPayment/>} */}
      {menuSwitch===11&&<ReceiveCardTapPayment/>}
      {menuSwitch===12&&<ReceivePhoneTapPayment/>}
      {menuSwitch===13&&<ManualCardPayment/>}
      {/* {menuSwitch===14&&<BankPayment/>} */}
      {menuSwitch===15&&<SMSPayment/>}
      {menuSwitch===16&&<MakeMobileMoneyPayment/>}
      {/* {menuSwitch===17&&<ReceiveCardAndBankPayment/>} */}
      {/* {menuSwitch===18&&<ProductDashboard/>} */}
      {/* {menuSwitch===19&&<PayViaEmail/>} */}
      {/* {menuSwitch===20&&<TransactionHistory/>} */}
      {menuSwitch===21&&<Notifications/>}
      {menuSwitch===22&&<TransactionAlert/>}
      {createTransactionPinSwitch&&<CreatePin/>}
      

    </Body>
  );
};

export default DashBoard;




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
