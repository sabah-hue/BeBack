import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
// import io from 'socket.io-client'; // Import socket.io
import axios from 'axios'; // You still use axios for fetching rooms

// const socket = io('http://localhost:5000/chat'); // Replace with your server URL

export default function Base({userData}) {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [rooms, setRooms] = useState([]); // State for storing rooms fetched from the database
  const navigate = useNavigate();

  // Fetch rooms from the database when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Fetch available rooms from the backend
        const { data } = await axios.get('http://localhost:5000/chat/rooms');
        if (data.rooms && data.rooms.length > 0) {
          setRooms(data.rooms); // Assuming the response is an array of room objects
          setRoom(data.rooms[0].name); // Set the first room as default
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && room) {
      // Emit the joinRoom event using socket.io
      // socket.emit('joinRoom', { username, room });
      // by axios instead of socket
      console.log(userData);
      await axios.post('http://localhost:5000/chat/room/join', {username, room, id: userData.id});
      navigate(`/chat?username=${username}&room=${room}`); // Navigate to Chat with room & username
    }
  };

  return (
    <>
      <div className="join-container">
        <header className="join-header">
          <h1>
            <i className="fas fa-smile"></i> Welcome <br /> BeBack Chat
          </h1>
        </header>
        <main className="join-main">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="room">Available Rooms</label>
              <select
                name="room"
                id="room"
                value={room}
                onChange={(e) => {setRoom(e.target.value); console.log(e.target.value);}}
              >
                {rooms.length > 0 ? (
                  rooms.map((roomObj, index) => (
                    <option key={index} value={roomObj.name}>
                      {roomObj.name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading rooms...</option>
                )}
              </select>
            </div>
            <button type="submit" className="btn baseBtn">
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
