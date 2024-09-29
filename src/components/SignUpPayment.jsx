
// export default SignUp;
import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaUserPlus } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import axios from 'axios';
import countryCodes from './CountryCodes';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import HeroImg4 from '../Images/heroImg7.png';
import HeroImg5 from '../Images/heroImg5.png';

const SignUpPayment = () => {
    const { setMenuSwitch, theme, menuSwitch } = useContext(Context);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);
    // const {token} = useParams();
    const [token, setToken] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        token:token,
    });

    

    useEffect(() => {
      // Parse the query parameters
      const queryParams = new URLSearchParams(location.search);
      const tokenFromURL = queryParams.get('token');
      if (tokenFromURL) {
        setToken(tokenFromURL);
      }
    }, [location]);

    // Error state for each input
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [countryCodeError, setCountryCodeError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    // Validate each field
    const validate = (name, value) => {
        if (name === 'firstName') {
            if (!value) {
                setFirstNameError('First name is required.');
            } else if (/\s/.test(value)) {
                setFirstNameError('No spaces allowed.');
            } else if (value.length < 3) {
                setFirstNameError('Must be at least 3 characters.');
            } else if (value.split(' ').length > 1) {
                setFirstNameError('No two words allowed.');
            } else {
                setFirstNameError('');
            }
        } else if (name === 'lastName') {
            if (!value) {
                setLastNameError('Last name is required.');
            } else if (/\s/.test(value)) {
                setLastNameError('No spaces allowed.');
            } else if (value.length < 3) {
                setLastNameError('Must be at least 3 characters.');
            } else if (value.split(' ').length > 1) {
                setLastNameError('No two words allowed.');
            } else {
                setLastNameError('');
            }
        } else if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                setEmailError('Email is required.');
            } else if (!emailRegex.test(value)) {
                setEmailError('Invalid email format.');
            } else {
                setEmailError('');
            }
        } else if (name === 'countryCode') {
            if (!value) {
                setCountryCodeError('Country code is required.');
            } else {
                setCountryCodeError('');
            }
        } else if (name === 'phoneNumber') {
            if (!value) {
                setPhoneNumberError('Phone number is required.');
            } else if (value.startsWith('0')) {
                setPhoneNumberError('Phone number cannot start with zero.');
            } else {
                setPhoneNumberError('');
            }
        } else if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!value) {
                setPasswordError('Password is required.');
            } else if (!passwordRegex.test(value)) {
                setPasswordError('Password must be at least 8 characters, include letters, numbers, and special characters.');
            } else {
                setPasswordError('');
            }
        } else if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setConfirmPasswordError('Passwords do not match.');
            } else {
                setConfirmPasswordError('');
            }
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validate(name, value);
    };

    // Check form validity on change
    useEffect(() => {
        const isValid =
            !firstNameError &&
            !lastNameError &&
            !emailError &&
            !countryCodeError &&
            !phoneNumberError &&
            !passwordError &&
            !confirmPasswordError &&
            Object.values(formData).every(field => field !== '');

        setIsFormValid(isValid);
    }, [firstNameError, lastNameError, emailError, countryCodeError, phoneNumberError, passwordError, confirmPasswordError, formData]);

    // Alert if any field is empty
    const emptyAlert = () => {
        const emptyFields = Object.entries(formData).filter(([key, value]) => !value);
        if (emptyFields.length > 0) {
            Swal.fire({
                icon: 'error',
                text: 'Please fill all fields.'
            });
            return true;  // indicates that there are empty fields
        }
        return false;  // no empty fields
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Alert if fields are empty
        if (emptyAlert()) return;

        if (!isFormValid) {
            Swal.fire({
                title: 'Error!',
                text: 'Please correct the highlighted errors before submitting.',
                icon: 'error',
            });
            return;
        }

        try {
            Swal.fire({
                title: 'Processing...',
                text: 'Please wait while we process your request.',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            // const response = await axios.post('https://paysphere-api.vercel.app/signup', {
                const response = await axios.post('https://paysphere-api-utkm.onrender.com/signup', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                countryCode: formData.countryCode,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            Swal.fire({
                title: 'Success!',
                text: 'Sign up successful. We have sent your User ID to your email',
                icon: 'success',
                confirmButtonText: "Go to Login"
            }).then(() => {
                navigate('/login');
            });

        } catch (error) {
            console.error(error);
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
                            <InputWrap>
                                <Input
                                    name="firstName"
                                    theme={theme}
                                    type="text"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                                {firstNameError && <Error>{firstNameError}</Error>}
                            </InputWrap>    
                            <InputWrap>
                                <Input
                                    name="lastName"
                                    theme={theme}
                                    type="text"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                                {lastNameError && <Error>{lastNameError}</Error>}
                            </InputWrap>
                        </PasswordWrap>
                        <InputWrap>
                            <Input
                                name="email"
                                theme={theme}
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {emailError && <Error>{emailError}</Error>}
                        </InputWrap>
                        <PasswordWrap>
                            <InputWrap>
                                <Select
                                    name="countryCode"
                                    value={formData.countryCode}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select Country Code</option>
                                    {countryCodes.map(code => (
                                        <option key={code} value={code.code}>{code.name} {code.code}</option>
                                    ))}
                                </Select>
                                {countryCodeError && <Error>{countryCodeError}</Error>}
                            </InputWrap>
                            <InputWrap>
                                <Input
                                    name="phoneNumber"
                                    theme={theme}
                                    type="text"
                                    placeholder="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                                {phoneNumberError && <Error>{phoneNumberError}</Error>}
                            </InputWrap>
                        </PasswordWrap>
                        <PasswordWrap>
                            <InputWrap>
                                <Input
                                    name="password"
                                    theme={theme}
                                    type={showPassword ? "password" : "text"}
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <ToggleVisibility onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </ToggleVisibility>
                                {passwordError && <Error>{passwordError}</Error>}
                            </InputWrap>
                            <InputWrap>
                                <Input
                                    name="confirmPassword"
                                    theme={theme}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                                {confirmPasswordError && <Error>{confirmPasswordError}</Error>}
                            </InputWrap>
                        </PasswordWrap>
                        <ButtonContainer>
                            <Button primary type="submit" theme={theme}>
                                Sign Up
                            </Button>
                        </ButtonContainer>
                        <Paragraph1>
                        Already have an account? <Span1 onClick={() => navigate("/login")}>Login</Span1>
                    </Paragraph1>
                    </form>
                </FormContainer>
            </FormContainerWrapper>
        </SignUpWrap>
    );
};

// Your styled components go here...

export default SignUpPayment;


// Styled components for error messages
const Error = styled.div`
    color: red;
    font-size: 0.7rem;
    margin-top: 0.25em;
`;



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
    // margin-bottom: 10px;
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

const InputWrap = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    // justify-content:center;
    margin-bottom:10px;
    position:relative;
`

const Select = styled.select`
padding:12px;
border: 1px solid light-gray;
outline:none;
cursor:pointer;
width:100%;
`

const ToggleVisibility = styled.p`
    background: none;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 10px; // Adjust as needed
    top: 25px;
    transform: translateY(-50%);
    color: #666; // Adjust based on your theme
    outline: none;
    
`;