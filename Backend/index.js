import express from 'express';
import initApp from './src/app.router.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Server } from "socket.io";
import messageModel from './DB/models/message.model.js';
import userModel from './DB/models/user.model.js';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

dotenv.config()
const port = process.env.PORT;

// Initialize routes and middleware
initApp(app, express);

// Start the server
let server = app.listen(port, () => {
    console.log(`running on port ${port}`);
});

// Initialize Socket.io
const io = new Server(server, {
    cors: '*'
});

io.on('connection', (socket) => {
    console.log('New user connected');
    console.log(socket.id);

    // Join room event
    socket.on('joinRoom', async ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);
        
        // Get users in room and emit to all users in the room
        const roomUsers = await userModel.find({ rooms: { $in: [room] } });
        io.to(room).emit('roomData', { users: roomUsers });
    });

    // Send message event
    socket.on('sendMessage', async ({ room, username, message }) => {
        const newMessage = await messageModel.create({ room, username, content: message });
        io.to(room).emit('newMessage', newMessage);
    });

    // Typing event
    socket.on('typing', ({ username, room }) => {
        socket.to(room).emit('userTyping', { username });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
