import express from 'express';
import initApp from './src/app.router.js';
import * as dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

dotenv.config()
const port = process.env.PORT || 3000;

initApp(app, express);
app.listen(port, ()=>{ console.log(`running on port ${port}`)})