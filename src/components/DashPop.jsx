import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Context } from './Context'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { userLogout } from '../Features/Slice'

const DashPop = React.forwardRef((props,ref) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setMenuSwitch,dashPopSwitch,setDashPopSwitch,setCreateTransactionPinSwitch}=useContext(Context)

 // Logout function with confirmation
 const handleLogout = () => {
    setDashPopSwitch(false)
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
    <DashPopWrap ref={ref}>
        <P onClick={()=>{navigate("/dashboard");setMenuSwitch(0);setDashPopSwitch(false)}}>Dashboard</P>
        <Line></Line>
        <P onClick={()=>{setMenuSwitch(20);setDashPopSwitch(false)}}>Transaction History</P>
        <Line></Line>
        <P onClick={()=>{setCreateTransactionPinSwitch(true);setDashPopSwitch(false)}}>Create Transaction Pin</P>
        <Line></Line>
        <P onClick={handleLogout}>Logout</P>
    </DashPopWrap>
  )
})

export default DashPop

const DashPopWrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding:5px;
    gap:5px;
    background-color:white;
    position:absolute;
    top:60px;
    right:10px;
    width:200px;
`
const P = styled.p`
color:rgba(0,0,255,0.7);
cursor:pointer;
font-weight:500;
width:100%;
height:30px;
text-align:center;

&:hover{
    color:white;
    background-color:rgba(0,0,255,0.5)
}
`

const Line = styled.div`
    width:100%;
    height:1px;
    background-color:rgba(0,0,255,0.5);

`