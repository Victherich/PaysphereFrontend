

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import HeroImg4 from '../Images/heroImg7.png';
import HeroImg5 from '../Images/heroImg5.png';

const SignUp = () => {
    const { setMenuSwitch, theme, menuSwitch } = useContext(Context);
    const navigate = useNavigate();

    // State to manage form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    console.log(formData)

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, // Copy existing form data
            [name]: value, // Update specific field with new value
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match before submitting
        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match!',
                icon: 'error',
            });
            return;
        }

        try {
            // Display processing message
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // Send POST request to backend
            const response = await axios.post('https://paysphere-api.vercel.app/signup', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                countryCode: formData.countryCode,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                confirmPassword:formData.confirmPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Specify JSON request
                },
            });

            // Success feedback
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully signed up. Redirecting to login...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                navigate('/login'); // Redirect to login page
            });

        } catch (error) {
            console.error(error)
            // Handle errors
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.msg || 'Sign up failed',
                icon: 'error',
            });
        }
    };

    return (
        <SignUpWrap theme={theme} menuSwitch={menuSwitch}>
            <FormContainerWrapper>
                <FormContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaUserPlus />
                    </Icon>
                    <Title theme={theme}>Sign Up</Title>
                    <form onSubmit={handleSubmit}>
                        <PasswordWrap>
                            <Input
                                name="firstName"
                                theme={theme}
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="lastName"
                                theme={theme}
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </PasswordWrap>
                        <Input
                            name="email"
                            theme={theme}
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        <PasswordWrap>
                            <Input
                                name="countryCode"
                                theme={theme}
                                type="text"
                                placeholder="Country Code"
                                value={formData.countryCode}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="phoneNumber"
                                theme={theme}
                                type="text"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </PasswordWrap>
                        <PasswordWrap>
                            <Input
                                name="password"
                                theme={theme}
                                type="text"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <Input
                                name="confirmPassword"
                                theme={theme}
                                type="text"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </PasswordWrap>
                        <ButtonContainer>
                            <Button primary theme={theme} type="submit">Sign Up</Button>
                        </ButtonContainer>
                        <Paragraph1>
                            Already have an account? <Span1 onClick={() => navigate('/login')}>Login</Span1>
                        </Paragraph1>
                    </form>
                </FormContainer>
            </FormContainerWrapper>
        </SignUpWrap>
    );
};

export default SignUp;


const SignUpWrap = styled.div`
padding-bottom:100px;
 width: 100%;
  position: relative; // Ensure proper positioning for the pseudo-element
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh; // Ensure it takes up at least the full viewport height
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
  z-index: 1; // Ensure content sits above the overlay

  // Add the transparent black overlay
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({theme})=>theme==="light"?"rgba(255,255,255,0.7)":"rgba(0, 0, 0, 0.7)"}; 
    z-index: -1; // Ensure the overlay is behind the content
  }
  @media (max-width: 320px) {
    padding-bottom: 100px;
  }
`;


const FormContainerWrapper = styled.div`
    padding-top: 100px;
`;

const FormContainer = styled.div`
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

const Icon = styled(FaUserPlus)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    // margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 5px;

    @media (min-width: 768px) {
        font-size: 28px;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
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
        padding: 10px;
        font-size: 18px;
    }
`;

const PasswordWrap = styled.div`
    display:flex;
    width:100%;
    justify-content:space-between;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

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
        width: 100%;
    }
`;

const Paragraph1 = styled.p`
    margin-top:10px;
`

const Span1 = styled.span`
    color:blue;
    cursor:pointer;
`




// import React, { useContext } from 'react';
// import styled from 'styled-components';
// import { Context } from './Context';
// import { FaUserPlus } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import HeroImg4 from "../Images/heroImg7.png";
// import HeroImg5 from "../Images/heroImg5.png";

// const SignUp = () => {
//     const { theme, menuSwitch } = useContext(Context);
//     const navigate = useNavigate();

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const formData = new FormData(event.target);
//         const data = Object.fromEntries(formData.entries());

//         // Show loading alert
//         Swal.fire({
//             title: 'Signing Up...',
//             text: 'Please wait while we process your request.',
//             icon: 'info',
//             showConfirmButton: false,
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });

//         try {
//             const response = await fetch('http://localhost:5000/auth/signup', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(data),
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 // Show success message
//                 Swal.fire({
//                     title: 'Success!',
//                     text: 'You have successfully signed up. Redirecting to login...',
//                     icon: 'success',
//                     timer: 2000,
//                     showConfirmButton: false
//                 }).then(() => {
//                     navigate('/login');
//                 });
//                 console.log("Sign up successful:", result);
//             } else {
//                 // Show error message
//                 Swal.fire({
//                     title: 'Error!',
//                     text: result.msg || 'Something went wrong. Please try again.',
//                     icon: 'error',
//                     confirmButtonText: 'Try Again'
//                 });
//                 console.error("Sign up error:", result.msg);
//             }
//         } catch (error) {
//             // Handle network or other errors
//             Swal.fire({
//                 title: 'Error!',
//                 text: 'Network error. Please check your connection and try again.',
//                 icon: 'error',
//                 confirmButtonText: 'Okay'
//             });
//             console.error("Network error:", error);
//         }
//     };

