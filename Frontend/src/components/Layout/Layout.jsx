import React from 'react'
import Navbar from '../Navbar/Navbar'
import {Outlet} from 'react-router-dom'

export default function Layout({userData, logoutUser}) {
  return (
    <>
        <Navbar userData={userData} logoutUser={logoutUser}/>
        <Outlet />
    </>
  )
}
