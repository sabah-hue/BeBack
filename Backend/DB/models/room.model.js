import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    name:{
        type:String,
        require:true
    },
},{timestamps:true})

const roomModel = mongoose.model('Room' , roomSchema);
export default roomModel;
