import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const StoreFooter = () => {
const location = useLocation();

  return (
    <FooterContainer style={{display:!location.pathname.includes("store")?"none":""}}>
      <FooterGrid>
        {/* About Section */}
        <FooterSection>
          <FooterTitle>About Us</FooterTitle>
          <FooterLink>Our Story</FooterLink>
          <FooterLink>Contact Us</FooterLink>
          <FooterLink>Careers</FooterLink>
        </FooterSection>

        {/* Social Media Section */}
        <FooterSection>
          <FooterTitle>Follow Us</FooterTitle>
          <SocialMediaIcons>
            <SocialIcon>
              <FaFacebook className="fab fa-facebook"/>
            </SocialIcon>
            <SocialIcon >
              <FaTwitter/>
            </SocialIcon>
            <SocialIcon>
              <FaInstagram/>
            </SocialIcon>
          </SocialMediaIcons>
        </FooterSection>

        {/* Newsletter Subscription Section */}
        <FooterSection>
          <FooterTitle>Newsletter</FooterTitle>
          <p>Subscribe to receive updates on new products and offers.</p>
          <NewsletterForm>
            <EmailInput type="email" placeholder="Enter your email" />
            <SubmitButton type="submit">Subscribe</SubmitButton>
          </NewsletterForm>
        </FooterSection>
      </FooterGrid>

      <FooterBottom>
        © {new Date().getFullYear()}. All rights reserved. | Terms & Policies
      </FooterBottom>
    </FooterContainer>
  );
};

export default StoreFooter;


// Footer Container
const FooterContainer = styled.footer`
  background-color: rgba(0,0,255,0.5);
  color: white;
  padding: 40px 20px;
  text-align: center;
  width:100%;

  @media (min-width: 768px) {
    text-align: left;
    padding: 60px 40px;
  }
`;

// Flexbox for layout
const FooterGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Section styling
const FooterSection = styled.div`
  flex: 1;
  margin: 0 10px;
`;

// Title for sections
const FooterTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 18px;
  color: white;
`;

// Link style
const FooterLink = styled.a`
  display: block;
  color: white;
  margin-bottom: 10px;
  font-size: 14px;
  text-decoration: none;
  cursor:pointer;

  &:hover {
    // color: #f5a623;
    text-decoration: underline;
  }
`;

// Social Media icons container
const SocialMediaIcons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

// Individual social icons
const SocialIcon = styled.a`
  margin: 0 10px;
  font-size: 24px;
  color: white;
  cursor:pointer;

  &:hover {
    // color: #f5a623;
  }
`;

// Newsletter Subscription Form
const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

// Email input style
const EmailInput = styled.input`
  padding: 10px;
  font-size: 14px;
  margin-bottom: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;

  @media (min-width: 768px) {
    margin-bottom: 0;
    margin-right: 10px;
    width: auto;
    flex: 1;
  }
`;

// Submit button style
const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  color: white;
  background-color: rgba(0,0,255,0.7);
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    // background-color: #e59400;
  }
`;

// Footer Bottom
const FooterBottom = styled.div`
  margin-top: 40px;
  font-size: 12px;
  color: #888;
  text-align: center;
`;

