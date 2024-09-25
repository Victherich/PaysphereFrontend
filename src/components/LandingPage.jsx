import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaMobileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import HeroImg from "../Images/logo.png";

import { keyframes } from 'styled-components';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import RequestToPay from "../Images/RequestToPay.png"
import UssdPayment from "../Images/ussdpayment.png"
import smspayment from "../Images/smspayment.png"
import qrcode1 from "../Images/qrcode1.png"
import qrcode2 from "../Images/qrcode2.png"
import storefront from "../Images/storefront.png"
import { useSelector } from 'react-redux';
import emailPayment from "../Images/emailPayment.png"

const LandingPage = () => {
    const { setMenuSwitch, theme } = useContext(Context);
    const navigate = useNavigate();
    const userToken = useSelector(state=>state.userToken)
    const [reload,setReload]=useState(true)
    
    useEffect(()=>{
        const id = setTimeout(()=>{
            setReload(false)
        },100)
        const id2 = setTimeout(()=>{
            setReload(true)
        },500)
        return ()=>{clearTimeout(id);clearTimeout(id2)}
    },[])

    return (
        reload&&<Container theme={theme}>
          
            <LandingSection theme={theme}>
                <Content theme={theme}>
                    <Icon theme={theme}>
                        <FaMobileAlt />
                    </Icon>
                    <LandingTitle theme={theme}>
                        Paysphere: <br/>Simplifying Payments
                    </LandingTitle>
                    <Description theme={theme}>
                        Your solution to making and receiving payments in a more efficient, fast, innovative, and easy way.
                    </Description>
                    {!userToken&&<GetStartedButton 
                        onClick={() => navigate("/signup")} 
                        theme={theme}
                    >
                        Get Started
                    </GetStartedButton>}
                </Content>
                <ImageContainer>
                    <LandingImage src={HeroImg} alt="Mobile Payments" />
                </ImageContainer>
            </LandingSection>
            <Section theme={theme}>
                <Intro>
                    PaySphere is a payment solution that offers users the platform to make and receive payments in a more efficient, innovative, and easy way. It goes beyond the regular in-app purchase payments to real-time transactions, enabling users to engage in transactions beyond the regular in-app purchases.
                </Intro>
                <H3>UNIQUE FEATURES</H3>
                <Features > 
                    <Feature theme={theme} >
                    <FeatureImg src={RequestToPay} alt="storefront"/>
                        <FeatureTitle theme={theme}>Request to Pay (P2P)</FeatureTitle>
                        <FeatureDescription>
                            Take control of your payments. Instead of waiting for someone to pay you, use our Request to Pay feature. You can initiate the payment, and the payer will only have to approve the payment with just a click without having to log into their account.
                        </FeatureDescription>
                    </Feature>
                    <Feature theme={theme}>
                    <FeatureImg src={UssdPayment} alt="ussdpayment"/>
                        <FeatureTitle theme={theme}>USSD Payment</FeatureTitle>
                        <FeatureDescription>
                            Make payments without needing internet access. With USSD, you can simply dial a code on your mobile phone to complete transactions. This feature is especially useful in areas with limited internet connectivity.
                        </FeatureDescription>
                    </Feature>
                    {/* <Feature theme={theme} >
                    <FeatureImg src={smspayment} alt="smspayment"/>
                        <FeatureTitle theme={theme}>SMS Payment</FeatureTitle>
                        <FeatureDescription>
                            Pay via text message. With SMS payments, you can send and receive money using simple text commands. It’s a convenient option for users without smartphones or those who prefer basic text-based transactions.
                        </FeatureDescription>
                    </Feature> */}
                    <Feature theme={theme}>
                    <FeatureImg src={qrcode1} alt="qrcode1"/>
                        <FeatureTitle theme={theme}>Payment Link / QR Code</FeatureTitle>
                        <FeatureDescription>
                            Receive and make Payments fast and seamlessly via Links and QR Codes with both specific and variable payment amounts.
                        </FeatureDescription>
                    </Feature>
                    <Feature theme={theme}>
                    <FeatureImg src={emailPayment} alt="qrcode2"/>
                        <FeatureTitle theme={theme}>Payments via Email</FeatureTitle>
                        <FeatureDescription>
                            No need to worry if your payee is a Paysphere user, you can send payment to anyone via their email address.
                        </FeatureDescription>
                    </Feature>
                    <Feature theme={theme}>
                        
                        <FeatureImg src={storefront} alt="storefront"/>
                        <FeatureTitle theme={theme}>Storefront (In-App Checkout)</FeatureTitle>
                        <FeatureDescription>
                            Provides access for users to get paid for specific products or services by listing them from their dashboard. Clients can see the store, select, and pay for products and services using any of the provided payment methods.
                        </FeatureDescription>
                    </Feature>
                </Features>
            </Section>
            <Footer theme={theme}>
                <FooterText theme={theme}>
                    Paysphere is all about making payments straightforward and efficient. Whether you’re managing personal transactions or running a business, we’ve got the tools you need to handle payments effectively.
                </FooterText>
            </Footer>
        </Container>
    );
};

