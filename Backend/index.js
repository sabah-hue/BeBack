import express from 'express';
import initApp from './src/app.router.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Server } from "socket.io";
import messageModel from './DB/models/message.model.js';


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
const rooms = ['node js', '.NET', 'python'];
const io = new Server(server, {
    cors: '*'
});

io.on('connection', (socket) => {
    console.log('new user connected');
    console.log(socket.id);
    // join room
    socket.on('joinRoom', ({username, roomId}) => {
        socket.join(roomId);
        console.log(`${username} joined room ${roomId}`);
    })
    // send messages
    socket.on('sendMessage', async ({roomId, username, message}) => {
        const newMessage = await messageModel.create({roomId, username, message});
        io.to(roomId).emit('newMessage', newMessage);
    })
    // user disconnected
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
  });
