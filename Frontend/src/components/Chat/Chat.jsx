import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:5000'); // Adjust to your server URL

export default function Chat() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const room = new URLSearchParams(location.search).get('room');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Emit joinRoom event
    socket.emit('joinRoom', { username, room });

    // Listen for messages
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Listen for room data (user list)
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off('newMessage');
      socket.off('roomData');
      socket.emit('leaveRoom', { username, room }); // Optionally leave room on unmount
    };
  }, [username, room]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const msg = e.target.msg.value;
    console.log(msg);
    if (msg) {
      socket.emit('sendMessage', { room, username, message: msg });
      window.scrollTo(0, document.body.scrollHeight);
      e.target.msg.value = ''; // Clear input after sending msg
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1><i className="fas fa-smile"></i> BeBack Chat</h1>
        <a id="leave-btn" className="btn">Leave Room</a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3><i className="fas fa-comments"></i> Room Name:</h3>
          <h2 id="room-name">{room}</h2>
          <h3><i className="fas fa-users"></i> Users</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}: </strong>
              <span>{msg.content}</span>
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
          />
          <button className="btn ms-2"><i className="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  );
}