export default LandingPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#222')};
    color: ${({ theme }) => (theme === 'light' ? '#333' : '#ccc')};
    padding: 0;
    min-height: 100vh;
    
`;

const Header = styled.header`
    background-color: #007bff;
    color: white;
    text-align: center;
    padding: 20px 10px;
    width: 100%;
`;

const Title = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const Subtitle = styled.p`
    font-size: 16px;
    margin-top: 5px;
`;

const LandingSection = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    padding: 50px 20px;
    background-color: ${({ theme }) => (theme === 'light' ? 'white' : '#111')};
    background-image:url(${({theme})=>theme==="light"?HeroImg4:HeroImg5});
    background-size:cover;

    @media (min-width: 768px) {
        flex-direction: row;
        padding: 100px;
    }
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    background-color:${({theme})=>theme==="light"?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.5)"};
    border-radius:10px;

    @media (min-width: 768px) {
        align-items: flex-start;
        text-align: left;
    }
`;

const Icon = styled(FaMobileAlt)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const LandingTitle = styled.h1`
    font-size: 28px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;

    @media (min-width: 768px) {
        font-size: 36px;
    }
`;

const Description = styled.p`
    font-size: 16px;
    color: ${({ theme }) => (theme === 'light' ? '#111' : '#ccc')};
    margin-bottom: 30px;
    line-height: 1.6;

    @media (min-width: 768px) {
        font-size: 18px;
    }
`;

const GetStartedButton = styled.button`
    padding: 12px 24px;
    background-color: ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => (theme === 'light' ? '#0056b3' : '#004494')};
    }

    @media (min-width: 768px) {
        padding: 14px 28px;
        font-size: 18px;
    }
`;

const ImageContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    @media (min-width: 768px) {
        margin-top: 0;
        padding-left: 50px;
    }
`;

const flip = keyframes `
    0% {
        transform: rotateY(0deg);
    }
    100% {
        transform: rotateY(360deg);
    }
`

const LandingImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    animation: ${flip} 5s infinite;

    @media (min-width: 768px) {
        max-width: 80%;
    }
`;

const Section = styled.section`
    margin: 20px 0;
    width: 100%;
    padding: 0 20px;
`;

const Intro = styled.p`
    text-align: center;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
`;

const Features = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    width: 100%;
    padding: 20px;

    @media (min-width: 768px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        // align-items: center;
        gap: 30px;
    }
`;

const Feature = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    background-color:${({theme})=>(theme==="light"?"#fff":"#444")};
    border-radius: 8px;
    box-shadow:0px 4px 10px rgba(0,0,0,0.3);

    @media (min-width: 768px) {
        width: 40%;
        // max-height: 220px;
        justify-content: center;
        align-items: center;
    }
`;

const FeatureImg = styled.img`
    width:100%;
`

const FeatureTitle = styled.h3`
    font-size: 18px;
    margin-bottom: 10px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.7)' : '#bbb')};
`;

const FeatureDescription = styled.p`
    font-size: 14px;
    line-height: 1.6;
`;

const Footer = styled.footer`
    background-color: ${({theme})=>theme==="light"?"rgba(0,0,255,0.5)":"#333"};;
    color: white;
    text-align: center;
    padding: 20px 10px;
    width: 100%;
`;

const FooterText = styled.p`
    font-size: 14px;
    margin: 0;
    color: ${({theme})=>theme==="light"?"white":"#ccc"};
`;



const H3 = styled.h1`
    color:rgba(0,0,255,0.7);
    text-align:center;
    font-size:2.5rem;

`