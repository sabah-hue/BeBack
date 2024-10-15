import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react";
import axios from "axios";

export default function CreateRoom() {
    const navigate = useNavigate();
    const [CreateRoom, setCreateRoom] = useState({
        name: "",
      });
        

      const handleCreate = async (e) => {
        e.preventDefault();
      try {
        await axios.post(`http://localhost:5000/chat/room`, CreateRoom);
        navigate('/Rooms')
      } catch (error) {
        console.error("Error Create Room:", error);
      }
    };

  return (
    <div className="container p-5">
    <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100'>
       <h2 >Create Room Data</h2>
   </div>
   <form onSubmit={handleCreate}>

       <div className="mb-2">
           <label htmlFor="firstName">Room Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Room Name"
            onChange={e=>setCreateRoom({...CreateRoom, name:e.target.value})}
           />

       </div>

       <button className='btn btn-outline-success me-2'>Create Room</button>
       <Link to="/Rooms" className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )

}
