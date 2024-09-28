
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCopy, FaLink, FaShareAlt,FaQrcode } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import Swal from 'sweetalert2';
import PaymentLinkQrCode1 from './PaymentLinkQrCode1';
import PaymentLinkQrCode2 from './PaymentLinkQrCode2';
import PaymentLinkQrCode3 from './PaymentLinkQrCode3';
import PaymentLinkQrCode4 from './PaymentLinkQrCode4';
import { useNavigate } from 'react-router-dom';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";

// Base64 encoding function
const base64Encode = (str) => {
    return btoa(str); // Converts string to base64
};

// Base64 decoding function
const base64Decode = (str) => {
    return atob(str); // Converts base64 back to string
};

const PaymentLinkQrCode = () => {
    const navigate = useNavigate();
    
    const { setMenuSwitch, theme,paymenLinkQrCodeUiswitch,setPaymentLinkQrCodeUiSwitch } = useContext(Context);
    const [amount, setAmount] = useState('');
    const [url, setUrl] = useState('');
    const baseUrl = "http://localhost:3000"; // Example base URL
    const userId = "userId123";  // Example user ID
    const userName = "Esther"
    const phoneNumber = "123456789"

    const generateLink = () => {
        if (amount.trim() === '') {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Please enter an amount' });
            return;
        }

        // Encode the userId and amount
        const encodedData = base64Encode(`${userId}-${amount}-${userName}-${phoneNumber}`);
        const paymentUrl = `${baseUrl}/payment/${encodedData}`;  // Use the encoded data in the URL
        setUrl(paymentUrl);
    };

    const copyToClipboard = () => {
        if (url) {
            navigator.clipboard.writeText(url);
            Swal.fire({ icon: 'success', title: 'Copied!', text: 'Payment link copied to clipboard' });
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: 'No link generated to copy' });
        }
    };

    // Function to convert QR code to data URL
    const getQRCodeDataUrl = () => {
        const canvas = document.getElementById('qrCode');
        if (canvas) {
            return canvas.toDataURL();
        }
        return null;
    };

    const sharePaymentLink = () => {
        const qrCodeDataUrl = getQRCodeDataUrl();

        if (navigator.share) {
            navigator.share({
                title: 'Payment Link',
                text: `Pay ${amount} using this link: ${url}`,
                url: url,
                files: qrCodeDataUrl ? [new File([qrCodeDataUrl], 'QRCode.png', { type: 'image/png' })] : null
            })
                .then(() => console.log('Payment link shared successfully'))
                .catch(err => console.error('Error sharing', err));
        } else {
            Swal.fire({ icon: 'error', title: 'Error', text: 'Sharing is not supported on this device/browser.' });
        }
    };

    return (
       <Body theme={theme}>
             <PaymentLinkContainerA>
           {paymenLinkQrCodeUiswitch===0&&<div>
           {!url ? (
                <PaymentLinkContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaLink /><FaQrcode/>
                    </Icon>
                    <Title theme={theme}>Generate Payment Link / QR Code</Title>
                    <Button2 primary theme={theme} onClick={()=>setPaymentLinkQrCodeUiSwitch(1)}>
                    Receive link/ Qr code payment with Fixed amount
                        </Button2>
                        <Button2 primary theme={theme} onClick={()=>setPaymentLinkQrCodeUiSwitch(2)}>
                        Receive link/Qr code payment for variable amounts
                        </Button2>
                        <Button2 primary theme={theme} onClick={()=>setPaymentLinkQrCodeUiSwitch(3)}>
                        Make link/ Qr code payment with Fixed amount
                        </Button2>
                        {/* <Button2 primary theme={theme} onClick={()=>setPaymentLinkQrCodeUiSwitch(4)}>
                        Make link/ qr code payment with fixed amount to specific Paysphere user
                        </Button2> */}
                    <ButtonContainer>
                        
                        <Button onClick={() => {navigate('/dashboard');setPaymentLinkQrCodeUiSwitch(0)}} theme={theme}>Cancel</Button>
                         </ButtonContainer>
                </PaymentLinkContainer>
            ) : (
                <PaymentLinkContainer theme={theme}>
                    <Title theme={theme}>Copy Payment Link & Scan QR Code</Title>

                    <LinkWrap>
                        <Link theme={theme}>{url}</Link><CopyIcon theme={theme} onClick={copyToClipboard} />
                    </LinkWrap>
                    <QRCodeCanvas id="qrCode" value={url} size={200} />
                    <ButtonContainer>
                        <Button primary theme={theme} onClick={sharePaymentLink}>
                            Share <FaShareAlt />
                        </Button>

                        <Button onClick={() => setMenuSwitch(0)} theme={theme}>Cancel</Button>
                    </ButtonContainer>
                </PaymentLinkContainer>
            )}
           </div>}
           {paymenLinkQrCodeUiswitch===1&&<PaymentLinkQrCode1/>}
           {paymenLinkQrCodeUiswitch===2&&<PaymentLinkQrCode2/>}
           {paymenLinkQrCodeUiswitch===3&&<PaymentLinkQrCode3/>}
           {paymenLinkQrCodeUiswitch===4&&<PaymentLinkQrCode4/>}
        </PaymentLinkContainerA>
       </Body>
    );
};

