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
            <Route path="/mobilemoneypayment" element={<MobileMoneyPayment2/>}/>

            <Route path="/dashboard" element={<PrivateDashboard/>}>
            <Route path="" element={<DashBoard/>}/>
            </Route>

            <Route path="/login" element={<PrivateLogin/>}>
              <Route path="" element={<Login/>}/>
            </Route>

            <Route path="/signup" element={<PrivateSignup/>}>
              <Route path="" element={<SignUp/>}/>
            </Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
      
    
  )
}

export default App
