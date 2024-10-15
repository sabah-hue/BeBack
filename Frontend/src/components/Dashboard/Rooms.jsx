import React from 'react'

export default function Dashboard() {

  return (
    <>
    <div className='text-center mt-5'>
    <h1> Rooms DashBoard</h1>
    <hr className='w-25  m-auto mt-4'/>
    </div>

      <div className="container mt-4">
        <div className="row">

          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: "#ffc107" }}>
                Manage Rooms
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Room ID</th>
                      <th>Room Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>101</td>
                      <td>Backend Room</td>
                      <td>
                        <button className="btn btn-sm btn-primary" style={{ backgroundColor: "#28a745" }}>Edit</button>
                        <button className="btn btn-sm btn-danger ms-2">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
