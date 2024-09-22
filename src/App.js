import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import SignUp from './components/SignUp'
import DashBoard from './components/DashBoard'
import LandingPage from './components/LandingPage'
import "./App.css"
import QrCodeAndPaymentLink1 from './components/QrCodeAndPaymentLink1'
import MobileMoneyPayment2 from './components/MobileMoneyPayment2'
import PrivateDashboard from './components/PrivateDashboard'
import QrCodeAndPaymentLink2 from './components/QrCodeAndPaymentLink2'
import QrCodeAndPaymentLink3 from './components/QrCodeAndPaymentLink3'
import PrivateLogin from './components/PrivateLogin'
import PrivateSignup from './components/PrivateSignup'
import ScrollToTop from './components/ScrollToTop'
import ApprovePayment from './components/ApprovePayment'
import DeclinePayment from './components/DeclinePayment'
import PayUser2 from './components/PayUser2'
import ReceiveCardAndBankPayment2 from './components/ReceiveCardAndBankPayment2'
import BankPayment2 from './components/BankPayment2'
import BankPayment3 from './components/BankPayment3'
import PayUser3 from './components/PayUser3'
import MobileMoneyPayout3 from './components/MobileMoneyPayout3'



const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop/>
    <Header/>
        <Routes>
            {/* <Route path="/login" element={<Login/>}/> */}
            <Route path="/signup" element={<SignUp/>}/>          
            <Route path="/" element = {<LandingPage/>}/>
            <Route path="/payment/:encodedData" element={<QrCodeAndPaymentLink1 />} />
            <Route path="/payment2/:encodedData2" element={<QrCodeAndPaymentLink2 />} />
            <Route path="/payment3/:encodedData3" element={<QrCodeAndPaymentLink3 />} />
            <Route path="/mobilemoneypayout3" element={<MobileMoneyPayout3/>}/>

            <Route path="/dashboard" element={<PrivateDashboard/>}>
            <Route path="" element={<DashBoard/>}/>
            </Route>

            <Route path="/login" element={<PrivateLogin/>}>
              <Route path="" element={<Login/>}/>
            </Route>

            <Route path="/signup" element={<PrivateSignup/>}>
              <Route path="" element={<SignUp/>}/>
            </Route>  
            <Route path="/approve/:transactionId" element={<ApprovePayment />} />
            <Route path="/deny/:transactionId" element={<DeclinePayment/>} />
            <Route path="payspheretransfer" element={<PayUser2/>}/>
            <Route path="/cardbankpayment" element={<ReceiveCardAndBankPayment2/>}/>
            <Route path="/bankpayment" element={<BankPayment2/>}/>
            <Route path="/bankpayout3" element={<BankPayment3/>}/>
            <Route path="/payuser3" element={<PayUser3/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
      
    
  )
}

export default App
