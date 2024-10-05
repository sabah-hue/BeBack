import mongoose from 'mongoose';


const connectDB = async()=>{
    return await mongoose.connect(process.env.CONN_DB)
    .then((result)=>{console.log('DB connected successfuly')})
    .catch((e)=>{console.log(`fail to connect DB ... ${e}`)})
}

export default connectDB