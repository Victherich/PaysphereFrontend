import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import { FaSignInAlt,FaEye,FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import axios from 'axios';
import HeroImg4 from "../Images/heroImg7.png";
import HeroImg5 from "../Images/heroImg5.png";
import { userLogin } from '../Features/Slice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const { theme, menuSwitch } = useContext(Context);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [showPassword,setShowPassword]=useState(false)

    // State to manage form inputs
    const [formData, setFormData] = useState({
        walletID: '',
        password: '',
    });

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

            // Send POST request to backend for login
            const response = await axios.post('https://paysphere-api.vercel.app/login', {
                walletID: formData.walletID,
                password: formData.password,
            }, {
                headers: {
                    'Content-Type': 'application/json',  // Specify JSON request
                },
            });

            // Success feedback and redirect
            Swal.fire({
                title: 'Success!',
                text: 'Login successful. Redirecting to your dashboard...',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                // Redirect to the dashboard page
                navigate('/dashboard');
            });
            // console.log(response.data)
            const userInfo = response.data.user
            const userToken = response.data.token
            // console.log(userInfo)

            dispatch(userLogin({userInfo,userToken}))

        } catch (error) {
            console.error(error);
            // Handle errors
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.error || 'please try again',
                // icon: 'error',
            });
        }
    };

    return (
        <LoginWrap theme={theme} menuSwitch={menuSwitch}>
            <FormContainerWrapper>
                <FormContainer theme={theme}>
                    <Icon theme={theme}>
                        <FaSignInAlt />
                    </Icon>
                    <Title theme={theme}>Login</Title>
                    <form onSubmit={handleSubmit}>
                        <Input
                            name="walletID"
                            theme={theme}
                            type="text"
                            placeholder="Enter wallet ID"
                            value={formData.walletID}
                            onChange={handleInputChange}
                            required
                        />
                        <InputWrap>
                        <Input
                            name="password"
                            theme={theme}
                            type={showPassword?"password":"text"}
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <ToggleVisibility onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </ToggleVisibility>
                        </InputWrap>
                        <ButtonContainer>
                            <Button primary theme={theme} type="submit">Login</Button>
                        </ButtonContainer>
                    </form>
                    <Paragraph1>
                        Don't have an account? <Span1 onClick={() => navigate("/signup")}>Sign Up</Span1>
                    </Paragraph1>
                </FormContainer>
            </FormContainerWrapper>
        </LoginWrap>
    );
};

export default Login;


// const LoginWrap = styled.div`
//   width: 100%;
//   background-color: ${({ theme, menuSwitch }) =>
//     theme === 'light'
//       ? 'white'
//       : '#111'};
//   color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
//   min-height: 100vh; // Ensure it takes up at least the full viewport height

//   @media (max-width: 320px) {
//     padding-bottom: 100px;
//   }
// `;


const LoginWrap = styled.div`
  width: 100%;
  position: relative; 
  color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  min-height: 100vh; 
  background-image: url(${({ theme }) => (theme === 'light' ? HeroImg4 : HeroImg5)});
  background-size: cover;
  background-position: center;
  z-index: 1; 

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
    // box-shadow: 4px 10px rgba(0,0,0,0.3);
    border-radius: 8px;
    box-shadow:0px 4px 10px rgba(0,0,0,0.3);
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: 768px) {
        padding: 30px;
        max-width: 600px;
    
    }
`;

const Icon = styled(FaSignInAlt)`
    font-size: 4rem;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;
`;

const Title = styled.h2`
    font-size: 24px;
    color: ${({ theme }) => (theme === 'light' ? 'rgba(0,0,255,0.5)' : '#bbb')};
    margin-bottom: 20px;

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


const InputWrap = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    // justify-content:center;
    margin-bottom:10px;
    position:relative;
`