



import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaMoneyBillWave, FaLink, FaQrcode, FaUserFriends, FaUniversity, FaFileInvoiceDollar, FaMobileAlt, FaWifi, FaCreditCard, FaSms, FaPhoneAlt, FaArrowDown, FaLongArrowAltDown, FaArrowUp } from 'react-icons/fa';
import { Context } from './Context';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from "../Images/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import CreatePin from './CreateTransactionPin';
import { userLogin } from '../Features/Slice';

const MainMenu = () => {
  const { setMenuSwitch, theme,createTransactionPinSwitch,setCreateTransactionPinSwitch } = useContext(Context);
  const [loading, setLoading] = useState(false);  // State for loading
  const [balance, setBalance] = useState(null);   // State for balance
  const userInfo = useSelector(state=>state.userInfo)
  const userToken = useSelector(state=>state.userToken)
  const dispatch = useDispatch();


  
  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true); // Start loading spinner or any UI indication
      try {
        // Make the API request to fetch balance
        const response = await axios.get('https://api.korapay.com/merchant/api/v1/balances', {
          headers: {
            Authorization: 'Bearer sk_test_YureVAxZbyoA41CyRZCVxhnopPeyVztLbqG71rU1', // Replace with actual key
            'Content-Type': 'application/json',
          },
          timeout: 10000,  // Optional: Timeout after 10 seconds
        });
  
        // Check the status and set balance if request is successful
        if (response.data.status) {
          const availableBalance = response.data.data.NGN.available_balance || 0; // Check for available_balance safely
          setBalance(availableBalance); // Update the state with the balance
          // console.log('Available Balance:', availableBalance);
        } else {
          throw new Error(response.data.message || 'Unknown error'); // Handle API errors
        }
  
      } catch (error) {
        // Handle network errors, timeouts, or authorization issues
        let errorMessage = 'Failed to fetch balance.';
  
        if (error.response) {
          // Server responded with a status code outside 2xx
          errorMessage += ` Server responded with ${error.response.status}: ${error.response.data.message || 'Unknown error'}.`;
        } else if (error.request) {
          // No response was received (e.g., timeout)
          errorMessage += ' No response from server (possible network or timeout issue).';
        } else {
          // Other errors (e.g., bad request setup)
          errorMessage += ` Error: ${error.message}`;
        }
  
        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Error fetching balance:', error);
  
      } finally {
        setLoading(false); // Stop loading spinner or any UI indication
      }
    };
  
    fetchBalance(); // Fetch the balance when the component mounts
  }, []); // Empty dependency array ensures this runs only once on mount
  

  useEffect(() => {
    // Function to fetch user info from the server
    const fetchUserInfo = async () => {
        try {
            const response = await fetch('https://paysphere-api.vercel.app/get_user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`, // Replace userToken with actual token
                    'Content-Type': 'application/json'
                }
            });

            // Handle the response based on the status code
            if (response.ok) {
                const data = await response.json();
                // setUserInfo(data);  // Store user data in state
                // console.log(data)
                const userInfo = data.user

                dispatch(userLogin({userInfo,userToken}))
            } else if (response.status === 404) {
                console.log('User not found.');
            } else {
                console,log('An error occurred while fetching user details.');
            }
        } catch (err) {
            console.error('Fetch error:', err);
            // setError('Network error. Please try again later.');
        } finally {
            setLoading(false);  // Stop the loading state
        }
    };

    fetchUserInfo();  // Fetch user info when component mounts

}, []);  // Empty dependency ar


  return (
    <DashboardContainer theme={theme}>
      <UserInfoSection theme={theme}>
        <UserInfoTitle theme={theme}>Paysphere | Admin Area</UserInfoTitle>
        
        {/* Master Balance Section */}
        <UserInfoItem theme={theme}>
          <Strong theme={theme}>Master Balance: </Strong>
          {loading ? 'Loading...' : balance !== null ? `NGN ${balance}` : 'Failed to load balance'}
        </UserInfoItem>
      </UserInfoSection>




      {/* User Information Section */}
      <UserInfoSection theme={theme}>
        <UserInfoTitle theme={theme}>Hi, {userInfo.firstName}</UserInfoTitle>
        {/* <UserInfoItem theme={theme}><Strong primary theme={theme}>Hi, {userInfo.firstName}</Strong></UserInfoItem> */}
        <UserInfoItem theme={theme}><Strong theme={theme}>User ID:</Strong> {userInfo.walletID}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Email:</Strong> {userInfo.email}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Phone Number: </Strong> {userInfo.phoneNumber}</UserInfoItem>
        <UserInfoItem theme={theme}><Strong theme={theme}>Balance: </Strong> NGN {userInfo.wallet}</UserInfoItem>
        {createTransactionPinSwitch&&<CreatePin/>}
        <Button onClick={()=>setCreateTransactionPinSwitch(true)}>Create Transaction Pin</Button>
      </UserInfoSection>
      


      {/* Main Menu Sections */}
      <Section>
        <SectionTitle theme={theme}>Main Menu</SectionTitle>
        <GridContainer>
          <GridItem onClick={() => setMenuSwitch(1)} theme={theme}>
            <Icon theme={theme}><FaMoneyBillWave /><FaArrowDown/></Icon>
            <ItemText theme={theme}>Paysphere Payment Request (P2P) </ItemText>
         
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(4)} theme={theme}>
            <Icon theme={theme}><FaUserFriends /> <FaArrowDown/><FaArrowUp/></Icon>
            <ItemText theme={theme}>Paysphere Transfer (P2P)</ItemText>
         
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(10)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /> <FaArrowDown/><FaArrowUp/></Icon>
            <ItemText theme={theme}>Ussd Payment</ItemText>
          </GridItem>

          {/* <GridItem onClick={() => setMenuSwitch(13)} theme={theme}>
            <Icon theme={theme}><FaCreditCard /> <FaArrowDown/></Icon>
            <ItemText theme={theme}>Manual Card Payment</ItemText>
          </GridItem> */}

          <GridItem onClick={() => setMenuSwitch(14)} theme={theme}>
            <Icon theme={theme}><FaUniversity /> <FaArrowDown/><FaArrowUp/></Icon>
            <ItemText theme={theme}>Bank Payment</ItemText>
          </GridItem>

          <GridItem onClick={() => setMenuSwitch(9)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /><FaArrowDown/><FaArrowUp/></Icon>
            <ItemText theme={theme}>Mobile Money </ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(2)} theme={theme}>
            <Icon theme={theme}><FaLink /><FaQrcode/><FaArrowDown/><FaArrowUp/></Icon>
            <ItemText theme={theme}>Payment Link / QR Code</ItemText>
          </GridItem>


          {/* check here  */}
          {/* <GridItem onClick={() => setMenuSwitch(2)} theme={theme}>
            <Icon theme={theme}><FaLink /></Icon>
            <ItemText theme={theme}>Send Payment Link / Dynamic QR Code</ItemText>
          </GridItem> */}
          {/* <GridItem onClick={() => setMenuSwitch(3)} theme={theme}>
            <Icon theme={theme}><FaQrcode /></Icon>
            <ItemText theme={theme}>Send Static QR Code</ItemText>
          </GridItem> */}
          
          
          {/* <GridItem onClick={() => setMenuSwitch(11)} theme={theme}>
            <Icon theme={theme}><FaCreditCard /></Icon>
            <ItemText theme={theme}>Receive Card Tap Payment</ItemText>
          </GridItem> */}
          {/* <GridItem onClick={() => setMenuSwitch(12)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /></Icon>
            <ItemText theme={theme}>Receive Phone Tap Payment</ItemText>
          </GridItem> */}
          
          
          {/* <GridItem onClick={() => setMenuSwitch(15)} theme={theme}>
            <Icon theme={theme}><FaSms /></Icon>
            <ItemText theme={theme}>Receive Sms Payment</ItemText>
          </GridItem> */}
          <GridItem onClick={() => setMenuSwitch(17)} theme={theme}>
            <Icon theme={theme}><FaCreditCard />   <FaUniversity/></Icon>
            <ItemText theme={theme}>Receive Card / Bank Transfer payment</ItemText>
          </GridItem>
        </GridContainer>
      </Section>

      {/* <Section>
        <SectionTitle theme={theme}>Make Payments</SectionTitle>
        <GridContainer>
          
          <GridItem onClick={() => setMenuSwitch(5)} theme={theme}>
            <Icon theme={theme}><FaUniversity /></Icon>
            <ItemText theme={theme}>Make Bank Transfer Payment</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(16)} theme={theme}>
            <Icon theme={theme}><FaPhoneAlt /></Icon>
            <ItemText theme={theme}>Make Mobile Money Payment</ItemText>
          </GridItem>
        </GridContainer>
      </Section> */}

            {/* Storefront Section */}
            <StorefrontSection theme={theme}>
        <StorefrontTitle theme={theme}>Storefront</StorefrontTitle>
        <StorefrontDescription theme={theme}>
          Welcome to your storefront! Here you can receive payments for specific products and services by listing them. Click below to access your store dashboard where you can post new products or services and manage existing ones.
        </StorefrontDescription>
        <StorefrontButton onClick={() => setMenuSwitch(17)} theme={theme}>Go to Store Dashboard</StorefrontButton>
      </StorefrontSection>


      <Section>
        <SectionTitle theme={theme}>More Features</SectionTitle>
        <GridContainer>
          <GridItem onClick={() => setMenuSwitch(6)} theme={theme}>
            <Icon theme={theme}><FaFileInvoiceDollar /></Icon>
            <ItemText theme={theme}>Pay Bills</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(7)} theme={theme}>
            <Icon theme={theme}><FaMobileAlt /></Icon>
            <ItemText theme={theme}>Mobile Airtime</ItemText>
          </GridItem>
          <GridItem onClick={() => setMenuSwitch(8)} theme={theme}>
            <Icon theme={theme}><FaWifi /></Icon>
            <ItemText theme={theme}>Mobile Data</ItemText>
          </GridItem>
        </GridContainer>
      </Section>
    </DashboardContainer>
  );
};

export default MainMenu;

// Styled component for the main dashboard container
const DashboardContainer = styled.div`
  padding: 20px;
  padding-top: 80px;
  width: 100%;
  padding-bottom: 100px;

  @media (max-width: 428px) {
    padding-bottom: 60px;
  }

  @media (max-width: 320px) {
    padding-bottom: 0px;
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
  font-size: 16px;
  margin: 5px 0;
  font-weight:400;
  gap:5px;
  color: ${({ theme }) => (theme === 'light' ? 'black' : '#ddd')};
  
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Styled component for each item in the grid
const GridItem = styled.div`
  background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  // gap:5px;

  // justify-content:space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

// Styled component for the icon
const Icon = styled.div`
  font-size: 24px;
  display:flex;
  justify-content:center;
  align-items:center;
  color: ${({ theme }) => (theme === 'light' ? '#66f' : '#66f')};
  margin-right: 10px;

  @media (min-width: 768px) {
    // font-size: 28px;
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

const Img = styled.img`
  width:35px;
  margin-top:5px;
  margin-left:5px;
`

const Button = styled.button`
  padding:5px;
  width:200px;
  cursor:pointer;
  color:blue;
  border:1px solid blue;
`