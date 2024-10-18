import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: 'Admin'
    }
},{timestamps:true})

const roomModel = mongoose.model('Room' , roomSchema);
export default roomModel;
