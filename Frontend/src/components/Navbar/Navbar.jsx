import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar({userData, logoutUser}) {
  return (

<nav class="navbar navbar-expand-md bg-main-light navbar-light  py-3">
<div className="container">
<Link className="navbar-brand" to="">BeBack</Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

    {/* ///////////////////////////////// */}
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link px-3" aria-current="page" to="/">Home</Link>
      </li>

      <li className="nav-item px-3">
        <Link className="nav-link" to="base">Chat</Link>
      </li>

      <li className="nav-item px-3">
        <Link className="nav-link" to="interview">Interview</Link>
      </li>

      <li className="nav-item px-3">
        <Link className="nav-link" to="challenge">Challenge</Link>
      </li>

    </ul>

          {/* /////////////////////////////////////// */}
    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {/* ///////will remove////// */}
      {userData? <>
        <div className="px-1">
        <Link to="profile">Hello, {userData.name}</Link>
        </div>

      <li className="nav-item px-1">
        <Link className="nav-link" onClick={logoutUser}>Logout</Link>
      </li>

      </> : <>
      <li className="nav-item px-1">
        <Link className="nav-link" to="login">test</Link>
      </li>

      </>}

    <li className="nav-item px-1">
        <Link className="nav-link" to="dashboard">DashBoard</Link>
    </li>
  
    </ul>

  </div>
</div>
</nav>

  )
}
