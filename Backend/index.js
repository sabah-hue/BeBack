import express from 'express';
import initApp from './src/app.router.js';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Server } from "socket.io";


const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

dotenv.config()
const port = process.env.PORT || 3000;

//
initApp(app, express);
//
const server = app.listen(port, ()=>{ console.log(`running on port ${port}`)})
// socket io
const rooms = ['node js', '.NET', 'python'];
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
  });
