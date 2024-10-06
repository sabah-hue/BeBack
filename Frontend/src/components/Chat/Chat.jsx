import React from 'react'
import './Chat.css'

export default function Chat() {
  /// users load
  // const API_URL = 'http://localhost:5000/users';
  /// rooms
  const rooms = ['node js', '.NET', 'python'];
  //// handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <>
    <div className="container py-4">
      <div className='row'>
        {/* side bar */}
        <div className='col-md-3'>
          {/* rooms */}
          <div className='card'>
            <div className='card-body'>
              <h4>Rooms</h4>
              <div className='list-group'>
                {rooms.map((room, index)=>(
                  <a href='#' className='list-group-item list-group-item-action' key={index}>{room}</a>
                ))}
              </div>
            </div>
          </div>
          {/* users */}
          <div className='card mt-4'>
            <div className='card-body'>
              <h4>Users</h4>
            <div className='list-group'>
              <a href='#' className='list-group-item list-group-item-action'> </a>
                <div className='d-flex w-100 justify-content-between'>
                  <h5 className='mb-1'>John Doe</h5>
                  <small>10:00</small>
                </div>
              
            </div>
            </div>
          </div>
        </div>

            {/* chat */}
            <div className='col-md-9 '>
            <div className='chatBody' placeholder="messages">

            </div>
              <form onSubmit={handleSubmit}>
                <div className='mt-2'>
                   <div className='input-group d-flex'>
                    <input className='form-control' type="text" placeholder='Enter your message ...' />
                    <button className='btn' type='submit'><i className='fas fa-paper-plane'></i></button>
                   </div>
                </div>
              </form>
            </div>
      </div>
    </div>
    </>
  )
}
