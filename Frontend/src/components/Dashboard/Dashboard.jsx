import React from 'react';
import { Link } from "react-router-dom";


export default function Dashboard() {

  return (
    <>
    <div className='text-center mt-5'>
    <h1> Welcome to DashBoard </h1>
    <hr className='w-25  m-auto mt-4'/>
    </div>

      <div className="container mt-4">
        <div className="row justify-content-center">
          {/* User */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: "#0aad0a" }}>
                Manage Users
              </div>
              <div className="card-body">
                <Link to='/Users'><i className='fa fa-user'> Go to Users ...</i></Link>
                  
              </div>
            </div>
          </div>

          {/* Rooms */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: "#0aad0a" }}>
                Manage Rooms
              </div>
              <div className="card-body">
              <Link to='/Rooms'><i className='fa fa-door-open'> Go to Rooms ...</i></Link>

              </div>
            </div>
          </div>

                    {/* interview */}
                    <div className="col-md-3 mb-4">
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: "#0aad0a" }}>
                Manage interviews
              </div>
              <div className="card-body">
              <Link to='/interview'><i className='fa fa-pen'> Go to Interview ...</i></Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