export default PaymentLinkQrCode;


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




const PaymentLinkContainerA = styled.div`
    padding-top: 100px;
    padding-bottom:100px;
`;

const PaymentLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
    border-radius: 8px;
    box-shadow:0px 4px 10px rgba(0,0,0,0.3);
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 30px;
        max-width: 600px;
    }
`;

const Icon = styled.div`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
    text-align: center;

    @media (min-width: 768px) {
        font-size: 28px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => (theme === 'light' ? '#ccc' : '#555')};
    font-size: 16px;
    outline: none;
    background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
    color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

    &:hover {
        outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
    }

    @media (min-width: 768px) {
        padding: 12px;
        font-size: 18px;
    }
`;

const LinkWrap = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
     margin-bottom:20px;
     gap:10px;

`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top:20px;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;




const Button = styled.button`
    padding: 12px;
    width: 100%;
    background-color: ${({ primary, theme }) => 
        primary ? (theme === 'light' ? '#007bff' : '#0056b3') : 
        (theme === 'light' ? '#ccc' : '#666')};
    color: ${({ primary }) => (primary ? 'white' : 'black')};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
    

    &:hover {
        background-color: ${({ primary, theme }) => 
            primary ? (theme === 'light' ? '#004494' : '#003d7a') : 
            (theme === 'light' ? '#aaa' : 'gray')};
    }

    @media (min-width: 768px) {
        padding: 14px;
        font-size: 18px;
        margin-bottom: 0;
        width: 48%;
    }
`;




const Button2 = styled.button`
    padding: 12px;
    width: 100%;
    background-color: ${({ primary, theme }) => 
        primary ? (theme === 'light' ? '#007bff' : '#0056b3') : 
        (theme === 'light' ? '#ccc' : '#666')};
    color: ${({ primary }) => (primary ? 'white' : 'black')};
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-top:10px;
    

    &:hover {
        background-color: ${({ primary, theme }) => 
            primary ? (theme === 'light' ? '#004494' : '#003d7a') : 
            (theme === 'light' ? '#aaa' : 'gray')};
    }

    @media (min-width: 768px) {
        padding: 14px;
        font-size: 18px;
        margin-bottom: 0;
        // width: 48%;
    }
`;



// const Link = styled.h2`
//     color:${({theme})=>(theme==="light"?"rgba(0,0,255,0.5)":"#bbb")};
// `
const CopyIcon = styled(FaCopy)`
    color:${({theme})=>(theme==="light"?"rgba(0,0,255,0.5)":"#bbb")};
    cursor:pointer;
`

const Link = styled.h3`
    word-break: break-all;  /* Break long words if necessary */
    overflow-wrap: break-word;  /* Wrap text to prevent overflow */
    max-width: 100%;  /* Ensure it doesn't exceed container width */
    white-space: normal;  /* Allow text wrapping */
    color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#66b3ff')};  /* Example color */
    padding: 10px;  /* Optional: add some padding */
    background-color: ${({ theme }) => (theme === 'light' ? '#f8f9fa' : '#333')};  /* Optional: background color */
    border-radius: 4px;  /* Optional: rounded corners */
    word-wrap: break-word;  /* Ensures wrapping in older browsers */
`;
