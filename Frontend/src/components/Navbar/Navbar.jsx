import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ userData, logoutUser }) {
  return (
    <nav className="navbar navbar-expand-md bg-main-light navbar-light py-3">
      <div className="container">
        <Link className="navbar-brand homeText" to="/">BeBack</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/base">Chat</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/interview">Interview</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {userData ? (
              <>
                <div className="nav-item px-1">
                  <Link to={`/profile/${userData.id}`} className="nav-link text-warning"><i className="fa fa-smile">   Hello , {userData.name} </i></Link>
                </div>
                <li className="nav-item">
                  <Link className="nav-link" onClick={logoutUser} to="#">Logout</Link>
                </li>
              </>
            ) : (
              <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
                <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
              </>
            )}

{/*   dashboard  */}
{userData?.role === 'Admin' ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
              </>
            ) : (
              <>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
