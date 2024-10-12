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

//
initApp(app, express);
//
let server = app.listen(port, ()=>{ console.log(`running on port ${port}`)})
// socket io
const io = new Server(server, {
    cors: '*'
});

io.on('connection', (socket) => {
    console.log('new user connected');
    console.log(socket.id);
    // join room
    socket.on('joinRoom', async ({username, room}) => {
        socket.join(room);
        console.log(`${username} joined room ${room}`);
        // users in rooms
        const roomUsers = await userModel.find({rooms: {$in: [room]}});
        io.to(room).emit('roomData', {users: roomUsers});
    })
 
    // send messages
    socket.on('sendMessage', async ({room, username, message}) => {
        const newMessage = await messageModel.create({room, username, message});
        io.to(room).emit('newMessage', newMessage);
    })

    // user disconnected
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
  });
