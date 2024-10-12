import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import io from 'socket.io-client'; // Import socket.io
import './Chat.css';

const socket = io('http://localhost:5000'); // Replace with your backend server URL

export default function Chat() {
  const [messages, setMessages] = useState([]); // Chat messages
  const [message, setMessage] = useState(''); // Current input message
  const [roomName, setRoomName] = useState(''); // Room name
  const [users, setUsers] = useState([]); // List of users in the room
  const navigate = useNavigate();
  const location = useLocation();
  const chatMessagesRef = useRef(null); // For scrolling chat messages

  // Extract username and room from URL query params
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const room = searchParams.get('room');

  useEffect(() => {
    // Listen for room and user info (since joinRoom event is already emitted in Base)
    socket.on('roomUsers', ({ room, users }) => {
      setRoomName(room);
      setUsers(users);
    });

    // Listen for new messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight; // Auto-scroll to bottom
    });

    // Cleanup when component unmounts (leave room)
    return () => {
      socket.emit('leaveRoom');
      socket.off(); // Clean up socket listeners
    };
  }, [room, username]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Emit the message to the server
      socket.emit('sendMessage', { roomId: room, username, message });
      setMessage(''); // Clear message input
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom');
    navigate('/'); // Navigate back to Base component
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> BeBack Chat</h1>
        <button id="leave-btn" className="btn" onClick={handleLeaveRoom}>Leave Room</button>
      </header>

      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">{roomName}</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul id="users">
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <p className="meta">{msg.username} <span>{new Date(msg.createdAt).toLocaleTimeString()}</span></p>
              <p className="text">{msg.content}</p>
            </div>
          ))}
        </div>
      </main>

      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleMessageSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn ms-2"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  );
}
