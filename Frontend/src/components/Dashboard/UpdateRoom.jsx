import React from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateRoom() {
    const navigate = useNavigate();
    const [updateRoom, setUpdateRoom] = useState({
        name: "",
      });
    const {id} = useParams();

    useEffect(() => {
        getRoom();
      }, []);
        

      const handleUpdate = async (e) => {
        e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/chat/room/${id}`, updateRoom);
        navigate('/Rooms')
      } catch (error) {
        console.error("Error update Room:", error);
      }
    };

      const getRoom = async () => {
        try {
          const {data} = await axios.get(`http://localhost:5000/chat/rooms/${id}`);
          console.log(data);
          setUpdateRoom({
            name: data.room.name,
          });
          
        } catch (error) {
          console.error("Error getting Room from DB:", error);
        }
      };
  return (
    <div className="container p-5">
    <div className='w-50 border bg-white shadow px-5 mt-4 mb-4 rounded w-100'>
       <h2 >update Room Data</h2>
   </div>
   <form onSubmit={handleUpdate}>

       <div className="mb-2">
           <label htmlFor="firstName">Room Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Room Name"
            value={updateRoom.name}
            onChange={e=>setUpdateRoom({...updateRoom, name:e.target.value})}
           />

       </div>


       <button className='btn btn-outline-success me-2'>update Room</button>
       <Link to="/Rooms" className='btn btn-outline-primary'>Back</Link>
   </form>

  </div>  )

}
