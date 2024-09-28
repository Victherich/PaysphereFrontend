import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DashBoard from './components/DashBoard';
import LandingPage from './components/LandingPage';
import "./App.css";
import QrCodeAndPaymentLink1 from './components/QrCodeAndPaymentLink1';
import MobileMoneyPayment2 from './components/MobileMoneyPayment2';
import PrivateDashboard from './components/PrivateDashboard';
import QrCodeAndPaymentLink2 from './components/QrCodeAndPaymentLink2';
import QrCodeAndPaymentLink3 from './components/QrCodeAndPaymentLink3';
import PrivateLogin from './components/PrivateLogin';
import PrivateSignup from './components/PrivateSignup';
import ScrollToTop from './components/ScrollToTop';
import ApprovePayment from './components/ApprovePayment';
import DeclinePayment from './components/DeclinePayment';
import PayUser2 from './components/PayUser2';
import ReceiveCardAndBankPayment2 from './components/ReceiveCardAndBankPayment2';
import BankPayment2 from './components/BankPayment2';
import BankPayment3 from './components/BankPayment3';
import PayUser3 from './components/PayUser3';
import MobileMoneyPayout3 from './components/MobileMoneyPayout3';
import Notifications from './components/Notifications';
import ProductLandingPage from './components/ProductlandingPage'; // Make sure the import path is correct
import ProductDetail from './components/ProductDetailPage'; // Make sure the import path is correct
import CartPage from './components/CartPage';
import OrderSummary from './components/OrderSummary';
import DeliveryDetails from './components/DeliveryDetails';
import RequestToPay from './components/RequestToPay';
import PayUser from './components/PayUser';
import RecieveUssdPayment from './components/RecieveUssdPayment';
import BankPayment from './components/BankPayment';
import MobileMoneyPayment from './components/MobileMoneyPayment';
import PaymentLinkQrCode from './components/PaymentLinkQrCode';
import ReceiveCardAndBankPayment from './components/ReceiveCardAndBankPayment';
import PayViaEmail from './components/PayViaEmail';
import ProductDashboard from './components/ProductDashboard';
import TransactionHistory from './components/TransactionHistory';
import RecieveUssdPayment2 from './components/RecieveUssdPayment2';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Route Definitions */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/payment/:encodedData" element={<QrCodeAndPaymentLink1 />} />
        <Route path="/payment2/:encodedData2" element={<QrCodeAndPaymentLink2 />} />
        <Route path="/payment3/:encodedData3" element={<QrCodeAndPaymentLink3 />} />
        <Route path="/mobilemoneypayout3" element={<MobileMoneyPayout3 />} />

        <Route path="/dashboard" element={<PrivateDashboard />}>
          <Route path="" element={<DashBoard />} />
        </Route>

        <Route path="/login" element={<PrivateLogin />}>
          <Route path="" element={<Login />} />
        </Route>

        <Route path="/signup" element={<PrivateSignup />}>
          <Route path="" element={<SignUp />} />
        </Route>

        <Route path="/approve/:transactionId" element={<ApprovePayment />} />
        <Route path="/deny/:transactionId" element={<DeclinePayment />} />
        <Route path="/payspheretransfer" element={<PayUser2 />} />
        <Route path="/cardbankpayment" element={<ReceiveCardAndBankPayment2 />} />
        <Route path="/bankpayment" element={<BankPayment2 />} />
        <Route path="/bankpayout3" element={<BankPayment3 />} />
        <Route path="/payuser3" element={<PayUser3 />} />
        
        <Route path="/store/:userId" element={<ProductLandingPage />} />
        <Route path="/store/:userId/productdetail/:productId" element={<ProductDetail />} /> 
        
        <Route path="/store/cart" element={<CartPage />} />
        <Route path="/store/ordersummary" element={<OrderSummary/>}/>
        <Route path="/store/deliverydetails" element={<DeliveryDetails/>}/>

      {/* private route dashbaord pages  */}
        <Route path="/dashboard/requesttopay" element={<RequestToPay/>}/>
        <Route path="/dashboard/transfertopaysphereuser" element={<PayUser/>}/>
        <Route path="/dashboard/paywithussd" element={<RecieveUssdPayment/>}/>
        <Route path='/dashboard/payandgetpaidbybank' element={<BankPayment/>}/>
        <Route path='/dashboard/mobilemoney' element={<MobileMoneyPayment/>}/>
        <Route path='/dashboard/getpaidandpaybylinkqrcode' element= {<PaymentLinkQrCode/>}/>
        <Route path='/dashboard/getpaidbycardandbank' element={<ReceiveCardAndBankPayment/>}/>
        <Route path='/dashboard/payviaemail' element={<PayViaEmail/>}/>
        <Route path ='/dashboard/productdashboard' element={<ProductDashboard/>}/>
        <Route path='/dashboard/transactionhistory' element= {<TransactionHistory/>}/>


        <Route path="/ussdpayment" element={<RecieveUssdPayment2/>}/>


        <Route path="mobilemoneypayment" element={<MobileMoneyPayment2/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