//     return (
//         <SignUpWrap theme={theme} menuSwitch={menuSwitch}>
//             <FormContainerWrapper>
//                 <FormContainer theme={theme} onSubmit={handleSubmit}>
//                     <Icon theme={theme}>
//                         <FaUserPlus />
//                     </Icon>
//                     <Title theme={theme}>Sign Up</Title>
//                     <PasswordWrap>
//                         <Input theme={theme} name="firstName" type="text" placeholder="Enter First Name" required />
//                         <Input theme={theme} name="lastName" type="text" placeholder="Enter Last Name" required />
//                     </PasswordWrap>
//                     <PasswordWrap>
//                         <Input theme={theme} name="email" type="email" placeholder="Enter Email" required />
//                         <Input theme={theme} name="phoneNumber" type="text" placeholder="Enter Phone Number" required />
//                     </PasswordWrap>
//                     <PasswordWrap>
//                         <Input theme={theme} name="password" type="password" placeholder="Enter Password" required />
//                         <Input theme={theme} name="confirmPassword" type="password" placeholder="Confirm Password" required />
//                     </PasswordWrap>
//                     <ButtonContainer>
//                         <Button primary theme={theme} type="submit">Sign Up</Button>
//                     </ButtonContainer>
//                     <Paragraph1>Don't have an account? <Span1 onClick={() => navigate("/login")}>Login</Span1></Paragraph1>
//                 </FormContainer>
//             </FormContainerWrapper>
//         </SignUpWrap>
//     );
// };

// const SignUpWrap = styled.div`
//  width: 100%;
//   position: relative;
//   color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
//   min-height: 100vh;
//   background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
//   background-size: cover;
//   background-position: center;
//   z-index: 1;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: ${({ theme }) => theme === "light" ? "rgba(255,255,255,0.7)" : "rgba(0, 0, 0, 0.7)"};
//     z-index: -1;
//   }
//   @media (max-width: 320px) {
//     padding-bottom: 100px;
//   }
// `;

// const FormContainerWrapper = styled.div`
//     padding-top: 100px;
// `;

// const FormContainer = styled.form`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//     background-color: ${({ theme }) => (theme === 'light' ? 'whitesmoke' : '#333')};
//     border-radius: 8px;
//     box-shadow: 0px 4px 10px rgba(0,0,0,0.3);
//     max-width: 400px;
//     margin: 0 auto;

//     @media (min-width: 768px) {
//         padding: 30px;
//         max-width: 600px;
//     }
// `;

// const Icon = styled(FaUserPlus)`
//     font-size: 4rem;
//     color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
// `;

// const Title = styled.h2`
//     font-size: 24px;
//     color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
//     margin-bottom: 5px;

//     @media (min-width: 768px) {
//         font-size: 28px;
//     }
// `;

// const Input = styled.input`
//     width: 100%;
//     padding: 10px;
//     margin-bottom: 10px;
//     border-radius: 4px;
//     border: 1px solid ${({ theme }) => (theme === 'light' ? '#ccc' : '#555')};
//     font-size: 16px;
//     outline: none;
//     background-color: ${({ theme }) => (theme === 'light' ? '#fff' : '#444')};
//     color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};

//     &:hover {
//         outline: 1px solid ${({ theme }) => (theme === 'light' ? '#007bff' : '#0056b3')};
//     }

//     @media (min-width: 768px) {
//         padding: 10px;
//         font-size: 18px;
//     }
// `;

// const PasswordWrap = styled.div`
//     display: flex;
//     width: 100%;
//     justify-content: space-between;
// `;

// const ButtonContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     width: 100%;

//     @media (min-width: 768px) {
//         flex-direction: row;
//         justify-content: space-between;
//     }
// `;

// const Button = styled.button`
//     padding: 12px;
//     width: 100%;
//     background-color: ${({ primary, theme }) => 
//         primary ? (theme === 'light' ? '#007bff' : '#0056b3') : 
//         (theme === 'light' ? '#ccc' : '#666')};
//     color: ${({ primary }) => (primary ? 'white' : 'black')};
//     border: none;
//     border-radius: 4px;
//     font-size: 16px;
//     cursor: pointer;
//     margin-bottom: 10px;

//     &:hover {
//         background-color: ${({ primary, theme }) => 
//             primary ? (theme === 'light' ? '#004494' : '#003d7a') : 
//             (theme === 'light' ? '#aaa' : 'gray')};
//     }

//     @media (min-width: 768px) {
//         padding: 14px;
//         font-size: 18px;
//         margin-bottom: 0;
//         width: 100%;
//     }
// `;

// const Paragraph1 = styled.p`
//     margin-top: 10px;
// `;

// const Span1 = styled.span`
//     color: blue;
//     cursor: pointer;
// `;

// export default SignUp;
