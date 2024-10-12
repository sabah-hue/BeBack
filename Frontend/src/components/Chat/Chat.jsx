import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react'; // Import emoji picker
import './Chat.css';

const socket = io('http://localhost:5000'); // Adjust to your server URL

export default function Chat() {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const room = new URLSearchParams(location.search).get('room');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(''); // State for message input
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle for emoji picker

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
      socket.emit('leaveRoom', { username, room });
    };
  }, [username, room]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', { room, username, message });
      setMessage(''); // Clear input after sending message
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  // Emit typing event
  function handleTyping() {
    socket.emit('typing', { username, room });
  }

  // Listen for typing notification
  useEffect(() => {
    let typingTimeout;
    socket.on('userTyping', ({ username }) => {
      document.getElementById('typing').innerHTML = `${username} is typing...`;

      // Clear the "typing" message after 3 seconds
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        document.getElementById('typing').innerHTML = '';
      }, 3000);
    });

    return () => clearTimeout(typingTimeout); // Cleanup on unmount
  }, []);

  // Handle emoji click
  const onEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji); // Correctly append emoji to message
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
          {/* user is typing */}
          <p id="typing" className="text-success"></p>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form" onSubmit={handleMessageSubmit}>
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            value={message}
            required
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)} // Update message state
            onInput={handleTyping} // Handle typing event
          />
          <button className="btn ms-2"><i className="fas fa-paper-plane"></i></button>
        </form>
        {/* Toggle Emoji Picker */}
        <button className="btn emoji-btn" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <i className="far fa-laugh"></i> 
        </button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />} {/* Show emoji picker */}
      </div>
    </div>
  );
}
