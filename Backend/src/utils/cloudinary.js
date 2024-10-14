import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv'
dotenv.config();


cloudinary.config({ 
    cloud_name: 'dps8pco1z', 
    api_key: '485143223195272', 
    api_secret: process.env.CLOUD_KEY //  API Keys IN .env FILE
});

export default cloudinary;
