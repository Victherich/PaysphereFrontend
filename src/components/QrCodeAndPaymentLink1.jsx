import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaMoneyBillWave, FaLink, FaQrcode, FaUserFriends, FaUniversity, FaFileInvoiceDollar, FaMobileAlt, FaWifi, FaCreditCard, FaSms, FaPhoneAlt, FaUserPlus, FaHome } from 'react-icons/fa';
import { Context } from './Context';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate,useParams } from 'react-router-dom';
import Footer from './Footer';

const QrCodeAndPaymentLink1 = () => {
  const { setMenuSwitch, theme } = useContext(Context);
  const [loading, setLoading] = useState(false);  // State for loading
  const [balance, setBalance] = useState(null);   // State for balance
const navigate = useNavigate()
const { encodedData } = useParams();  // 'encodedData' is the Base64 encoded value from the URL
    const {userId, setUserId,
        amount2,setAmount2,
        userName,setUserName,
        userPhoneNumber,setUserPhoneNumber,
      description,setDescription}=useContext(Context)

    // Base64 decoding function
    const base64Decode = (str) => atob(str);

    useEffect(() => {
        if (encodedData) {
            // Decode the Base64 string
            const decodedData = base64Decode(encodedData);  // e.g., 'userId123-2000'
            const [decodedUserId, decodedAmount,decodedUserName,decodedPhoneNumber,decodedDescription] = decodedData.split('-');  // Split by the hyphen
            setUserId(decodedUserId);  // Set userId state
            setAmount2(decodedAmount);
            setUserName(decodedUserName);
            setUserPhoneNumber(decodedPhoneNumber);  // Set amount state
            setDescription(decodedDescription)
        }
    }, [encodedData]);


  return (
    <DashboardContainer theme={theme}>
       {/* Main Menu Sections */}
      <Section>
        <SectionTitle theme={theme}>Please select your preferred payment method</SectionTitle>
        <UserInfoSection theme={theme}>
        {/* <UserInfoTitle theme={theme}>User Details</UserInfoTitle> */}
        <UserInfoItem theme={theme}><Strong theme={theme}>Beneficiary Name:</Strong> {userName}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>User ID:</Strong> {userId}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Phone Number: </Strong> {userPhoneNumber}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Amount:  </Strong> NGN {amount2}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Description:  </Strong>{description}</UserInfoItem>
      
      </UserInfoSection>
        <GridContainer>
          <GridItem onClick={()=>navigate("/mobilemoneypayment")} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /></Icon>
            <ItemText theme={theme}>Mobile Money</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(10)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /></Icon>
            <ItemText theme={theme}>Ussd</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(11)} theme={theme}>
            <Icon theme={theme}><FaCreditCard /></Icon>
            <ItemText theme={theme}>Card Tap</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(12)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /></Icon>
            <ItemText theme={theme}>Phone Tap</ItemText>
          </GridItem>
          {/* <GridItem onClick={() => setMenuSwitch(13)} theme={theme}>
            <Icon theme={theme}><FaCreditCard /></Icon>
            <ItemText theme={theme}>Receive Manual Card Payment</ItemText>
          </GridItem> */}
          {/* <GridItem onClick={() => setMenuSwitch(14)} theme={theme}>
            <Icon theme={theme}><FaUniversity /></Icon>
            <ItemText theme={theme}>Receive Bank Transfer</ItemText>
          </GridItem> */}
          {/* <GridItem onClick={() => setMenuSwitch(15)} theme={theme}>
            <Icon theme={theme}><FaSms /></Icon>
            <ItemText theme={theme}>Receive Sms Payment</ItemText>
          </GridItem> */}
          <GridItem onClick={() => setMenuSwitch(17)} theme={theme}>
            <Icon theme={theme}><FaCreditCard /></Icon>
            <Icon theme={theme}><FaUniversity /></Icon>
            <ItemText theme={theme}>Card / Bank Transfer</ItemText>
          </GridItem>
        </GridContainer>
      </Section>




      <Section>
        <SectionTitle theme={theme}>Join Paysphere today for your efficient payment solution</SectionTitle>
        <GridContainer2>
          <GridItem onClick={() => navigate("/signup")} theme={theme}>
            <Icon theme={theme}><FaUserPlus /></Icon>
            <ItemText theme={theme}>Create an Account</ItemText>
          </GridItem>
          <GridItem onClick={() => navigate("/")} theme={theme}>
            <Icon theme={theme}><FaHome /></Icon>
            <ItemText theme={theme}>Paysphere Home</ItemText>
          </GridItem>
         
        </GridContainer2>
      </Section>
    
    </DashboardContainer>
  );
};

export default QrCodeAndPaymentLink1;

// Styled component for the main dashboard container
const DashboardContainer = styled.div`
  padding: 20px;
  padding-top: 80px;
  width: 100%;
  padding-bottom: 100px;
  

  @media (max-width: 428px) {
    // padding-bottom: 80px;
  }

  @media (max-width: 320px) {
    // padding-bottom: 0px;
  }
`;

// Styled component for the user information section
const UserInfoSection = styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  display:flex;
  justify-content:center;
  // align-items:center;
  flex-direction:column;
  width:
`;

// Styled component for the user info title
const UserInfoTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 15px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 255, 0.8)' : '#ddd')};
`;

// Styled component for each user info item
const UserInfoItem = styled.p`
display:flex;
gap:5px;
  font-size: 16px;
  margin: 5px 0;
  color: ${({ theme }) => (theme === 'light' ? '#555' : '#ddd')};
  
`;

const Strong = styled.p`
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.7)' : '#ddd')};
  font-weight:bold;
`

// Styled component for the storefront section
const StorefrontSection = styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? '#f9f9f9' : '#444')};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

// Styled component for the storefront title
const StorefrontTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0, 0, 255, 0.8)' : '#ddd')};
`;

// Styled component for the storefront description
const StorefrontDescription = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: ${({ theme }) => (theme === 'light' ? '#555' : '#ddd')};
`;

// Styled component for the storefront button
const StorefrontButton = styled.button`
  padding: 12px 20px;
  background-color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => (theme === 'light' ? '#004494' : '#003d7a')};
  }
`;

// Styled component for each section (Receive Payment, Make Payment)
const Section = styled.div`
  margin-bottom: 30px;
  display:flex;
  justify-content:center;
//   align-items:center;
  flex-direction:column;
  text-align:center;
`;



// Styled component for the section title
const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.8)' : '#ddd')};

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

// Styled component for the grid container
const GridContainer = styled.div`
display:flex;
justify-content:center;
// align-items:center;
//   display: grid;
//   grid-template-columns: 1fr;
width:100%;
  gap: 15px;
  flex-wrap:wrap;

  @media (min-width: 768px) {
    // grid-template-columns: repeat(3, 1fr);
    
  }
`;

const GridContainer2 = styled.div`
    display:flex;
    justify-content:space-around;
    alight-items:center;
    width:100%;
    flex-wrap:wrap;
    gap:30px;
    
`

// Styled component for each item in the grid
const GridItem = styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
  padding: 15px;
  border-radius: 8px;
  display: flex;
  width:100%;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 20px;
    width:30%;
  }
`;

// Styled component for the icon
const Icon = styled.div`
  font-size: 24px;
  color: ${({ theme }) => (theme === 'light' ? '#66f' : '#66f')};
  margin-right: 10px;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

// Styled component for the item text
const ItemText = styled.p`
  font-size: 16px;
  margin: 0;
  color: ${({ theme }) => (theme === 'light' ? '#555' : '#ddd')};

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

