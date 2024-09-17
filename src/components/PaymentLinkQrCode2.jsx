
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaCopy, FaLink, FaQrcode, FaShareAlt } from 'react-icons/fa';
import { QRCodeCanvas } from 'qrcode.react';
import Swal from 'sweetalert2';

// Base64 encoding function
const base64Encode = (str) => {
    return btoa(str); // Converts string to base64
};

// Base64 decoding function
const base64Decode = (str) => {
    return atob(str); // Converts base64 back to string
};

const PaymentLinkQrCode2 = () => {

    const { setMenuSwitch, theme ,paymenLinkQrCodeUiswitch,setPaymentLinkQrCodeUiSwitch} = useContext(Context);
    // const [amount, setAmount] = useState('');
    const [url, setUrl] = useState('');
    const baseUrl = "http://localhost:3000"; // Example base URL
    const userId = "userId123";  // Example user ID
    const userName = "Esther"
    const phoneNumber = "123456789"

    const generateLink = () => {
     

        // Encode the userId and amount
        const encodedData = base64Encode(`${userId}-${userName}-${phoneNumber}`);
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
                text: `Pay using this link: ${url}`,
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
        <PaymentLinkContainerA>
          
           <div>
           {!url ? (
                <PaymentLinkContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaLink /><FaQrcode/>
                    </Icon>
                    <Title theme={theme}>Receive link/Qr code payment for variable amounts</Title>
                    {/* <Input
                        theme={theme}
                        type="text"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    /> */}
                    <ButtonContainer>
                        <Button primary theme={theme} onClick={generateLink}>
                            Generate Link / QR Code
                        </Button>
                        <Button onClick={() => {setMenuSwitch(0);setPaymentLinkQrCodeUiSwitch(0)}} theme={theme}>Cancel</Button>
                        <Button primary onClick={() => setPaymentLinkQrCodeUiSwitch(0)} theme={theme}>Back</Button>
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

                        <Button onClick={() => {setMenuSwitch(0);setPaymentLinkQrCodeUiSwitch(0)}} theme={theme}>Cancel</Button>
                    </ButtonContainer>
                </PaymentLinkContainer>
            )}
           </div>
         
         
        </PaymentLinkContainerA>
    );
};

export default PaymentLinkQrCode2;



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
