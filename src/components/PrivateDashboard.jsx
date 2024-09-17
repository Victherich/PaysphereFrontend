import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateDashboard = () => {
    const userToken = useSelector(state=>state.userToken)
  return (
    userToken?<Outlet/>:<Navigate to="/login"/>
  )
}

export default PrivateDashboard
