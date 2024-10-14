import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Base({ userData }) {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
      // get available rooms
        const fetchRooms = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/chat/rooms');
                if (data.rooms && data.rooms.length > 0) {
                    setRooms(data.rooms); 
                    setRoom(data.rooms[0].name); 
                }
                const res = await axios.get(`http://localhost:5000/user/profile/${userData.id}`);
                if (res.data)
                    setUsername(res.data.user.username);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms(); 
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && room) {
            await axios.post('http://localhost:5000/chat/room/join', { username, room, id: userData.id });
            navigate(`/chat?username=${username}&room=${room}`);
        }
    };

    return (
        <div className="container my-5">
            <header className="text-center mb-4">
                <h1>
                    <i className="fas fa-smile"></i> Welcome <br /> BeBack Chat
                </h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter username..."
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="room" className="form-label">Available Rooms</label>
                        <select
                            className="form-select"
                            name="room"
                            id="room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
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
                    <button type="submit" className="btn btn-success w-100">
                        Join Chat
                    </button>
                </form>
            </main>
        </div>
    );
}
