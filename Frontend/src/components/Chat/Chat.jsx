import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import './Chat.css';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const socket = io('http://localhost:5000');

export default function Chat({userData}) {
  const messagesRef = useRef(null);

  console.log("userData" , userData);
  // navigation
  const navigate = useNavigate();

  // get data from queryParams
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const room = new URLSearchParams(location.search).get('room');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // enter the room add room to user DB
    socket.emit('joinRoom', { username, room });

    // notify when user join room
    // socket.on('note', (data, username) => {
    //     toast['warning'](`${data}`);
    // });
    
    // display all users in same room
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    // fetch old messages
    socket.on('oldMessages', (oldMessages) => {
      setMessages(oldMessages);
    })

    // recieve new message and add it to old messages 
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('newMessage');
      socket.off('roomData');
      socket.emit('leaveRoom', { username, room });
    };
  }, [username, room]);

  // scrole effect 
  useEffect(()=>{
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  // when user press submit
  // prevent reload
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message) {
      // send message to backend
      socket.emit('sendMessage', { room, username, message });
      // clear user input field
      setMessage('');
    }
    // scrole to the last message
    window.scrollTo(0, document.body.scrollHeight);
  };

  // show who is typing now
  const handleTyping = () => {
    socket.emit('typing', { username, room });
  };

  // leave chat room
  const leaveChat = () => {
    socket.emit('leaveRoom', {id: userData.id, room});

    // display all users in same room again to remove leaved user
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
      navigate('/base');
  }

  // showing chatPic and Bio
  const showUserDetails = (user) => {
    console.log("chat", user);
    setSelectedUser(user);
  }
  // stop display typing... message after 2sec
  useEffect(() => {
    let typingTimeout;
    socket.on('userTyping', ({ username }) => {
      document.getElementById('typing').innerHTML = `${username} is typing...`;
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        document.getElementById('typing').innerHTML = '';
      }, 2000);
    });

    return () => clearTimeout(typingTimeout);
  }, []);
  
  // handle emoji
  const onEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="container chat-container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-light text-white d-flex justify-content-between align-items-center">
          <h5><i className="fas fa-smile"></i> BeBack Chat</h5>
          <button className="btn btn-danger" onClick={leaveChat}>Leave Room</button>
        </div>
        <div className="card-body d-flex flex-row">
          <div className="chat-sidebar bg-light p-3" style={{ width: '30%', maxHeight: '70%', overflowY: 'auto' }}>
            <h6 className="text-success fs-5">Room Name: <span className="text-dark">{room}</span></h6>
            <hr className=""/>
            <h6 className="text-success fs-5">Users</h6>
            <ul className="list-group text-success">
              {/* show users in same room */}
              {users.map((user, index) => (
                <li key={index} className="list-group-item d-flex align-items-center">
                  <img src= 
                  {user.chatPic ? user.chatPic : `${`https://ui-avatars.com/api/?name=${user.username}`}`}
                  alt={user.username} className="avatar" />
                  <span className="ml-2">{user.username}</span>

                  {/* add this part to can show user chatPic and Bio */}
                  <i  data-bs-toggle="modal"
                    data-bs-target="#exampleModal"  className='ms-auto fas fa-eye'  onClick={()=>showUserDetails(user) }></i>
                </li>
              ))}
            </ul>
          </div>
          <div className="chat-messages flex-grow-1 p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div key={index} className="message mb-2">
                <div className="d-flex align-items-center">
                <img src= 
                  {msg.userProfile?.chatPic ? msg.userProfile?.chatPic : `${`https://ui-avatars.com/api/?name=${msg.username}`}`}
                  alt={msg.username} className="avatar" />
                  <strong className="ml-2 text-warning">{msg.username}:</strong>
                  <span className="ml-1">{msg.content}</span>
                </div>
              </div>
            ))}
            <div ref={messagesRef}></div>
            <p id="typing" className="text-success"></p>
          </div>
        </div>
        <div className="card-footer">
          <form onSubmit={handleMessageSubmit} className="d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Message"
              value={message}
              required
              autoComplete="off"
              onChange={(e) => setMessage(e.target.value)}
              onInput={handleTyping}
            />
            <button className="btn btn-warning mx-3"><i className="fas fa-paper-plane"></i></button>
            <button className="btn btn-light mt-2" onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);}}>
            <i className="far fa-laugh"></i>
          </button>
          </form>

          {showEmojiPicker && <div className='emoji'><EmojiPicker onEmojiClick={onEmojiClick} /></div>}
        </div>
      </div>

      {/* ========= Modal ============== */}
{/* <!-- Modal --> */}

  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{selectedUser?.username} chat profile</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body text-center">
      <img src= 
          {selectedUser?.chatPic ? selectedUser?.chatPic : `${`https://ui-avatars.com/api/?name=${selectedUser?.username}`}`}
          alt={selectedUser?.username} className="w-75 rounded-circle" />
      <p>user Bio : <strong className='text-success'>{selectedUser?.chatBio}</strong></p>
      <p>user is Now <strong className=''>{selectedUser?.status}</strong></p>
      </div>
    </div>
  </div>
</div>

      {/* ========== end Modal ========== */}

    </div>
  );
}
