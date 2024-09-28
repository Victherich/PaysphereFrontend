import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaChartBar, FaDashcube, FaFileInvoice, FaPhone, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import { Context } from './Context';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Features/Slice';
import { 
  MdDashboard, MdSettings, MdNotifications, MdPerson, MdExitToApp 
} from "react-icons/md";

const Footer = () => {
  const { setMenuSwitch, theme } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // const handleClick1 = () => {
  //   if (location.pathname === "/dashboard") {
  //     setMenuSwitch(0);
  //   } else {
  //     Swal.fire({
  //       title: "Please Login",
  //       timer: 2000,
  //       showConfirmButton: false,
  //       allowOutsideClick: false,
  //     });
  //   }
  // };

  // Logout function with confirmation
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions here (e.g., clearing session, tokens, etc.)
        // Redirect to login page
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          dispatch(userLogout()); // Redirect to the login page after successful logout
        });
      }
    });
  };

  return (
    <FooterContainer theme={theme} style={{ display: location.pathname === "/" ? "none" : '' }}>
      {location.pathname.includes('dashboard')&&<Icon theme={theme} onClick={()=>navigate('/dashboard')}><MdDashboard /></Icon>}
      <Icon theme={theme}><FaPhone /></Icon>
      {/* {location.pathname==="/dashboard"&&<Icon theme={theme} onClick={handleLogout}><FaSignOutAlt /></Icon>}  */}
    </FooterContainer>
  );
};

export default Footer;


// Styled component for the footer container
const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ theme }) => (theme === 'light' ? '#8080FF' : '#333')};
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#fff')};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index:1;
`;

// Styled component for the icons
const Icon = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#bbb')};

  @media (min-width: 768px) {
    font-size: 24px;
    margin-left: 20px;
  }
`;
